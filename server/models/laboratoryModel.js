// import mongoose from "mongoose";

// const BattakaSchema = new mongoose.Schema({
//   text: { type: String, default: null },
//   file: { type: String, default: null },
// });

// const HassilaSchema = new mongoose.Schema({
//   text: { type: String, default: null },
//   file: { type: String, default: null },
// });

// const NashatetSchema = new mongoose.Schema({
//   text: { type: String, default: null },
//   file: { type: String, default: null },
// });

// const MakhabarSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     battaka_taqniya: { type: BattakaSchema, default: () => ({}) },
//     hassila: { type: HassilaSchema, default: () => ({}) },
//     nashatat: { type: NashatetSchema, default: () => ({}) },
//   },
//   { timestamps: true },
// );

// const LaboratorySchema = new mongoose.Schema(
//   {
//     makhaber: {
//       type: [MakhabarSchema],
//       default: [],
//     },
//   },
//   { timestamps: true },
// );

// const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

// export default Laboratory;

// ///////////

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
  },
  { timestamps: true },
);

const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

export default Laboratory;
