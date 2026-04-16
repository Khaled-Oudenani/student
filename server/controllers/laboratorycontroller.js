// import Laboratory from "../models/laboratoryModel.js";

// // ============================================================
// // GET - جلب كل المخابر
// // ============================================================
// export const getAllMakhaber = async (req, res) => {
//   try {
//     const makhaber = await Laboratory.find();
//     res.status(200).json({ makhaber });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // ============================================================
// // GET - جلب مخبر واحد
// // ============================================================
// export const getMakhabarById = async (req, res) => {
//   try {
//     const makhabar = await Laboratory.findById(req.params.id);
//     if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });
//     res.status(200).json({ makhabar });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // ============================================================
// // POST - إنشاء مخبر جديد مع كل بياناته
// // ============================================================
// export const addMakhabar = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) return res.status(400).json({ message: "اسم المخبر مطلوب" });

//     const files = req.files || {};

//     // بناء مصفوفة battaka_taqniya
//     const battaka_taqniya = [];
//     const battakaTexts = [].concat(req.body["battaka_taqniya[text]"] || []);
//     const battakaFiles = files["battaka_file"] || [];
//     const battakaCount = Math.max(battakaTexts.length, battakaFiles.length);
//     for (let i = 0; i < battakaCount; i++) {
//       battaka_taqniya.push({
//         text: battakaTexts[i] || null,
//         file: battakaFiles[i]?.path || null,
//       });
//     }

//     // بناء مصفوفة hassila
//     const hassila = [];
//     const hassilaTexts = [].concat(req.body["hassila[text]"] || []);
//     const hassilaFiles = files["hassila_file"] || [];
//     const hassilaCount = Math.max(hassilaTexts.length, hassilaFiles.length);
//     for (let i = 0; i < hassilaCount; i++) {
//       hassila.push({
//         text: hassilaTexts[i] || null,
//         file: hassilaFiles[i]?.path || null,
//       });
//     }

//     // بناء مصفوفة nashatat
//     const nashatat = [];
//     const nashatetTexts = [].concat(req.body["nashatat[text]"] || []);
//     const nashatetFiles = files["nashatat_file"] || [];
//     const nashatetCount = Math.max(nashatetTexts.length, nashatetFiles.length);
//     for (let i = 0; i < nashatetCount; i++) {
//       nashatat.push({
//         text: nashatetTexts[i] || null,
//         file: nashatetFiles[i]?.path || null,
//       });
//     }

//     const makhabar = new Laboratory({
//       name,
//       battaka_taqniya,
//       hassila,
//       nashatat,
//     });
//     await makhabar.save();
//     res.status(201).json({ message: "تم إضافة المخبر بنجاح", makhabar });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // ============================================================
// // PUT - تعديل مخبر
// // ============================================================
// export const updateMakhabar = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const files = req.files || {};

//     const makhabar = await Laboratory.findById(req.params.id);
//     if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

//     if (name) makhabar.name = name;

//     if (req.body["battaka_taqniya[text]"] || files["battaka_file"]) {
//       const texts = [].concat(req.body["battaka_taqniya[text]"] || []);
//       const filesList = files["battaka_file"] || [];
//       const count = Math.max(texts.length, filesList.length);
//       makhabar.battaka_taqniya = [];
//       for (let i = 0; i < count; i++) {
//         makhabar.battaka_taqniya.push({
//           text: texts[i] || null,
//           file: filesList[i]?.path || null,
//         });
//       }
//     }

//     if (req.body["hassila[text]"] || files["hassila_file"]) {
//       const texts = [].concat(req.body["hassila[text]"] || []);
//       const filesList = files["hassila_file"] || [];
//       const count = Math.max(texts.length, filesList.length);
//       makhabar.hassila = [];
//       for (let i = 0; i < count; i++) {
//         makhabar.hassila.push({
//           text: texts[i] || null,
//           file: filesList[i]?.path || null,
//         });
//       }
//     }

//     if (req.body["nashatat[text]"] || files["nashatat_file"]) {
//       const texts = [].concat(req.body["nashatat[text]"] || []);
//       const filesList = files["nashatat_file"] || [];
//       const count = Math.max(texts.length, filesList.length);
//       makhabar.nashatat = [];
//       for (let i = 0; i < count; i++) {
//         makhabar.nashatat.push({
//           text: texts[i] || null,
//           file: filesList[i]?.path || null,
//         });
//       }
//     }

