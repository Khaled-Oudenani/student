// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4 text-blue-700">
//         مرحبًا بك في لوحة التحكم
//       </h1>
//       <p className="text-gray-700">
//         من هنا يمكنك إدارة معلومات الطلبة وإضافة أو تعديل بياناتهم.
//       </p>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [recentTeachers, setRecentTeachers] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students`
      );
      setStudentsCount(data.length);
    };
    fetchStudents();

    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/teachers`
        );
        setTeachersCount(data.length);
        setRecentTeachers((data || []).slice(0, 5));
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">
        مرحبًا بك في لوحة التحكم 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">إحصائيات عامة</h2>
          <p>
            عدد الطلبة المسجلين:{" "}
            <span className="font-bold">{studentsCount}</span>
          </p>
          <p className="mt-2">
            عدد الأساتذة المسجلين:{" "}
            <span className="font-bold">{teachersCount}</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">روابط سريعة</h2>
          <div className="flex flex-col gap-2">
            <a href="/admin/manage" className="text-blue-600">
              إدارة الطلبة
            </a>
            <a href="/admin/manage-teachers" className="text-blue-600">
              إدارة الأساتذة
            </a>
          </div>
        </div>
      </div>

      {/* قائمة مختصرة بالأساتذة الجدد */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-4">آخر الأساتذة</h2>
        {recentTeachers.length === 0 ? (
          <p className="text-gray-600">لا توجد بيانات حالياً</p>
        ) : (
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">الاسم</th>
                <th className="p-2">التخصص</th>
                <th className="p-2">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {recentTeachers.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="p-2">
                    {t.firstName} {t.lastName}
                  </td>
                  <td className="p-2">{t.specialty}</td>
                  <td className="p-2">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/update-teacher/${t._id}`)
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={async () => {
                          if (
                            !window.confirm("هل أنت متأكد من حذف هذا الأستاذ؟")
                          )
                            return;
                          try {
                            const token = localStorage.getItem("adminToken");
                            await axios.delete(
                              `${import.meta.env.VITE_API_URL}/api/teachers/${
                                t._id
                              }`,
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            setRecentTeachers((prev) =>
                              prev.filter((x) => x._id !== t._id)
                            );
                            setTeachersCount((c) => Math.max(0, c - 1));
                          } catch (err) {
                            console.error("Delete teacher error:", err);
                            alert("فشل حذف الأستاذ. تأكد من صلاحياتك.");
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
