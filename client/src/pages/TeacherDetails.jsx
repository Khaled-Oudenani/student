import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/teachers/${id}`
        );
        setTeacher(res.data);
      } catch (err) {
        console.error("Error fetching teacher:", err);
      }
    };
    if (id) fetchTeacher();
  }, [id]);

  if (!teacher) return <div className="p-6">جارٍ التحميل...</div>;

  return (
    <div className="min-h-screen p-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={teacher.profileImage}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {teacher.firstName} {teacher.lastName}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              رقم التسجيل: {teacher.registrationNumber || "-"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              التخصص: {teacher.specialty || "-"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              تاريخ الميلاد:{" "}
              {teacher.birthDate
                ? new Date(teacher.birthDate).toLocaleDateString("ar-DZ")
                : "-"}
            </p>

            {teacher.publications && teacher.publications.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">المنشورات</h3>
                <ul className="list-disc pr-5">
                  {teacher.publications.map((p, idx) => (
                    <li key={idx} className="mb-1">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                        {p.title}
                      </a>{" "}
                      — {p.category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
