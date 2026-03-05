import Journal from "../models/JournalModel.js";

// ============================================================
// GET - جلب كل المجلات
// ============================================================
export const getAllMajallat = async (req, res) => {
  try {
    const journal = await Journal.findOne();
    if (!journal) return res.status(404).json({ message: "لا توجد مجلات بعد" });
    res.status(200).json({ majallat: journal.majallat });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// GET - جلب مجلة واحدة بالـ ID
// ============================================================
export const getMajalaById = async (req, res) => {
  try {
    const journal = await Journal.findOne();
    if (!journal) return res.status(404).json({ message: "لا توجد مجلات" });

    const majala = journal.majallat.id(req.params.id);
    if (!majala) return res.status(404).json({ message: "المجلة غير موجودة" });

    res.status(200).json({ majala });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// POST - إضافة مجلة جديدة
// ============================================================
export const addMajala = async (req, res) => {
  try {
    const { name, battaka_taqniya, aadat } = req.body;

    if (!name) return res.status(400).json({ message: "اسم المجلة مطلوب" });

    const newMajala = {
      name,
      battaka_taqniya: {
        text: battaka_taqniya?.text || null,
      },
      aadat: {
        text: aadat?.text || null,
      },
    };

    let journal = await Journal.findOne();
    if (!journal) {
      journal = new Journal({ majallat: [newMajala] });
    } else {
      journal.majallat.push(newMajala);
    }

    await journal.save();
    res.status(201).json({
      message: "تم إضافة المجلة بنجاح",
      majala: journal.majallat[journal.majallat.length - 1],
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// PUT - تعديل مجلة بالكامل
// ============================================================
export const updateMajala = async (req, res) => {
  try {
    const { name, battaka_taqniya, aadat } = req.body;

    const journal = await Journal.findOne();
    if (!journal) return res.status(404).json({ message: "لا توجد مجلات" });

    const majala = journal.majallat.id(req.params.id);
    if (!majala) return res.status(404).json({ message: "المجلة غير موجودة" });

    if (name) majala.name = name;
    if (battaka_taqniya?.text !== undefined)
      majala.battaka_taqniya.text = battaka_taqniya.text;
    if (aadat?.text !== undefined) majala.aadat.text = aadat.text;

    await journal.save();
    res.status(200).json({ message: "تم تحديث المجلة بنجاح", majala });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// PATCH - تعديل حقل معين فقط داخل المجلة
// ============================================================
export const patchMajala = async (req, res) => {
  try {
    const { field, text } = req.body;

    const allowedFields = ["battaka_taqniya", "aadat"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        message: `الحقل غير صالح. الحقول المسموحة: ${allowedFields.join(", ")}`,
      });
    }

    const journal = await Journal.findOne();
    if (!journal) return res.status(404).json({ message: "لا توجد مجلات" });

    const majala = journal.majallat.id(req.params.id);
    if (!majala) return res.status(404).json({ message: "المجلة غير موجودة" });

    if (text !== undefined) majala[field].text = text;

    await journal.save();
    res
      .status(200)
      .json({ message: `تم تحديث ${field} بنجاح`, data: majala[field] });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// DELETE - حذف مجلة
// ============================================================
export const deleteMajala = async (req, res) => {
  try {
    const journal = await Journal.findOne();
    if (!journal) return res.status(404).json({ message: "لا توجد مجلات" });

    const majala = journal.majallat.id(req.params.id);
    if (!majala) return res.status(404).json({ message: "المجلة غير موجودة" });

    majala.deleteOne();
    await journal.save();

    res.status(200).json({ message: "تم حذف المجلة بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};
