import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminController.js";

const router = express.Router();

// تسجيل الدخول
router.post("/login", loginAdmin);

// إنشاء أدمن جديد (مرة واحدة فقط)
router.post("/register", registerAdmin);

export default router;
