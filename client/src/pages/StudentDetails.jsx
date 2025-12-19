// import React, { useContext } from "react";
// import { AppContext } from "../appContext/AppContext.jsx";
// import { useParams } from "react-router-dom";
// import {
//   User,
//   Calendar,
//   BookOpen,
//   Award,
//   FileText,
//   ImageIcon,
// } from "lucide-react";

// const StudentDetails = () => {
//   const { students } = useContext(AppContext);
//   const { id } = useParams();

//   // تأكد من مقارنة id كنص لتفادي اختلاف الأنواع
//   const student = students.find((s) => String(s._id) === id);

//   // 🔹 إذا لم يُعثر على الطالب بعد (البيانات لم تصل)
//   if (!student) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//             جاري تحميل بيانات الطالب...
//           </h2>
//           <p className="text-gray-500">يرجى الانتظار لحظات</p>
//         </div>
//       </div>
//     );
//   }

//   const calculateAge = (birthDate) => {
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birth.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   return (
//     <div className="min-h-screen p-4" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <img
//               src={student.profileImage}
//               alt="صورة الطالب"
//               className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
//             />
//             <div className="flex-1 text-center md:text-right">
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 {student.firstName} {student.lastName}
//               </h1>
//               <p className="text-gray-600 mb-2">
//                 رقم التسجيل: {student.registrationNumber}
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center md:justify-start">
//                 <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
//                   {student.specialty}
//                 </span>
//                 <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//                   سنة اول تسجيل: {student.thesisYear}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Personal Info */}
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <User className="text-indigo-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 المعلومات الشخصية
//               </h2>
//             </div>
//             <div className="space-y-3">
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">تاريخ الميلاد:</span>
//                 <span className="font-medium">
//                   {new Date(student.birthDate).toLocaleDateString("ar-DZ")}
//                 </span>
//               </div>
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">العمر:</span>
//                 <span className="font-medium">
//                   {calculateAge(student.birthDate)} سنة
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <BookOpen className="text-indigo-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 المعلومات الأكاديمية
//               </h2>
//             </div>
//             <div className="space-y-3">
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">الانتماء للمخبر:</span>
//                 <span className="font-medium">
//                   {student.hasLab ? "نعم" : "لا"}
//                 </span>
//               </div>
//               {student.hasLab && (
//                 <div className="flex justify-between border-b pb-2">
//                   <span className="text-gray-600">اسم المخبر:</span>
//                   <span className="font-medium text-sm">{student.labName}</span>
//                 </div>
//               )}
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">فرقة البحث:</span>
//                 <span className="font-medium">{student.researchTeam}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Publications */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex items-center gap-2 mb-4">
//             <FileText className="text-indigo-600" size={24} />
//             <h2 className="text-xl font-bold text-gray-800">
//               المنشورات العلمية
//             </h2>
//           </div>
//           <div className="space-y-4">
//             {student.publications?.map((pub, idx) => (
//               <div
//                 key={idx}
//                 className="border-r-4 border-indigo-500 bg-gray-50 p-4 rounded"
//               >
//                 <h3 className="font-bold text-gray-800 mb-2">{pub.title}</h3>
//                 <p className="text-sm text-gray-600 mb-2">
//                   الفئة: {pub.category}
//                 </p>
//                 <a
//                   href={pub.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-600 hover:text-indigo-800 text-sm underline"
//                 >
//                   رابط المقال
//                 </a>
//               </div>
//             ))}
//           </div>

//           {student.journals?.length > 0 && (
//             <div className="mt-6">
//               <h3 className="font-bold text-gray-700 mb-3">المجلات:</h3>
//               <div className="space-y-2">
//                 {student.journals.map((journal, idx) => (
//                   <a
//                     key={idx}
//                     href={journal}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block text-indigo-600 hover:text-indigo-800 text-sm underline"
//                   >
//                     مجلة {idx + 1}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {student.bookPublications?.length > 0 && (
//             <div className="mt-6">
//               <h3 className="font-bold text-gray-700 mb-3">إصدارات الكتب:</h3>
//               <ul className="list-disc list-inside space-y-1">
//                 {student.bookPublications.map((book, idx) => (
//                   <li key={idx} className="text-gray-700">
//                     {book}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Certificate */}
//         {student.publicationCertificate && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Award className="text-indigo-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">شهادة النشر</h2>
//             </div>
//             <img
//               src={student.publicationCertificate}
//               alt="شهادة النشر"
//               className="w-full max-w-md mx-auto rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {/* Interventions */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center gap-2 mb-6">
//             <ImageIcon className="text-indigo-600" size={24} />
//             <h2 className="text-xl font-bold text-gray-800">
//               المداخلات والمشاركات
//             </h2>
//           </div>

//           <div className="space-y-6">
//             {student.interventions?.nationalConference?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-blue-700 mb-3">ملتقيات وطنية:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {student.interventions.nationalConference.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`ملتقى وطني ${idx + 1}`}
//                       className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {student.interventions?.internationalConference?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-green-700 mb-3">
//                   ملتقيات دولية:
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {student.interventions.internationalConference.map(
//                     (img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`ملتقى دولي ${idx + 1}`}
//                         className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow"
//                       />
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {student.interventions?.nationalSeminar?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-yellow-700 mb-3">ندوات وطنية:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {student.interventions.nationalSeminar.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`ندوة وطنية ${idx + 1}`}
//                       className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {student.interventions?.internationalSeminar?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-red-700 mb-3">ندوات دولية:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {student.interventions.internationalSeminar.map(
//                     (img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`ندوة دولية ${idx + 1}`}
//                         className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow"
//                       />
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;
import React, { useContext } from "react";
import { AppContext } from "../appContext/AppContext.jsx";
import { useParams } from "react-router-dom";
import { User, BookOpen, Award, FileText, ImageIcon } from "lucide-react";

const StudentDetails = () => {
  const { students } = useContext(AppContext);
  const { id } = useParams();

  const student = students.find((s) => String(s._id) === id);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">جاري تحميل بيانات الطالب...</h2>
        </div>
      </div>
    );
  }

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // فحص موثوق لملفات PDF (Cloudinary)
  const isPDF = (url) => url?.includes("/raw/upload") || url?.includes(".pdf");

  // فتح الملف في نافذة جديدة مع عرضه inline
  const openPDFInNewTab = (url) => {
    // استخدام Google Docs Viewer لعرض PDF مباشرة
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      url
    )}&embedded=true`;
    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* ===== Header ===== */}
        <div className="bg-white p-8 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {student.profileImage ? (
              isPDF(student.profileImage) ? (
                <button
                  onClick={() => openPDFInNewTab(student.profileImage)}
                  className="text-indigo-600 underline text-sm hover:text-indigo-800 cursor-pointer"
                >
                  عرض الملف الشخصي (PDF)
                </button>
              ) : (
                <img
                  src={student.profileImage}
                  alt="صورة الطالب"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                />
              )
            ) : (
              <p className="text-gray-400 text-sm">لا توجد صورة</p>
            )}

            <div className="text-center md:text-right">
              <h1 className="text-3xl font-bold text-gray-800">
                {student.firstName} {student.lastName}
              </h1>
              <p className="text-gray-600">
                رقم التسجيل: {student.registrationNumber}
              </p>
              <p className="text-gray-600">
                العمر: {calculateAge(student.birthDate)} سنة
              </p>
            </div>
          </div>
        </div>

        {/* ===== Personal Info ===== */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-indigo-600" />
              <h2 className="font-bold text-lg">المعلومات الشخصية</h2>
            </div>
            <p>
              تاريخ الميلاد:{" "}
              {new Date(student.birthDate).toLocaleDateString("ar-DZ")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-indigo-600" />
              <h2 className="font-bold text-lg">المعلومات الأكاديمية</h2>
            </div>
            <p>الفرقة البحثية: {student.researchTeam}</p>
            <p>الانتماء للمخبر: {student.hasLab ? "نعم" : "لا"}</p>
            {student.hasLab && <p>اسم المخبر: {student.labName}</p>}
          </div>
        </div>

        {/* ===== Publication Certificate ===== */}
        {student.publicationCertificate && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-indigo-600" />
              <h2 className="font-bold text-lg">شهادة النشر</h2>
            </div>

            {isPDF(student.publicationCertificate) ? (
              <button
                onClick={() => openPDFInNewTab(student.publicationCertificate)}
                className="text-indigo-600 underline hover:text-indigo-800 cursor-pointer"
              >
                عرض شهادة النشر (PDF)
              </button>
            ) : (
              <img
                src={student.publicationCertificate}
                alt="شهادة النشر"
                className="w-full max-w-md mx-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            )}
          </div>
        )}

        {/* ===== Interventions ===== */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="text-indigo-600" />
            <h2 className="font-bold text-lg">المداخلات والمشاركات</h2>
          </div>

          {student.interventions?.nationalConference?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-blue-700 mb-3">
                ملتقيات وطنية
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {student.interventions.nationalConference.map((file, i) =>
                  isPDF(file) ? (
                    <button
                      key={i}
                      onClick={() => openPDFInNewTab(file)}
                      className="text-indigo-600 underline text-sm hover:text-indigo-800 cursor-pointer text-right"
                    >
                      عرض ملف (PDF)
                    </button>
                  ) : (
                    <img
                      key={i}
                      src={file}
                      alt={`ملتقى وطني ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  )
                )}
              </div>
            </div>
          )}

          {student.interventions?.internationalConference?.length > 0 && (
            <div>
              <h3 className="font-semibold text-green-700 mb-3">
                ملتقيات دولية
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {student.interventions.internationalConference.map((file, i) =>
                  isPDF(file) ? (
                    <button
                      key={i}
                      onClick={() => openPDFInNewTab(file)}
                      className="text-indigo-600 underline text-sm hover:text-indigo-800 cursor-pointer text-right"
                    >
                      عرض ملف (PDF)
                    </button>
                  ) : (
                    <img
                      key={i}
                      src={file}
                      alt={`ملتقى دولي ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
