import ScientificManifestation from "../models/scientificmanifestationModel.js";

const FIELDS = [
  "ayyamDirasiyaWaTakwiniya",
  "nadawatWataniya",
  "nadawatDawliya",
  "multaqayatWataniya",
  "multaqayatDawliya",
];

// ─── GET ───────────────────────────────────────────────────
export const getScientificManifestation = async (req, res) => {
  try {
    const data = await ScientificManifestation.findOne();
    if (!data) return res.status(404).json({ message: "لا توجد بيانات" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── CREATE / UPDATE ───────────────────────────────────────
export const upsertScientificManifestation = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || {};

    // بناء الـ payload لكل حقل
    const payload = {};

    for (const field of FIELDS) {
      // نقرأ النصوص من body كـ JSON string أو array
      let entries = [];
      if (body[field]) {
        entries =
          typeof body[field] === "string"
            ? JSON.parse(body[field])
            : body[field];
      }

      // نربط الملفات بالـ entries حسب الترتيب
      const fieldFiles = files[`${field}_file`] || [];

      let fileIndex = 0;
      payload[field] = entries.map((entry) => {
        const item = { text: entry.text || null, file: null };
        if (entry.hasFile && fieldFiles[fileIndex]) {
          item.file = fieldFiles[fileIndex].path;
          fileIndex++;
        }
        return item;
      });
    }

    let data = await ScientificManifestation.findOne();

    if (data) {
      Object.assign(data, payload);
      await data.save();
    } else {
      data = await ScientificManifestation.create(payload);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── ADD ENTRY TO ONE FIELD ────────────────────────────────
export const addEntry = async (req, res) => {
  try {
    const { field } = req.params;

    if (!FIELDS.includes(field))
      return res.status(400).json({ message: "الحقل غير موجود" });

    const text = req.body.text || null;
    const fileUrl = req.files?.scientmani_file?.[0]?.path || null;

    const entry = { text, file: fileUrl };

    let data = await ScientificManifestation.findOne();

    if (!data) {
      data = await ScientificManifestation.create({ [field]: [entry] });
    } else {
      data[field].push(entry);
      await data.save();
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE ENTRY FROM ONE FIELD ──────────────────────────
export const deleteEntry = async (req, res) => {
  try {
    const { field, index } = req.params;

    if (!FIELDS.includes(field))
      return res.status(400).json({ message: "الحقل غير موجود" });

    const data = await ScientificManifestation.findOne();
    if (!data) return res.status(404).json({ message: "لا توجد بيانات" });

    data[field].splice(Number(index), 1);
    await data.save();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
