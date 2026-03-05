// import express from "express";
// import {
//   getAllMakhaber,
//   getMakhabarById,
//   addMakhabar,
//   updateMakhabar,
//   patchMakhabar,
//   deleteMakhabar,
// } from "../controllers/laboratorycontroller.js";
// import { uploadLabFiles, uploadSingleLabFile } from "../config/Multerconfig.js";

// const router = express.Router();

// // GET  /api/laboratories         → جلب كل المخابر
// router.get("/", getAllMakhaber);

// // GET  /api/laboratories/:id     → جلب مخبر واحد
// router.get("/:id", getMakhabarById);

// // POST /api/laboratories         → إضافة مخبر جديد
// router.post("/", uploadLabFiles, addMakhabar);

// // PUT  /api/laboratories/:id     → تعديل مخبر بالكامل
// router.put("/:id", uploadLabFiles, updateMakhabar);

// // PATCH /api/laboratories/:id/field → تعديل حقل معين فقط
// router.patch("/:id/field", uploadSingleLabFile, patchMakhabar);

// // DELETE /api/laboratories/:id   → حذف مخبر
// router.delete("/:id", deleteMakhabar);

// export default router;

// ///////////

import express from "express";
import {
  getAllMakhaber,
  getMakhabarById,
  addMakhabar,
  updateMakhabar,
  deleteMakhabar,
} from "../controllers/laboratorycontroller.js";
import { uploadLabFiles } from "../config/Multerconfig.js";

const router = express.Router();

router.get("/", getAllMakhaber);
router.get("/:id", getMakhabarById);
router.post("/", uploadLabFiles, addMakhabar);
router.put("/:id", uploadLabFiles, updateMakhabar);
router.delete("/:id", deleteMakhabar);

export default router;
