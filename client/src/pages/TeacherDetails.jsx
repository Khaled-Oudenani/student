// import React, { useContext } from "react";
// import { AppContext } from "../appContext/AppContext.jsx";
// import { useParams } from "react-router-dom";
// import {
//   User,
//   BookOpen,
//   Award,
//   FileText,
//   ImageIcon,
//   FlaskConical,
//   Microscope,
// } from "lucide-react";

// const TeacherDetails = () => {
//   const { teachers } = useContext(AppContext);
//   const { id } = useParams();

//   const teacher = teachers.find((t) => String(t._id) === id);

//   if (!teacher) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//             جاري تحميل بيانات الأستاذ...
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

//   const rankColors = {
//     "محاضر أ": "bg-blue-100 text-blue-700",
//     "محاضر ب": "bg-purple-100 text-purple-700",
//     "أستاذ تعليم عالي": "bg-green-100 text-green-700",
//   };

//   return (
//     <div className="min-h-screen p-4" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <img
//               src={teacher.profileImage}
//               alt="صورة الأستاذ"
//               className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
//             />
//             <div className="flex-1 text-center md:text-right">
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 {teacher.firstName} {teacher.lastName}
//               </h1>
//               <div className="flex flex-wrap gap-2 justify-center md:justify-start">
//                 <span
//                   className={`px-4 py-1 rounded-full text-sm font-medium ${
//                     rankColors[teacher.academicRank] ||
//                     "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {teacher.academicRank}
//                 </span>
//                 {/* <span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
//                   سنة الأطروحة: {teacher.thesisYear}
//                 </span> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* المعلومات الشخصية */}
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <User className="text-emerald-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 المعلومات الشخصية
//               </h2>
//             </div>
//             <div className="space-y-3">
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">تاريخ الميلاد:</span>
//                 <span className="font-medium">
//                   {new Date(teacher.birthDate).toLocaleDateString("ar-DZ")}
//                 </span>
//               </div>
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">العمر:</span>
//                 <span className="font-medium">
//                   {calculateAge(teacher.birthDate)} سنة
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <BookOpen className="text-emerald-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 المعلومات الأكاديمية
//               </h2>
//             </div>
//             <div className="space-y-3">
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">الرتبة العلمية:</span>
//                 <span
//                   className={`font-medium text-sm px-3 py-1 rounded-full ${
//                     rankColors[teacher.academicRank] ||
//                     "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {teacher.academicRank}
//                 </span>
//               </div>
//               {/* <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-600">سنة مشروع الأطروحة:</span>
//                 <span className="font-medium">{teacher.thesisYear}</span>
//               </div> */}
//             </div>
//           </div>
//         </div>

//         {/* المنشورات العلمية */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex items-center gap-2 mb-4">
//             <FileText className="text-emerald-600" size={24} />
//             <h2 className="text-xl font-bold text-gray-800">
//               المنشورات العلمية
//             </h2>
//           </div>

//           <div className="space-y-4">
//             {teacher.publications?.map((pub, idx) => (
//               <div
//                 key={idx}
//                 className="border-r-4 border-emerald-500 bg-gray-50 p-4 rounded"
//               >
//                 <h3 className="font-bold text-gray-800 mb-2">{pub.title}</h3>
//                 <p className="text-sm text-gray-600 mb-2">
//                   الفئة: {pub.category}
//                 </p>
//                 <a
//                   href={pub.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-emerald-600 hover:text-emerald-800 text-sm underline"
//                 >
//                   رابط المقال
//                 </a>
//               </div>
//             ))}
//           </div>

//           {/* {teacher.journals?.length > 0 && (
//             <div className="mt-6">
//               <h3 className="font-bold text-gray-700 mb-3">المجلات:</h3>
//               <div className="space-y-2">
//                 {teacher.journals.map((journal, idx) => (
//                   <a
//                     key={idx}
//                     href={journal}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block text-emerald-600 hover:text-emerald-800 text-sm underline"
//                   >
//                     مجلة {idx + 1}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )} */}

