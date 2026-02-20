import Teacher from "../models/teacherModel.js";

// ✅ إرجاع جميع الأساتذة
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ إرجاع الأساتذة
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "الأستاذ غير موجود" });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ إضافة أستاذ جديد
export const createTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ تعديل بيانات أستاذ
export const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTeacher)
      return res.status(404).json({ message: "الأستاذ غير موجود" });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ حذف أستاذ
export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher)
      return res.status(404).json({ message: "الأستاذ غير موجود" });
    res.status(200).json({ message: "تم حذف الأستاذ بنجاح" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
