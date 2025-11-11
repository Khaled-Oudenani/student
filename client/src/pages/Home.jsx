import React, { useState } from "react";
import StudentCard from "../componentes/StudentCard.jsx";
import { useContext } from "react";
import { AppContext } from "../appContext/AppContext.jsx";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLabMembership, setSelectedLabMembership] = useState("");
  const { students } = useContext(AppContext);

  // تصفية الطلاب بناءً على معايير البحث
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "" || student.specialty === selectedSpecialty;

    const matchesLab =
      selectedLabMembership === "" ||
      (selectedLabMembership === "نعم" && student.hasLab) ||
      (selectedLabMembership === "لا" && !student.hasLab);

    return matchesSearch && matchesSpecialty && matchesLab;
  });

  return (
    <div className="mx-auto px-4 py-8 font-arabic" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          دليل طلبة الدكتوراه
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
      </div>

      {/* قسم البحث والتصفية */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="ابحث عن طالب (الاسم أو اللقب)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[250px] px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />

        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-blue-500 min-w-[180px] transition-colors"
        >
          <option value="">جميع التخصصات</option>
          <option>تاريخ الحضارات القديمة</option>
          <option>تاريخ و حضارة المشرق الاسلامي</option>
          <option>تاريخ المغرب الحديث و المعاصر</option>
          <option>سمعي بصري</option>
          <option>الاتصال الجماهيري و الوسائط الجديدة</option>
          <option>اتصال و علاقات عامة</option>
          <option>تاريخ و حضارت المشرق الاسلامي</option>
          <option>التاريخ الوسيط</option>
          <option>تاريخ حديث و معاصر</option>
          <option>الاتصال الجماهيري</option>
          <option>تاريخ الجزائر المعاصر</option>
          <option>اعلام جديد و قضايا المجتمع</option>
        </select>

        <select
          value={selectedLabMembership}
          onChange={(e) => setSelectedLabMembership(e.target.value)}
          className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-blue-500 min-w-[180px] transition-colors"
        >
          <option value="">الانتماء للمخبر</option>
          <option value="نعم">نعم</option>
          <option value="لا">لا</option>
        </select>
      </div>

      {/* عدد النتائج */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          عدد النتائج:{" "}
          <span className="font-bold text-blue-600">
            {filteredStudents.length}
          </span>
        </p>
      </div>

      {/* بطاقات الطلاب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-400">لا توجد نتائج مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
