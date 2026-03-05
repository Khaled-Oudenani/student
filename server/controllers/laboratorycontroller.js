import Laboratory from "../models/laboratoryModel.js";

// ============================================================
// GET - جلب كل المخابر
// ============================================================
export const getAllMakhaber = async (req, res) => {
  try {
    const lab = await Laboratory.findOne();
    if (!lab) return res.status(404).json({ message: "لا توجد مخابر بعد" });
    res.status(200).json({ makhaber: lab.makhaber });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// GET - جلب مخبر واحد بالـ ID
// ============================================================
export const getMakhabarById = async (req, res) => {
  try {
    const lab = await Laboratory.findOne();
    if (!lab) return res.status(404).json({ message: "لا توجد مخابر" });

    const makhabar = lab.makhaber.id(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

    res.status(200).json({ makhabar });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// POST - إضافة مخبر جديد
// ============================================================
export const addMakhabar = async (req, res) => {
  try {
    const { name, battaka_taqniya, hassila, nashatat } = req.body;

    if (!name) return res.status(400).json({ message: "اسم المخبر مطلوب" });

    const files = req.files || {};

    const newMakhabar = {
      name,
      battaka_taqniya: {
        text: battaka_taqniya?.text || null,
        file: files.battaka_file
          ? files.battaka_file[0].path
          : battaka_taqniya?.file || null,
      },
      hassila: {
        text: hassila?.text || null,
        file: files.hassila_file
          ? files.hassila_file[0].path
          : hassila?.file || null,
      },
      nashatat: {
        text: nashatat?.text || null,
        file: files.nashatat_file
          ? files.nashatat_file[0].path
          : nashatat?.file || null,
      },
    };

    let lab = await Laboratory.findOne();
    if (!lab) {
      lab = new Laboratory({ makhaber: [newMakhabar] });
    } else {
      lab.makhaber.push(newMakhabar);
    }

    await lab.save();
    res.status(201).json({
      message: "تم إضافة المخبر بنجاح",
      makhabar: lab.makhaber[lab.makhaber.length - 1],
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// PUT - تعديل مخبر بالكامل
// ============================================================
export const updateMakhabar = async (req, res) => {
  try {
    const { name, battaka_taqniya, hassila, nashatat } = req.body;
    const files = req.files || {};

    const lab = await Laboratory.findOne();
    if (!lab) return res.status(404).json({ message: "لا توجد مخابر" });

    const makhabar = lab.makhaber.id(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

    if (name) makhabar.name = name;

    if (battaka_taqniya?.text !== undefined)
      makhabar.battaka_taqniya.text = battaka_taqniya.text;
    if (files.battaka_file)
      makhabar.battaka_taqniya.file = files.battaka_file[0].path;

    if (hassila?.text !== undefined) makhabar.hassila.text = hassila.text;
    if (files.hassila_file) makhabar.hassila.file = files.hassila_file[0].path;

    if (nashatat?.text !== undefined) makhabar.nashatat.text = nashatat.text;
    if (files.nashatat_file)
      makhabar.nashatat.file = files.nashatat_file[0].path;

    await lab.save();
    res.status(200).json({ message: "تم تحديث المخبر بنجاح", makhabar });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// PATCH - تعديل حقل معين فقط داخل المخبر
// ============================================================
export const patchMakhabar = async (req, res) => {
  try {
    const { field, text } = req.body;
    const files = req.files || {};

    const allowedFields = ["battaka_taqniya", "hassila", "nashatat"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        message: `الحقل غير صالح. الحقول المسموحة: ${allowedFields.join(", ")}`,
      });
    }

    const lab = await Laboratory.findOne();
    if (!lab) return res.status(404).json({ message: "لا توجد مخابر" });

    const makhabar = lab.makhaber.id(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

    if (text !== undefined) makhabar[field].text = text;
    if (files.file) makhabar[field].file = files.file[0].path;

    await lab.save();
    res
      .status(200)
      .json({ message: `تم تحديث ${field} بنجاح`, data: makhabar[field] });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// DELETE - حذف مخبر
// ============================================================
export const deleteMakhabar = async (req, res) => {
  try {
    const lab = await Laboratory.findOne();
    if (!lab) return res.status(404).json({ message: "لا توجد مخابر" });

    const makhabar = lab.makhaber.id(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

    makhabar.deleteOne();
    await lab.save();

    res.status(200).json({ message: "تم حذف المخبر بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};
