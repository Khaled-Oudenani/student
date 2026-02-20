import express from "express";
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 رفع صورة واحدة (مثل profileImage)

// use /upload so the full route becomes /api/teachers/upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "لم يتم رفع أي صورة" });
  }
  // return a consistent response like student upload route
  res.status(200).json({ imageUrl: req.file.path });
});

// 🔹 CRUD
router.get("/", getTeachers);
router.get("/:id", getTeacherById);
router.post("/", protect, createTeacher);
router.put("/:id", protect, updateTeacher);
router.delete("/:id", protect, deleteTeacher);

export default router;
