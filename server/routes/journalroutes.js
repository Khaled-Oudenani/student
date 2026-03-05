import express from "express";
import {
  getAllMajallat,
  getMajalaById,
  addMajala,
  updateMajala,
  patchMajala,
  deleteMajala,
} from "../controllers/journalcontroller.js";

const router = express.Router();

// ============================================================
// المسارات (بدون multer لأن المجلات text فقط)
// ============================================================

// GET  /api/journals             → جلب كل المجلات
router.get("/", getAllMajallat);

// GET  /api/journals/:id         → جلب مجلة واحدة
router.get("/:id", getMajalaById);

// POST /api/journals             → إضافة مجلة جديدة
router.post("/", addMajala);

// PUT  /api/journals/:id         → تعديل مجلة بالكامل
router.put("/:id", updateMajala);

// PATCH /api/journals/:id/field  → تعديل حقل معين فقط
router.patch("/:id/field", patchMajala);

// DELETE /api/journals/:id       → حذف مجلة
router.delete("/:id", deleteMajala);

export default router;
