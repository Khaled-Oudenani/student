// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => ({
//     folder: "labs",
//     allowed_formats: [
//       "pdf",
//       "doc",
//       "docx",
//       "png",
//       "jpg",
//       "jpeg",
//       "txt",
//       "xls",
//       "xlsx",
//       "ppt",
//       "pptx",
//     ],
//     resource_type: "raw",
//     public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
//   }),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// // يدعم ملفات متعددة لكل حقل
// export const uploadLabFiles = upload.fields([
//   { name: "battaka_file", maxCount: 10 },
//   { name: "hassila_file", maxCount: 10 },
//   { name: "nashatat_file", maxCount: 10 },
// ]);

// export const uploadSingleLabFile = upload.fields([
//   { name: "file", maxCount: 1 },
// ]);
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => {
//     const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
//     return {
//       folder: "labs",
//       resource_type: "raw",
//       type: "upload", // ✅ عام وقابل للوصول
//       public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`,
//       format: ext,
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowed = [
//       "pdf",
//       "doc",
//       "docx",
//       "png",
//       "jpg",
//       "jpeg",
//       "txt",
//       "xls",
//       "xlsx",
//       "ppt",
//       "pptx",
//     ];
//     const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
//     if (allowed.includes(ext)) {
//       cb(null, true);
//     } else {
//       cb(new Error("نوع الملف غير مسموح به"), false);
//     }
//   },
// });

// export const uploadLabFiles = upload.fields([
//   { name: "battaka_file", maxCount: 10 },
//   { name: "hassila_file", maxCount: 10 },
//   { name: "nashatat_file", maxCount: 10 },
// ]);

// export const uploadSingleLabFile = upload.fields([
//   { name: "file", maxCount: 1 },
// ]);
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => {
//     const ext = path.extname(file.originalname).toLowerCase().replace(".", "");

//     // PDF / DOC / DOCX / TXT / XLS / PPT => raw
//     const rawTypes = [
//       "pdf",
//       "doc",
//       "docx",
//       "txt",
//       "xls",
//       "xlsx",
//       "ppt",
//       "pptx",
//     ];
//     return {
//       folder: "labs",
//       resource_type: rawTypes.includes(ext) ? "raw" : "image",
//       type: "upload",
//       access_mode: "public", // مهم جداً للعرض المباشر
//       public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
//       format: ext,
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//   fileFilter: (req, file, cb) => {
//     const allowed = [
//       "pdf",
//       "doc",
//       "docx",
//       "png",
//       "jpg",
//       "jpeg",
//       "txt",
//       "xls",
//       "xlsx",
//       "ppt",
//       "pptx",
//     ];
//     const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
//     if (allowed.includes(ext)) cb(null, true);
//     else cb(new Error("نوع الملف غير مسموح به"), false);
//   },
// });

// export const uploadLabFiles = upload.fields([
//   { name: "battaka_file", maxCount: 10 },
//   { name: "hassila_file", maxCount: 10 },
//   { name: "nashatat_file", maxCount: 10 },
// ]);

// export const uploadSingleLabFile = upload.fields([
//   { name: "file", maxCount: 1 },
// ]);

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const rawTypes = ["pdf", "doc", "docx", "txt", "xls", "xlsx", "ppt", "pptx"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    const isRaw = rawTypes.includes(ext);

    // إنشاء معرف فريد للملف
    const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    // القاعدة الأساسية
    const baseParams = {
      folder: "labs",
      resource_type: isRaw ? "raw" : "image",
      type: "upload",
      access_mode: "public", // يمكنك إزالته إذا لم يعمل، لكنه مفيد للتأكيد
    };

    if (isRaw) {
      // للملفات الخام: نضيف الامتداد إلى public_id ولا نرسل format
      baseParams.public_id = `${uniqueId}.${ext}`;
    } else {
      // للصور: public_id بدون امتداد، ونرسل format منفصلاً
      baseParams.public_id = uniqueId;
      baseParams.format = ext;
    }

    return baseParams;
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    const allowed = [
      "pdf",
      "doc",
      "docx",
      "png",
      "jpg",
      "jpeg",
      "txt",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
    ];
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("نوع الملف غير مسموح به"), false);
    }
  },
});

export const uploadLabFiles = upload.fields([
  { name: "battaka_file", maxCount: 10 },
  { name: "hassila_file", maxCount: 10 },
  { name: "nashatat_file", maxCount: 10 },
]);

export const uploadSingleLabFile = upload.fields([
  { name: "file", maxCount: 1 },
]);