//           {teacher.bookPublications?.length > 0 && (
//             <div className="mt-6">
//               <h3 className="font-bold text-gray-700 mb-3">إصدارات الكتب:</h3>
//               <ul className="list-disc list-inside space-y-1">
//                 {teacher.bookPublications.map((book, idx) => (
//                   <li key={idx} className="text-gray-700">
//                     {book}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* شهادة النشر */}
//         {teacher.publicationCertificate && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Award className="text-emerald-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">شهادة النشر</h2>
//             </div>
//             <img
//               src={teacher.publicationCertificate}
//               alt="شهادة النشر"
//               className="w-full max-w-md mx-auto rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {/* مخابر البحث و المجلات العلمية */}
//         {teacher.researchLabsAndJournals?.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <div className="flex items-center gap-2 mb-6">
//               <FlaskConical className="text-emerald-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 مخابر البحث و المجلات العلمية
//               </h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {teacher.researchLabsAndJournals.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
//                 >
//                   {item.image && (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                   )}
//                   <div className="p-3 bg-gray-50">
//                     <p className="font-semibold text-gray-800 text-center">
//                       {item.name}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* النشاطات و التظاهرات العلمية */}
//         {teacher.scientificActivities?.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <div className="flex items-center gap-2 mb-6">
//               <Microscope className="text-emerald-600" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 النشاطات و التظاهرات العلمية
//               </h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {teacher.scientificActivities.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
//                 >
//                   {item.image && (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                   )}
//                   <div className="p-3 bg-gray-50">
//                     <p className="font-semibold text-gray-800 text-center">
//                       {item.name}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* المداخلات والمشاركات */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center gap-2 mb-6">
//             <ImageIcon className="text-emerald-600" size={24} />
//             <h2 className="text-xl font-bold text-gray-800">
//               المداخلات والمشاركات
//             </h2>
//           </div>

