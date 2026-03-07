import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  text: { type: String, default: null },
  file: { type: String, default: null },
});

const ScientificManifestationSchema = new mongoose.Schema(
  {
    ayyamDirasiyaWaTakwiniya: { type: [FieldSchema], default: [] },
    nadawatWataniya: { type: [FieldSchema], default: [] },
    nadawatDawliya: { type: [FieldSchema], default: [] },
    multaqayatWataniya: { type: [FieldSchema], default: [] },
    multaqayatDawliya: { type: [FieldSchema], default: [] },
  },
  { timestamps: true },
);

const ScientificManifestation = mongoose.model(
  "ScientificManifestation",
  ScientificManifestationSchema,
);

export default ScientificManifestation;
