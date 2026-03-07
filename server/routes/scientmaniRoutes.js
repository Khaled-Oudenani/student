import express from "express";
import {
  getScientificManifestation,
  upsertScientificManifestation,
  addEntry,
  deleteEntry,
} from "../controllers/scientmaniController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ─── Cloudinary config ─────────────────────────────────────
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
    const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const baseParams = {
      folder: "scientmani",
      resource_type: isRaw ? "raw" : "image",
      type: "upload",
      access_mode: "public",
    };

    if (isRaw) {
      baseParams.public_id = `${uniqueId}.${ext}`;
    } else {
      baseParams.public_id = uniqueId;
      baseParams.format = ext;
    }

    return baseParams;
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
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

// رفع ملفات لكل الحقول دفعة واحدة
const uploadAllFields = upload.fields([
  { name: "ayyamDirasiyaWaTakwiniya_file", maxCount: 10 },
  { name: "nadawatWataniya_file", maxCount: 10 },
  { name: "nadawatDawliya_file", maxCount: 10 },
  { name: "multaqayatWataniya_file", maxCount: 10 },
  { name: "multaqayatDawliya_file", maxCount: 10 },
]);

// رفع ملف واحد لإضافة entry منفردة
const uploadSingleFile = upload.fields([
  { name: "scientmani_file", maxCount: 1 },
]);

// ─── Routes ────────────────────────────────────────────────

// GET    /api/scientmani
router.get("/", getScientificManifestation);

// POST   /api/scientmani  (إنشاء أو تحديث كامل)
router.post("/", uploadAllFields, upsertScientificManifestation);

// POST   /api/scientmani/:field  (إضافة entry لحقل معين)
router.post("/:field", uploadSingleFile, addEntry);

// DELETE /api/scientmani/:field/:index  (حذف entry بالـ index)
router.delete("/:field/:index", deleteEntry);

export default router;