//           <div className="space-y-6">
//             {teacher.interventions?.nationalConference?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-blue-700 mb-3">ملتقيات وطنية:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {teacher.interventions.nationalConference.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`ملتقى وطني ${idx + 1}`}
//                       className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {teacher.interventions?.internationalConference?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-green-700 mb-3">
//                   ملتقيات دولية:
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {teacher.interventions.internationalConference.map(
//                     (img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`ملتقى دولي ${idx + 1}`}
//                         className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
//                       />
//                     ),
//                   )}
//                 </div>
//               </div>
//             )}

//             {teacher.interventions?.nationalSeminar?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-yellow-700 mb-3">ندوات وطنية:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {teacher.interventions.nationalSeminar.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`ندوة وطنية ${idx + 1}`}
//                       className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {teacher.interventions?.internationalSeminar?.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-red-700 mb-3">ندوات دولية:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {teacher.interventions.internationalSeminar.map(
//                     (img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`ندوة دولية ${idx + 1}`}
//                         className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
//                       />
//                     ),
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

// export default TeacherDetails;

//

import React, { useContext } from "react";
import { AppContext } from "../appContext/AppContext.jsx";
import { useParams } from "react-router-dom";
import {
  User,
  BookOpen,
  Award,
  FileText,
  ImageIcon,
  Newspaper,
  Monitor,
} from "lucide-react";

const TeacherDetails = () => {
  const { teachers } = useContext(AppContext);
  const { id } = useParams();

  const teacher = teachers.find((t) => String(t._id) === id);

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            جاري تحميل بيانات الأستاذ...
          </h2>
          <p className="text-gray-500">يرجى الانتظار لحظات</p>
        </div>
      </div>
    );
  }

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const rankColors = {
    "محاضر أ": "bg-blue-100 text-blue-700",
    "محاضر ب": "bg-purple-100 text-purple-700",
    "أستاذ تعليم عالي": "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={teacher.profileImage}
              alt="صورة الأستاذ"
              className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
            />
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {teacher.firstName} {teacher.lastName}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    rankColors[teacher.academicRank] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {teacher.academicRank}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* المعلومات الشخصية */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                المعلومات الشخصية
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">تاريخ الميلاد:</span>
                <span className="font-medium">
                  {new Date(teacher.birthDate).toLocaleDateString("ar-DZ")}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">العمر:</span>
                <span className="font-medium">
                  {calculateAge(teacher.birthDate)} سنة
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                المعلومات الأكاديمية
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">الرتبة العلمية:</span>
                <span
                  className={`font-medium text-sm px-3 py-1 rounded-full ${
                    rankColors[teacher.academicRank] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {teacher.academicRank}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* المنشورات العلمية */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-emerald-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">
              المنشورات العلمية
            </h2>
          </div>

          <div className="space-y-4">
            {teacher.publications?.map((pub, idx) => (
              <div
                key={idx}
                className="border-r-4 border-emerald-500 bg-gray-50 p-4 rounded"
              >
                <h3 className="font-bold text-gray-800 mb-2">{pub.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  الفئة: {pub.category}
                </p>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-800 text-sm underline"
                >
                  رابط المقال
                </a>
              </div>
            ))}
          </div>

          {teacher.bookPublications?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-700 mb-3">إصدارات الكتب:</h3>
              <ul className="list-disc list-inside space-y-1">
                {teacher.bookPublications.map((book, idx) => (
                  <li key={idx} className="text-gray-700">
                    {book}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* شهادة النشر */}
        {teacher.publicationCertificate && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">شهادة النشر</h2>
            </div>
            <a
              href={teacher.publicationCertificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={teacher.publicationCertificate}
                alt="شهادة النشر"
                className="w-full max-w-md mx-auto rounded-lg shadow-md hover:opacity-90 hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            </a>
          </div>
        )}

        {/* مخابر البحث و المجلات العلمية */}
        {teacher.researchLabsAndJournals?.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                مخابر البحث و المجلات العلمية
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacher.researchLabsAndJournals.map((item, idx) => (
                <a
                  key={idx}
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer"
                      />
                    )}
                    <div className="p-3 bg-gray-50">
                      <p className="font-semibold text-gray-800 text-center">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* النشاطات و التظاهرات العلمية */}
        {teacher.scientificActivities?.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Monitor className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                النشاطات و التظاهرات العلمية
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacher.scientificActivities.map((item, idx) => (
                <a
                  key={idx}
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer"
                      />
                    )}
                    <div className="p-3 bg-gray-50">
                      <p className="font-semibold text-gray-800 text-center">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* المداخلات والمشاركات */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="text-emerald-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">
              المداخلات والمشاركات
            </h2>
          </div>

          <div className="space-y-6">
            {teacher.interventions?.nationalConference?.length > 0 && (
              <div>
                <h3 className="font-bold text-blue-700 mb-3">ملتقيات وطنية:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teacher.interventions.nationalConference.map((img, idx) => (
                    <a
                      key={idx}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img}
                        alt={`ملتقى وطني ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {teacher.interventions?.internationalConference?.length > 0 && (
              <div>
                <h3 className="font-bold text-green-700 mb-3">
                  ملتقيات دولية:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teacher.interventions.internationalConference.map(
                    (img, idx) => (
                      <a
                        key={idx}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={img}
                          alt={`ملتقى دولي ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer"
                        />
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}

            {teacher.interventions?.nationalSeminar?.length > 0 && (
              <div>
                <h3 className="font-bold text-yellow-700 mb-3">ندوات وطنية:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teacher.interventions.nationalSeminar.map((img, idx) => (
                    <a
                      key={idx}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img}
                        alt={`ندوة وطنية ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {teacher.interventions?.internationalSeminar?.length > 0 && (
              <div>
                <h3 className="font-bold text-red-700 mb-3">ندوات دولية:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teacher.interventions.internationalSeminar.map(
                    (img, idx) => (
                      <a
                        key={idx}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={img}
                          alt={`ندوة دولية ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer"
                        />
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
