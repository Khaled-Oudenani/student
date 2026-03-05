// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinaryConfig.js";

// // ============================================================
// // إعداد التخزين على Cloudinary
// // ============================================================
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => ({
//     folder: "labs",
//     allowed_formats: ["pdf", "doc", "docx", "png", "jpg", "jpeg"],
//     resource_type:
//       file.mimetype === "application/pdf" || file.mimetype.includes("word")
//         ? "raw" // للملفات مثل pdf و doc
//         : "image", // للصور
//     public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
//   }),
// });

// // ============================================================
// // إعداد multer
// // ============================================================
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB حد أقصى
// });

// // حقول الملفات للمخابر (POST / PUT)
// export const uploadLabFiles = upload.fields([
//   { name: "battaka_file", maxCount: 1 },
//   { name: "hassila_file", maxCount: 1 },
//   { name: "nashatat_file", maxCount: 1 },
// ]);

// // حقل ملف واحد لتحديث حقل معين (PATCH)
// export const uploadSingleLabFile = upload.fields([
//   { name: "file", maxCount: 1 },
// ]);
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// ============================================================
// إعداد Cloudinary
// ============================================================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ============================================================
// إعداد التخزين على Cloudinary
// ============================================================
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "labs",
    allowed_formats: [
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
    ],
    resource_type: "raw",
    public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  }),
});

// ============================================================
// إعداد multer
// ============================================================
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB حد أقصى
});

// حقول الملفات للمخابر (POST / PUT)
export const uploadLabFiles = upload.fields([
  { name: "battaka_file", maxCount: 1 },
  { name: "hassila_file", maxCount: 1 },
  { name: "nashatat_file", maxCount: 1 },
]);

// حقل ملف واحد لتحديث حقل معين (PATCH)
export const uploadSingleLabFile = upload.fields([
  { name: "file", maxCount: 1 },
]);
