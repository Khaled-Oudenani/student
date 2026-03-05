// import mongoose from "mongoose";

// // --- Sub-schemas ---

// const BattakaJournalSchema = new mongoose.Schema({
//   text: { type: String, default: null },
// });

// const AadadSchema = new mongoose.Schema({
//   text: { type: String, default: null },
// });

// // --- المجلة الواحدة ---
// const MajalaSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // اسم المجلة
//     battaka_taqniya: { type: BattakaJournalSchema, default: () => ({}) },
//     aadat: { type: AadadSchema, default: () => ({}) },
//   },
//   { timestamps: true },
// );

// // --- المصفوفة الرئيسية ---
// const JournalSchema = new mongoose.Schema(
//   {
//     majallat: {
//       type: [MajalaSchema],
//       default: [],
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Journal", JournalSchema);
import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  text: { type: String, default: null },
  file: { type: String, default: null },
});

const JournalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    battaka_taqniya: { type: [FieldSchema], default: [] },
    aadat: { type: String, default: null },
  },
  { timestamps: true },
);

const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;
