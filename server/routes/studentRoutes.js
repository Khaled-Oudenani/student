import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 رفع صورة واحدة (مثل profileImage)
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

// 🔹 CRUD
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", protect, createStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

export default router;
