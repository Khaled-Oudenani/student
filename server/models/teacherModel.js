// import mongoose from "mongoose";

// const publicationSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // عنوان المقال أو الورقة
//   link: { type: String, required: true }, // رابط المقال
//   category: { type: String, required: true }, // صنف المقال
// });

// // ✅ كل نوع من الملتقيات/الندوات عبارة عن قائمة صور (روابط)
// const interventionSchema = new mongoose.Schema({
//   nationalConference: [{ type: String }], // صور الملتقيات الوطنية
//   internationalConference: [{ type: String }], // صور الملتقيات الدولية
//   nationalSeminar: [{ type: String }], // صور الندوات الوطنية
//   internationalSeminar: [{ type: String }], // صور الندوات الدولية
// });

// const teacherSchema = new mongoose.Schema({
//   registrationNumber: { type: String, required: true, unique: true }, // رقم التسجيل
//   firstName: { type: String, required: true }, // الاسم
//   lastName: { type: String, required: true }, // اللقب
//   birthDate: { type: Date, required: true }, // تاريخ الميلاد
//   thesisYear: { type: Number, required: true }, // سنة مشروع الأطروحة

//   specialty: {
//     type: String,
//     enum: [
//       "تاريخ الحضارات القديمة",
//       "تاريخ و حضارة المشرق الاسلامي",
//       "تاريخ المغرب الحديث و المعاصر",
//       "سمعي بصري",
//       "الاتصال الجماهيري و الوسائط الجديدة",
//       "اتصال و علاقات عامة",
//       "تاريخ و حضارت المشرق الاسلامي",
//       "التاريخ الوسيط",
//       "تاريخ حديث و معاصر",
//       "الاتصال الجماهيري",
//       "تاريخ الجزائر المعاصر",
//       "اعلام جديد و قضايا المجتمع",
//     ],
//     required: true,
//   }, // التخصص

//   hasLab: { type: Boolean, default: false }, // الانتماء للمخبر
//   labName: { type: String }, // اسم المخبر (اختياري)

//   researchTeam: { type: String }, // فرقة البحث

//   journals: [{ type: String }], // روابط المجلات
//   bookPublications: [{ type: String }], // روابط أو أسماء إصدارات الكتب

//   publications: [publicationSchema], // المنشورات
//   publicationCertificate: { type: String }, // شهادة النشر (صورة)
//   interventions: interventionSchema, // ✅ المداخلات (قوائم صور لكل نوع)

//   profileImage: { type: String }, // 🧍‍♂️ الصورة الشخصية (رابط)
// });

// const Teacher = mongoose.model("Teacher", teacherSchema);
// export default Teacher;

// تم حذف هذا الملف لأنه لم يعد مستخدمًا في المشروع.

import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, required: true },
});

const interventionSchema = new mongoose.Schema({
  nationalConference: [{ type: String }],
  internationalConference: [{ type: String }],
  nationalSeminar: [{ type: String }],
  internationalSeminar: [{ type: String }],
});

// مخابر البحث و المجلات العلمية
const researchLabSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم المخبر أو المجلة
  image: { type: String }, // صورة
});

// النشاطات و التظاهرات العلمية
const scientificActivitySchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم النشاط أو التظاهرة
  image: { type: String }, // صورة
});

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  // thesisYear: { type: Number, required: true },

  // الرتبة العلمية
  academicRank: {
    type: String,
    enum: ["محاضر أ", "محاضر ب", "أستاذ تعليم عالي"],
    required: true,
  },

  // journals: [{ type: String }],
  bookPublications: [{ type: String }],

  publications: [publicationSchema],
  publicationCertificate: { type: String },
  interventions: interventionSchema,

  // مخابر البحث و المجلات العلمية (مصفوفة من الأسماء والصور)
  // researchLabsAndJournals: [researchLabSchema],

  // النشاطات و التظاهرات العلمية (مصفوفة من الأسماء والصور)
  // scientificActivities: [scientificActivitySchema],

  profileImage: { type: String },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
