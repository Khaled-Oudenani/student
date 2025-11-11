import React from "react";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/student/${student.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200">
      {/* صورة الطالب */}
      <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
        <img
          src={student.profileImage}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* المعلومات الأساسية */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {student.firstName} {student.lastName}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          <strong className="text-gray-700">رقم التسجيل:</strong>{" "}
          {student.registrationNumber}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong className="text-gray-700">التخصص:</strong> {student.specialty}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong className="text-gray-700">سنة الأطروحة:</strong>{" "}
          {student.thesisYear}
        </p>
      </div>

      {/* حالة الانتماء للمخبر */}
      <div className="mb-4">
        {student.hasLab ? (
          <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold">
            ✓ منتمي للمخبر
          </span>
        ) : (
          <span className="inline-block px-4 py-2 bg-gray-400 text-white rounded-full text-sm font-bold">
            ✗ غير منتمي للمخبر
          </span>
        )}
      </div>

      {/* زر عرض التفاصيل */}
      <button
        onClick={handleShowDetails}
        className="w-full py-3 bg-blue-500 text-white rounded-lg text-base font-bold hover:bg-blue-600 transition-colors duration-300"
      >
        عرض التفاصيل
      </button>
    </div>
  );
};

export default StudentCard;