//     await makhabar.save();
//     res.status(200).json({ message: "تم تحديث المخبر بنجاح", makhabar });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // ============================================================
// // DELETE - حذف مخبر
// // ============================================================
// export const deleteMakhabar = async (req, res) => {
//   try {
//     const makhabar = await Laboratory.findByIdAndDelete(req.params.id);
//     if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });
//     res.status(200).json({ message: "تم حذف المخبر بنجاح" });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };
//
// import Laboratory from "../models/laboratoryModel.js";

// const buildArray = (body, files, textKey, fileKey) => {
//   const texts = [].concat(body[textKey] || []);
//   const filesList = files[fileKey] || [];
//   const count = Math.max(texts.length, filesList.length);
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     result.push({
//       text: texts[i] || null,
//       file: filesList[i]?.path || null,
//     });
//   }
//   return result;
// };

// // GET - جلب كل المخابر
// export const getAllMakhaber = async (req, res) => {
//   try {
//     const makhaber = await Laboratory.find();
//     res.status(200).json({ makhaber });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // GET - جلب مخبر واحد
// export const getMakhabarById = async (req, res) => {
//   try {
//     const makhabar = await Laboratory.findById(req.params.id);
//     if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });
//     res.status(200).json({ makhabar });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // POST - إضافة مخبر جديد
// export const addMakhabar = async (req, res) => {
//   try {
//     const { name, taareef } = req.body;
//     if (!name) return res.status(400).json({ message: "اسم المخبر مطلوب" });

//     const files = req.files || {};

//     const makhabar = new Laboratory({
//       name,
//       battaka_taqniya: buildArray(
//         req.body,
//         files,
//         "battaka_taqniya[text]",
//         "battaka_file",
//       ),
//       hassila: buildArray(req.body, files, "hassila[text]", "hassila_file"),
//       nashatat: buildArray(req.body, files, "nashatat[text]", "nashatat_file"),
//       taareef: taareef || null,
//       mokawinat: [].concat(req.body["mokawinat"] || []),
//       firaq: [].concat(req.body["firaq"] || []),
//     });

//     await makhabar.save();
//     res.status(201).json({ message: "تم إضافة المخبر بنجاح", makhabar });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // PUT - تعديل مخبر
// export const updateMakhabar = async (req, res) => {
//   try {
//     const { name, taareef } = req.body;
//     const files = req.files || {};

//     const makhabar = await Laboratory.findById(req.params.id);
//     if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

//     if (name) makhabar.name = name;
//     if (taareef !== undefined) makhabar.taareef = taareef;
//     if (req.body["mokawinat"])
//       makhabar.mokawinat = [].concat(req.body["mokawinat"]);
//     if (req.body["firaq"]) makhabar.firaq = [].concat(req.body["firaq"]);

//     const arrayFields = [
//       {
//         key: "battaka_taqniya",
//         textKey: "battaka_taqniya[text]",
//         fileKey: "battaka_file",
//       },
//       { key: "hassila", textKey: "hassila[text]", fileKey: "hassila_file" },
//       { key: "nashatat", textKey: "nashatat[text]", fileKey: "nashatat_file" },
//     ];

//     arrayFields.forEach(({ key, textKey, fileKey }) => {
//       if (req.body[textKey] || files[fileKey]) {
//         makhabar[key] = buildArray(req.body, files, textKey, fileKey);
//       }
//     });

//     await makhabar.save();
//     res.status(200).json({ message: "تم تحديث المخبر بنجاح", makhabar });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// // DELETE - حذف مخبر
// export const deleteMakhabar = async (req, res) => {
//   try {
//     const makhabar = await Laboratory.findByIdAndDelete(req.params.id);
//     if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });
//     res.status(200).json({ message: "تم حذف المخبر بنجاح" });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
//   }
// };

// 33333333333333333333

import Laboratory from "../models/laboratoryModel.js";

const buildArray = (body, files, textKey, fileKey, indicesKey) => {
  // 1. استخراج النصوص والتأكد من أنها مصفوفة
  let texts = body[textKey];
  if (texts === undefined) return []; // إذا لم يتم إرسال أي نص
  if (!Array.isArray(texts)) texts = [texts];

  // 2. استخراج الملفات والتأكد من دعم كلاً من .any() و .fields()
  let uploadedFiles = [];
  if (Array.isArray(files)) {
    // حالة استخدام upload.any()
    uploadedFiles = files.filter((f) => f.fieldname === fileKey);
  } else if (files && typeof files === "object") {
    // حالة استخدام upload.fields()
    uploadedFiles = files[fileKey] || [];
  }

  // 3. استخراج الفهارس (indices) لربط الملف بالنص الصحيح
  let fileIndices = body[indicesKey];
  if (fileIndices === undefined) fileIndices = [];
  if (!Array.isArray(fileIndices)) fileIndices = [fileIndices];
  fileIndices = fileIndices.map(Number); // تحويل الفهارس إلى أرقام

  // 4. بناء النتيجة النهائية
  const result = [];
  for (let i = 0; i < texts.length; i++) {
    const filePos = fileIndices.indexOf(i); // البحث عن هل يوجد ملف يتبع هذا النص
    result.push({
      text: texts[i] || null,
      file:
        filePos !== -1 && uploadedFiles[filePos]
          ? uploadedFiles[filePos].path
          : null,
    });
  }
  return result;
};

// GET - جلب كل المخابر
export const getAllMakhaber = async (req, res) => {
  try {
    const makhaber = await Laboratory.find();
    res.status(200).json({ makhaber });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// GET - جلب مخبر واحد
export const getMakhabarById = async (req, res) => {
  try {
    const makhabar = await Laboratory.findById(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });
    res.status(200).json({ makhabar });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// POST - إضافة مخبر جديد
export const addMakhabar = async (req, res) => {
  try {
    const { name, taareef } = req.body;
    if (!name) return res.status(400).json({ message: "اسم المخبر مطلوب" });

    const files = req.files || {};

    const makhabar = new Laboratory({
      name,
      taareef: taareef || null,
      battaka_taqniya: buildArray(
        req.body,
        files,
        "battaka_texts",
        "battaka_file",
        "battaka_file_indices",
      ),
      hassila: buildArray(
        req.body,
        files,
        "hassila_texts",
        "hassila_file",
        "hassila_file_indices",
      ),
      nashatat: buildArray(
        req.body,
        files,
        "nashatat_texts",
        "nashatat_file",
        "nashatat_file_indices",
      ),
      mokawinat: [].concat(req.body.mokawinat || []),
      firaq: [].concat(req.body.firaq || []),
    });

    await makhabar.save();
    res.status(201).json({ message: "تم إضافة المخبر بنجاح", makhabar });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// PUT - تعديل مخبر
export const updateMakhabar = async (req, res) => {
  try {
    const { name, taareef } = req.body;
    const files = req.files || {};

    const makhabar = await Laboratory.findById(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });

    if (name) makhabar.name = name;
    if (taareef !== undefined) makhabar.taareef = taareef;
    if (req.body.mokawinat) makhabar.mokawinat = [].concat(req.body.mokawinat);
    if (req.body.firaq) makhabar.firaq = [].concat(req.body.firaq);

    // المصفوفة الخاصة بالحقول القابلة للتحديث
    const arrayFields = [
      {
        key: "battaka_taqniya",
        textKey: "battaka_texts",
        fileKey: "battaka_file",
        indicesKey: "battaka_file_indices",
      },
      {
        key: "hassila",
        textKey: "hassila_texts",
        fileKey: "hassila_file",
        indicesKey: "hassila_file_indices",
      },
      {
        key: "nashatat",
        textKey: "nashatat_texts",
        fileKey: "nashatat_file",
        indicesKey: "nashatat_file_indices",
      },
    ];

    arrayFields.forEach(({ key, textKey, fileKey, indicesKey }) => {
      // نتحقق إذا كان هناك إما نصوص أو ملفات مرسلة للتحديث
      if (
        req.body[textKey] !== undefined ||
        (files &&
          (files[fileKey] ||
            (Array.isArray(files) &&
              files.some((f) => f.fieldname === fileKey))))
      ) {
        makhabar[key] = buildArray(
          req.body,
          files,
          textKey,
          fileKey,
          indicesKey,
        );
      }
    });

    await makhabar.save();
    res.status(200).json({ message: "تم تحديث المخبر بنجاح", makhabar });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// DELETE - حذف مخبر
export const deleteMakhabar = async (req, res) => {
  try {
    const makhabar = await Laboratory.findByIdAndDelete(req.params.id);
    if (!makhabar) return res.status(404).json({ message: "المخبر غير موجود" });
    res.status(200).json({ message: "تم حذف المخبر بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};
