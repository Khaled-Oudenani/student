import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const fetchTeachers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers`
      );
      setTeachers(data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      alert("حدث خطأ أثناء جلب الأساتذة");
    }
  };

  const deleteTeacher = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الأستاذ؟")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeachers();
    } catch (err) {
      console.error("Delete teacher error:", err);
      alert("فشل الحذف");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">إدارة الأساتذة</h2>
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/add-teacher")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          أضف أستاذ
        </button>
      </div>

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
          {teachers.map((t) => (
            <tr key={t._id} className="border-t">
              <td className="p-2">{t.registrationNumber}</td>
              <td className="p-2">{t.firstName}</td>
              <td className="p-2">{t.lastName}</td>
              <td className="p-2">{t.specialty}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => navigate(`/admin/update-teacher/${t._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  تعديل
                </button>
                <button
                  onClick={() => deleteTeacher(t._id)}
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

export default ManageTeachers;
