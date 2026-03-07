import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// اتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import laboratoryRoutes from "./routes/laboratoryroutes.js";
import journalRoutes from "./routes/journalroutes.js";
import scientmaniRoutes from "./routes/scientmaniRoutes.js";

app.use("/api/scientmani", scientmaniRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/laboratories", laboratoryRoutes);
app.use("/api/journals", journalRoutes);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/ping", (req, res) => res.send("pong"));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
