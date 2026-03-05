import express from "express";
import {
  getAllMajallat,
  getMajalaById,
  addMajala,
  updateMajala,
  deleteMajala,
} from "../controllers/Journalcontroller.js";
import { uploadLabFiles } from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getAllMajallat);
router.get("/:id", getMajalaById);
router.post("/", uploadLabFiles, addMajala);
router.put("/:id", uploadLabFiles, updateMajala);
router.delete("/:id", deleteMajala);

export default router;
