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
