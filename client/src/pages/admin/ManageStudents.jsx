// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ManageStudents = () => {
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("adminToken");

//   const fetchStudents = async () => {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/students`,
//     );
//     setStudents(data);
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا الطالب؟")) return;
//     await axios.delete(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchStudents();
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">إدارة الطلبة</h2>
//       <table className="w-full border bg-white rounded shadow">
//         <thead>
//           <tr className="bg-gray-200 text-right">
//             <th className="p-2">رقم التسجيل</th>
//             <th className="p-2">الاسم</th>
//             <th className="p-2">اللقب</th>
//             <th className="p-2">تخصص</th>
//             <th className="p-2">إجراء</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id} className="border-t">
//               <td className="p-2">{s.registrationNumber}</td>
//               <td className="p-2">{s.firstName}</td>
//               <td className="p-2">{s.lastName}</td>
//               <td className="p-2">{s.specialty}</td>
//               <td className="p-2 text-center space-x-2">
//                 <button
//                   onClick={() => navigate(`/admin/update-student/${s._id}`)}
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                   تعديل
//                 </button>

//                 <button
//                   onClick={() => deleteStudent(s._id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                 >
//                   حذف
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageStudents;

// ظظظظظظظظظظظظظظظظظظظظظظ

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../appContext/AppContext";

const ManageStudents = () => {
  const { students, fetchStudents } = useContext(AppContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const deleteStudent = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطالب؟")) return;

    await axios.delete(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchStudents(); // 🔥 تحديث البيانات من الـ context
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">إدارة الطلبة</h2>
      <table className="w-full border bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-right">
            <th className="p-2">رقم التسجيل</th>
            <th className="p-2">الاسم</th>
            <th className="p-2">اللقب</th>
            <th className="p-2">تخصص</th>
            <th className="p-2">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-2">{s.registrationNumber}</td>
              <td className="p-2">{s.firstName}</td>
              <td className="p-2">{s.lastName}</td>
              <td className="p-2">{s.specialty}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => navigate(`/admin/update-student/${s._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  تعديل
                </button>

                <button
                  onClick={() => deleteStudent(s._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;

// ظظظظظظظظظظظظظظظظظظظظظظ

// مكوّن ManageStudents مع إضافة وظيفة التعديل (update)

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // مكوّن ManageStudents مع إضافة وظيفة التعديل (update)
// export default function ManageStudents() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // حالة المودال وبيانات الطالب الجاري تعديله
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [formData, setFormData] = useState({
//     registrationNumber: "",
//     firstName: "",
//     lastName: "",
//     specialty: "",
//   });

//   const token = localStorage.getItem("adminToken");

//   // جلب الطلبة
//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/students`
//         // اذا ال API يحتاج header للقراءة اضف: , { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setStudents(data);
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       alert("حدث خطأ أثناء جلب الطلبة");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // حذف طالب
//   const deleteStudent = async (id) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا الطالب؟")) return;
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchStudents();
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("فشل الحذف");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // فتح مودال التعديل مع تعبئة الفورم
//   const openEdit = (student) => {
//     setEditingStudent(student);
//     setFormData({
//       registrationNumber: student.registrationNumber || "",
//       firstName: student.firstName || "",
//       lastName: student.lastName || "",
//       specialty: student.specialty || "",
//     });
//     setIsEditOpen(true);
//   };

//   // اغلاق مودال
//   const closeEdit = () => {
//     setIsEditOpen(false);
//     setEditingStudent(null);
//   };

//   // تغيير الحقول
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ارسال التحديث للباك اند
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!editingStudent) return;

//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/students/${editingStudent._id}`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // تحديث الواجهة بعد النجاح
//       fetchStudents();
//       closeEdit();
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("فشل تحديث بيانات الطالب");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">إدارة الطلبة</h2>

//       {loading ? (
//         <p>جارٍ التحميل...</p>
//       ) : (
//         <table className="w-full border bg-white rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-right">
//               <th className="p-2">رقم التسجيل</th>
//               <th className="p-2">الاسم</th>
//               <th className="p-2">اللقب</th>
//               <th className="p-2">تخصص</th>
//               <th className="p-2">إجراء</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s) => (
//               <tr key={s._id} className="border-t">
//                 <td className="p-2">{s.registrationNumber}</td>
//                 <td className="p-2">{s.firstName}</td>
//                 <td className="p-2">{s.lastName}</td>
//                 <td className="p-2">{s.specialty}</td>
//                 <td className="p-2 text-center space-x-2">
//                   <button
//                     onClick={() => openEdit(s)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                   >
//                     تعديل
//                   </button>

//                   <button
//                     onClick={() => deleteStudent(s._id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* مودال التعديل بسيط */}
//       {isEditOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div
//             className="absolute inset-0 bg-black opacity-40"
//             onClick={closeEdit}
//           ></div>
//           <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">تعديل بيانات الطالب</h3>

//             <form onSubmit={handleUpdate} className="space-y-3 text-right">
//               <div>
//                 <label className="block text-sm">رقم التسجيل</label>
//                 <input
//                   name="registrationNumber"
//                   value={formData.registrationNumber}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm">الاسم</label>
//                 <input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm">اللقب</label>
//                 <input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm">التخصص</label>
//                 <input
//                   name="specialty"
//                   value={formData.specialty}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={closeEdit}
//                   className="px-4 py-2 rounded border"
//                 >
//                   إلغاء
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-blue-600 text-white"
//                 >
//                   حفظ التعديلات
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
