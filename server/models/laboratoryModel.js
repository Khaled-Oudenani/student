// import mongoose from "mongoose";

// const FieldSchema = new mongoose.Schema({
//   text: { type: String, default: null },
//   file: { type: String, default: null },
// });

// const LaboratorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     battaka_taqniya: { type: [FieldSchema], default: [] },
//     hassila: { type: [FieldSchema], default: [] },
//     nashatat: { type: [FieldSchema], default: [] },
//   },
//   { timestamps: true },
// );

// const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

// export default Laboratory;

//

import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  text: { type: String, default: null },
  file: { type: String, default: null },
});

const LaboratorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    battaka_taqniya: { type: [FieldSchema], default: [] },
    hassila: { type: [FieldSchema], default: [] },
    nashatat: { type: [FieldSchema], default: [] },
    taareef: { type: String, default: null }, // نص واحد فقط
    mokawinat: { type: [String], default: [] }, // نصوص متعددة
    firaq: { type: [String], default: [] }, // نصوص متعددة
  },
  { timestamps: true },
);

const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

export default Laboratory;
