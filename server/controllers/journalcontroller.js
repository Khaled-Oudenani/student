import Journal from "../models/JournalModel.js";

// ============================================================
// GET - جلب كل المجلات
// ============================================================
export const getAllMajallat = async (req, res) => {
  try {
    const majallat = await Journal.find();
    res.status(200).json({ majallat });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// GET - جلب مجلة واحدة
// ============================================================
export const getMajalaById = async (req, res) => {
  try {
    const majala = await Journal.findById(req.params.id);
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
    const { name, aadat } = req.body;
    if (!name) return res.status(400).json({ message: "اسم المجلة مطلوب" });

    const files = req.files || {};

    // بناء مصفوفة battaka_taqniya
    const battaka_taqniya = [];
    const battakaTexts = [].concat(req.body["battaka_taqniya[text]"] || []);
    const battakaFiles = files["battaka_file"] || [];
    const count = Math.max(battakaTexts.length, battakaFiles.length);
    for (let i = 0; i < count; i++) {
      battaka_taqniya.push({
        text: battakaTexts[i] || null,
        file: battakaFiles[i]?.path || null,
      });
    }

    const majala = new Journal({ name, battaka_taqniya, aadat: aadat || null });
    await majala.save();
    res.status(201).json({ message: "تم إضافة المجلة بنجاح", majala });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// PUT - تعديل مجلة
// ============================================================
export const updateMajala = async (req, res) => {
  try {
    const { name, aadat } = req.body;
    const files = req.files || {};

    const majala = await Journal.findById(req.params.id);
    if (!majala) return res.status(404).json({ message: "المجلة غير موجودة" });

    if (name) majala.name = name;
    if (aadat !== undefined) majala.aadat = aadat;

    if (req.body["battaka_taqniya[text]"] || files["battaka_file"]) {
      const texts = [].concat(req.body["battaka_taqniya[text]"] || []);
      const filesList = files["battaka_file"] || [];
      const count = Math.max(texts.length, filesList.length);
      majala.battaka_taqniya = [];
      for (let i = 0; i < count; i++) {
        majala.battaka_taqniya.push({
          text: texts[i] || null,
          file: filesList[i]?.path || null,
        });
      }
    }

    await majala.save();
    res.status(200).json({ message: "تم تحديث المجلة بنجاح", majala });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// ============================================================
// DELETE - حذف مجلة
// ============================================================
export const deleteMajala = async (req, res) => {
  try {
    const majala = await Journal.findByIdAndDelete(req.params.id);
    if (!majala) return res.status(404).json({ message: "المجلة غير موجودة" });
    res.status(200).json({ message: "تم حذف المجلة بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};
