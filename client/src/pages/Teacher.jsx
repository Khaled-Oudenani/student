import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../appContext/AppContext.jsx";

const Teacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const navigate = useNavigate();
  const { teachers } = useContext(AppContext);

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      (t.firstName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.lastName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "" || t.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="mx-auto p-2 font-arabic max-w-6xl">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-4 mt-2">
          <div className="inline-block">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              قائمة الأساتذة
            </h1>
            <div className="flex justify-center gap-2 mt-3">
              <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
              <div className="w-16 h-1 bg-indigo-500 rounded-full"></div>
              <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* قسم البحث والتصفية */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-5 border border-gray-100">
          <div className="flex flex-wrap gap-2 justify-center">
            {/* حقل البحث */}
            <div className="flex-1 min-w-[280px] relative">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="ابحث عن أستاذ (الاسم أو اللقب)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-2 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300"
              />
            </div>

            {/* قائمة التخصصات */}
            <div className="relative min-w-[220px]">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 text-base border-2 border-gray-200 rounded-xl bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 appearance-none"
              >
                <option value="">جميع التخصصات</option>
                <option>تاريخ الحضارات القديمة</option>
                <option>تاريخ و حضارة المشرق الاسلامي</option>
                <option>تاريخ المغرب الحديث و المعاصر</option>
                <option>سمعي بصري</option>
                <option>الاتصال الجماهيري و الوسائط الجديدة</option>
                <option>اتصال و علاقات عامة</option>
                <option>التاريخ الوسيط</option>
                <option>تاريخ حديث و معاصر</option>
                <option>الاتصال الجماهيري</option>
                <option>تاريخ الجزائر المعاصر</option>
                <option>اعلام جديد و قضايا المجتمع</option>
              </select>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* عدد النتائج */}
          <div className="text-center mt-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
              <span className="text-gray-700 text-lg">عدد الأساتذة:</span>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {filtered.length}
              </span>
            </div>
          </div>
        </div>

        {/* جدول البيانات */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="p-2 text-right font-semibold">#</th>
                    <th className="p-2 text-right font-semibold">الصورة</th>
                    <th className="p-2 text-right font-semibold">الاسم</th>
                    <th className="p-2 text-right font-semibold">التخصص</th>
                    <th className="p-2 text-right font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((t, idx) => (
                    <tr
                      key={t._id || idx}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <td className="p-2 text-right">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <div className="flex justify-right">
                          <img
                            src={t.profileImage}
                            alt={`${t.firstName} ${t.lastName}`}
                            className="w-14 h-14 object-cover rounded-full border-2 border-blue-200 shadow-md hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </td>
                      <td className="p-2 text-right">
                        <span className="text-gray-800 font-semibold">
                          {(t.firstName || "") + " " + (t.lastName || "")}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                          {t.specialty || "-"}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <button
                          onClick={() => navigate(`/teacher/${t._id}`)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        >
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block">
                <svg
                  className="w-24 h-24 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl text-gray-400 font-semibold mb-2">
                  لا توجد نتائج مطابقة للبحث
                </p>
                <p className="text-gray-400">جرب استخدام كلمات بحث مختلفة</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
