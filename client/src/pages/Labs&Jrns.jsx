// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// export default function LabsAndJrns() {
//   const [activeTab, setActiveTab] = useState(null);
//   const [labs, setLabs] = useState([]);
//   const [journals, setJournals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedId, setExpandedId] = useState(null);

//   const fetchLabs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/laboratories`);
//       setLabs(res.data.makhaber || []);
//     } catch {
//       setLabs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchJournals = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/journals`);
//       setJournals(res.data.majallat || []);
//     } catch {
//       setJournals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "labs") fetchLabs();
//     if (activeTab === "journals") fetchJournals();
//     setExpandedId(null);
//   }, [activeTab]);

//   const toggleExpand = (id) =>
//     setExpandedId((prev) => (prev === id ? null : id));

//   // ── مكوّن عرض عناصر المصفوفة ──
//   const FieldItems = ({ items, color }) => {
//     if (!items?.length)
//       return <span className="text-slate-400 text-xs">—</span>;
//     return (
//       <div className="space-y-1.5">
//         {items.map((item, idx) => (
//           <div
//             key={idx}
//             className={`text-xs rounded-lg px-3 py-2 border ${color}`}
//           >
//             {item.text && <p className="text-slate-700">{item.text}</p>}
//             {item.file && (
//               <a
//                 href={item.file}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-500 hover:underline flex items-center gap-1 mt-1"
//               >
//                 <span>📎</span> عرض الملف
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-800">
//             المخابر والمجلات العلمية
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             اختر قسماً لعرض البيانات
//           </p>
//         </div>

//         {/* أزرار التبديل */}
//         <div className="flex gap-4 mb-8">
//           <button
//             onClick={() => setActiveTab("labs")}
//             className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
//               ${
//                 activeTab === "labs"
//                   ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200 shadow-md"
//                   : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
//               }`}
//           >
//             <span className="text-2xl">🔬</span>
//             <span>مخابر البحث</span>
//             {labs.length > 0 && activeTab === "labs" && (
//               <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {labs.length}
//               </span>
//             )}
//           </button>

//           <button
//             onClick={() => setActiveTab("journals")}
//             className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
//               ${
//                 activeTab === "journals"
//                   ? "bg-blue-600 border-blue-600 text-white shadow-blue-200 shadow-md"
//                   : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
//               }`}
//           >
//             <span className="text-2xl">📰</span>
//             <span>المجلات العلمية</span>
//             {journals.length > 0 && activeTab === "journals" && (
//               <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {journals.length}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* المحتوى */}
//         {loading && (
//           <div className="text-center py-16 text-slate-400 text-sm">
//             جارٍ التحميل...
//           </div>
//         )}

//         {/* ── جدول المخابر ── */}
//         {!loading && activeTab === "labs" && (
//           <div>
//             {labs.length === 0 ? (
//               <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
//                 لا توجد مخابر مضافة بعد
//               </div>
//             ) : (
//               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                 {/* رأس الجدول */}
//                 <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                   <div>اسم المخبر</div>
//                   <div>البطاقة التقنية</div>
//                   <div>الحصيلة</div>
//                   <div>النشاطات</div>
//                 </div>

//                 {/* صفوف البيانات */}
//                 {labs.map((lab, idx) => (
//                   <div key={lab._id}>
//                     <div
//                       className={`grid grid-cols-4 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
//                         ${idx !== labs.length - 1 ? "border-b border-slate-100" : ""}
//                         ${expandedId === lab._id ? "bg-emerald-50/40" : ""}
//                       `}
//                       onClick={() => toggleExpand(lab._id)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-base">🔬</span>
//                         <span className="font-semibold text-slate-800 text-sm">
//                           {lab.name}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-2.5 py-1">
//                           {lab.battaka_taqniya?.length || 0} عنصر
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
//                           {lab.hassila?.length || 0} عنصر
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2.5 py-1">
//                           {lab.nashatat?.length || 0} عنصر
//                         </span>
//                         <span className="text-slate-400 text-xs">
//                           {expandedId === lab._id ? "▲" : "▼"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* تفاصيل موسّعة */}
//                     {expandedId === lab._id && (
//                       <div className="grid grid-cols-3 gap-4 px-5 py-4 bg-slate-50 border-t border-slate-100">
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             📋 البطاقة التقنية
//                           </p>
//                           <FieldItems
//                             items={lab.battaka_taqniya}
//                             color="bg-emerald-50 border-emerald-100"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             📊 الحصيلة
//                           </p>
//                           <FieldItems
//                             items={lab.hassila}
//                             color="bg-slate-50 border-slate-200"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             ⚡ النشاطات
//                           </p>
//                           <FieldItems
//                             items={lab.nashatat}
//                             color="bg-amber-50 border-amber-100"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── جدول المجلات ── */}
//         {!loading && activeTab === "journals" && (
//           <div>
//             {journals.length === 0 ? (
//               <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
//                 لا توجد مجلات مضافة بعد
//               </div>
//             ) : (
//               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                 {/* رأس الجدول */}
//                 <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                   <div>اسم المجلة</div>
//                   <div>البطاقة التقنية</div>
//                   <div>الأعداد</div>
//                 </div>

//                 {/* صفوف البيانات */}
//                 {journals.map((journal, idx) => (
//                   <div key={journal._id}>
//                     <div
//                       className={`grid grid-cols-3 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
//                         ${idx !== journals.length - 1 ? "border-b border-slate-100" : ""}
//                         ${expandedId === journal._id ? "bg-blue-50/40" : ""}
//                       `}
//                       onClick={() => toggleExpand(journal._id)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-base">📰</span>
//                         <span className="font-semibold text-slate-800 text-sm">
//                           {journal.name}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-1">
//                           {journal.battaka_taqniya?.length || 0} عنصر
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
//                           {journal.aadat ? "متاح" : "—"}
//                         </span>
//                         <span className="text-slate-400 text-xs">
//                           {expandedId === journal._id ? "▲" : "▼"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* تفاصيل موسّعة */}
//                     {expandedId === journal._id && (
//                       <div className="grid grid-cols-2 gap-4 px-5 py-4 bg-slate-50 border-t border-slate-100">
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             📋 البطاقة التقنية
//                           </p>
//                           <FieldItems
//                             items={journal.battaka_taqniya}
//                             color="bg-blue-50 border-blue-100"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             📰 الأعداد
//                           </p>
//                           {journal.aadat ? (
//                             <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">
//                               {journal.aadat}
//                             </p>
//                           ) : (
//                             <span className="text-slate-400 text-xs">—</span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* حالة البداية */}
//         {!activeTab && (
//           <div className="text-center py-16 text-slate-400 text-sm">
//             اضغط على أحد الأزرار لعرض البيانات
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ///////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// // ── خارج الـ component لتجنب مشكلة الـ focus ──
// const FieldItems = ({ items, color }) => {
//   if (!items?.length) return <span className="text-slate-400 text-xs">—</span>;
//   return (
//     <div className="space-y-1.5">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className={`text-xs rounded-lg px-3 py-2 border ${color}`}
//         >
//           {item.text && <p className="text-slate-700">{item.text}</p>}
//           {item.file && (
//             <a
//               href={item.file}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-500 hover:underline flex items-center gap-1 mt-1"
//             >
//               <span>📎</span> عرض الملف
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const TextItems = ({ items, color }) => {
//   if (!items?.length) return <span className="text-slate-400 text-xs">—</span>;
//   return (
//     <div className="space-y-1.5">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className={`text-xs rounded-lg px-3 py-2 border ${color}`}
//         >
//           <p className="text-slate-700">{item}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function LabsAndJrns() {
//   const [activeTab, setActiveTab] = useState(null);
//   const [labs, setLabs] = useState([]);
//   const [journals, setJournals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedId, setExpandedId] = useState(null);

//   const fetchLabs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/laboratories`);
//       setLabs(res.data.makhaber || []);
//     } catch {
//       setLabs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchJournals = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/journals`);
//       setJournals(res.data.majallat || []);
//     } catch {
//       setJournals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "labs") fetchLabs();
//     if (activeTab === "journals") fetchJournals();
//     setExpandedId(null);
//   }, [activeTab]);

//   const toggleExpand = (id) =>
//     setExpandedId((prev) => (prev === id ? null : id));

//   return (
//     <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-800">
//             المخابر والمجلات العلمية
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             اختر قسماً لعرض البيانات
//           </p>
//         </div>

//         {/* أزرار التبديل */}
//         <div className="flex gap-4 mb-8">
//           <button
//             onClick={() => setActiveTab("labs")}
//             className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
//               ${
//                 activeTab === "labs"
//                   ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200 shadow-md"
//                   : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
//               }`}
//           >
//             <span className="text-2xl">🔬</span>
//             <span>مخابر البحث</span>
//             {labs.length > 0 && activeTab === "labs" && (
//               <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {labs.length}
//               </span>
//             )}
//           </button>

//           <button
//             onClick={() => setActiveTab("journals")}
//             className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
//               ${
//                 activeTab === "journals"
//                   ? "bg-blue-600 border-blue-600 text-white shadow-blue-200 shadow-md"
//                   : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
//               }`}
//           >
//             <span className="text-2xl">📰</span>
//             <span>المجلات العلمية</span>
//             {journals.length > 0 && activeTab === "journals" && (
//               <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {journals.length}
//               </span>
//             )}
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-16 text-slate-400 text-sm">
//             جارٍ التحميل...
//           </div>
//         )}

//         {/* ── جدول المخابر ── */}
//         {!loading && activeTab === "labs" && (
//           <div>
//             {labs.length === 0 ? (
//               <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
//                 لا توجد مخابر مضافة بعد
//               </div>
//             ) : (
//               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                 {/* رأس الجدول */}
//                 <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                   <div>اسم المخبر</div>
//                   <div>البطاقة التقنية</div>
//                   <div>الحصيلة</div>
//                   <div>النشاطات</div>
//                 </div>

//                 {labs.map((lab, idx) => (
//                   <div key={lab._id}>
//                     <div
//                       className={`grid grid-cols-4 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
//                         ${idx !== labs.length - 1 ? "border-b border-slate-100" : ""}
//                         ${expandedId === lab._id ? "bg-emerald-50/40" : ""}`}
//                       onClick={() => toggleExpand(lab._id)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-base">🔬</span>
//                         <span className="font-semibold text-slate-800 text-sm">
//                           {lab.name}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-2.5 py-1">
//                           {lab.battaka_taqniya?.length || 0} عنصر
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
//                           {lab.hassila?.length || 0} عنصر
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2.5 py-1">
//                           {lab.nashatat?.length || 0} عنصر
//                         </span>
//                         <span className="text-slate-400 text-xs">
//                           {expandedId === lab._id ? "▲" : "▼"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* تفاصيل موسّعة */}
//                     {expandedId === lab._id && (
//                       <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 space-y-4">
//                         {/* التعريف */}
//                         {lab.taareef && (
//                           <div>
//                             <p className="text-xs font-semibold text-slate-500 mb-2">
//                               📝 التعريف
//                             </p>
//                             <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">
//                               {lab.taareef}
//                             </p>
//                           </div>
//                         )}

//                         {/* البطاقة التقنية، الحصيلة، النشاطات */}
//                         <div className="grid grid-cols-3 gap-4">
//                           <div>
//                             <p className="text-xs font-semibold text-slate-500 mb-2">
//                               📋 البطاقة التقنية
//                             </p>
//                             <FieldItems
//                               items={lab.battaka_taqniya}
//                               color="bg-emerald-50 border-emerald-100"
//                             />
//                           </div>
//                           <div>
//                             <p className="text-xs font-semibold text-slate-500 mb-2">
//                               📊 الحصيلة
//                             </p>
//                             <FieldItems
//                               items={lab.hassila}
//                               color="bg-slate-50 border-slate-200"
//                             />
//                           </div>
//                           <div>
//                             <p className="text-xs font-semibold text-slate-500 mb-2">
//                               ⚡ النشاطات
//                             </p>
//                             <FieldItems
//                               items={lab.nashatat}
//                               color="bg-amber-50 border-amber-100"
//                             />
//                           </div>
//                         </div>

//                         {/* المكونات والفرق */}
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <p className="text-xs font-semibold text-slate-500 mb-2">
//                               🧩 المكونات
//                             </p>
//                             <TextItems
//                               items={lab.mokawinat}
//                               color="bg-purple-50 border-purple-100"
//                             />
//                           </div>
//                           <div>
//                             <p className="text-xs font-semibold text-slate-500 mb-2">
//                               👥 الفرق
//                             </p>
//                             <TextItems
//                               items={lab.firaq}
//                               color="bg-blue-50 border-blue-100"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── جدول المجلات ── */}
//         {!loading && activeTab === "journals" && (
//           <div>
//             {journals.length === 0 ? (
//               <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
//                 لا توجد مجلات مضافة بعد
//               </div>
//             ) : (
//               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                 <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                   <div>اسم المجلة</div>
//                   <div>البطاقة التقنية</div>
//                   <div>الأعداد</div>
//                 </div>

//                 {journals.map((journal, idx) => (
//                   <div key={journal._id}>
//                     <div
//                       className={`grid grid-cols-3 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
//                         ${idx !== journals.length - 1 ? "border-b border-slate-100" : ""}
//                         ${expandedId === journal._id ? "bg-blue-50/40" : ""}`}
//                       onClick={() => toggleExpand(journal._id)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-base">📰</span>
//                         <span className="font-semibold text-slate-800 text-sm">
//                           {journal.name}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-1">
//                           {journal.battaka_taqniya?.length || 0} عنصر
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
//                           {journal.aadat ? "متاح" : "—"}
//                         </span>
//                         <span className="text-slate-400 text-xs">
//                           {expandedId === journal._id ? "▲" : "▼"}
//                         </span>
//                       </div>
//                     </div>

//                     {expandedId === journal._id && (
//                       <div className="grid grid-cols-2 gap-4 px-5 py-4 bg-slate-50 border-t border-slate-100">
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             📋 البطاقة التقنية
//                           </p>
//                           <FieldItems
//                             items={journal.battaka_taqniya}
//                             color="bg-blue-50 border-blue-100"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-xs font-semibold text-slate-500 mb-2">
//                             📰 الأعداد
//                           </p>
//                           {journal.aadat ? (
//                             <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">
//                               {journal.aadat}
//                             </p>
//                           ) : (
//                             <span className="text-slate-400 text-xs">—</span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {!activeTab && (
//           <div className="text-center py-16 text-slate-400 text-sm">
//             اضغط على أحد الأزرار لعرض البيانات
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// 3333333333333

// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// // ── CSS مدمج ──
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap');

//   .labs-root * { box-sizing: border-box; }

//   .labs-root {
//     font-family: 'Tajawal', sans-serif;
//     min-height: 100vh;
//     background: #0a0f1e;
//     background-image:
//       radial-gradient(ellipse 80% 60% at 20% -10%, rgba(16,185,129,0.12) 0%, transparent 60%),
//       radial-gradient(ellipse 60% 50% at 80% 110%, rgba(59,130,246,0.1) 0%, transparent 60%);
//     color: #e2e8f0;
//     padding: 3rem 1rem;
//     direction: rtl;
//   }

//   .labs-container { max-width: 900px; margin: 0 auto; }

//   /* Header */
//   .labs-header { margin-bottom: 3rem; }
//   .labs-eyebrow {
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.7rem;
//     color: #10b981;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     margin-bottom: 0.75rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }
//   .labs-eyebrow::before {
//     content: '';
//     display: inline-block;
//     width: 2rem;
//     height: 1px;
//     background: #10b981;
//   }
//   .labs-title {
//     font-size: 2.25rem;
//     font-weight: 800;
//     background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     line-height: 1.2;
//     margin: 0 0 0.5rem;
//   }
//   .labs-subtitle { font-size: 0.9rem; color: #64748b; margin: 0; font-weight: 300; }

//   /* Tab buttons */
//   .tab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }

//   .tab-btn {
//     position: relative;
//     padding: 1.5rem;
//     border-radius: 1rem;
//     border: 1px solid rgba(255,255,255,0.07);
//     background: rgba(255,255,255,0.03);
//     cursor: pointer;
//     transition: all 0.3s ease;
//     text-align: right;
//     overflow: hidden;
//   }
//   .tab-btn::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     opacity: 0;
//     transition: opacity 0.3s;
//     border-radius: inherit;
//   }
//   .tab-btn:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
//   .tab-btn:hover::before { opacity: 1; }

//   .tab-btn.lab-btn.active {
//     border-color: rgba(16,185,129,0.4);
//     background: rgba(16,185,129,0.08);
//     box-shadow: 0 0 40px rgba(16,185,129,0.1), inset 0 1px 0 rgba(16,185,129,0.15);
//   }
//   .tab-btn.journal-btn.active {
//     border-color: rgba(59,130,246,0.4);
//     background: rgba(59,130,246,0.08);
//     box-shadow: 0 0 40px rgba(59,130,246,0.1), inset 0 1px 0 rgba(59,130,246,0.15);
//   }

//   .tab-btn-icon { font-size: 2rem; margin-bottom: 0.75rem; display: block; }
//   .tab-btn-label { font-size: 1rem; font-weight: 700; color: #f1f5f9; display: block; margin-bottom: 0.25rem; }
//   .tab-btn-desc { font-size: 0.75rem; color: #64748b; font-weight: 300; }

//   .tab-count {
//     position: absolute;
//     top: 1rem;
//     left: 1rem;
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.65rem;
//     font-weight: 600;
//     padding: 0.2rem 0.5rem;
//     border-radius: 2rem;
//   }
//   .lab-btn .tab-count { background: rgba(16,185,129,0.15); color: #10b981; }
//   .journal-btn .tab-count { background: rgba(59,130,246,0.15); color: #60a5fa; }

//   /* Loading */
//   .loading-state {
//     text-align: center;
//     padding: 5rem 0;
//     color: #475569;
//     font-size: 0.85rem;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 1rem;
//   }
//   .loader {
//     width: 2rem; height: 2rem;
//     border: 2px solid rgba(255,255,255,0.05);
//     border-top-color: #10b981;
//     border-radius: 50%;
//     animation: spin 0.8s linear infinite;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   /* Empty */
//   .empty-state {
//     text-align: center;
//     padding: 5rem 2rem;
//     background: rgba(255,255,255,0.02);
//     border: 1px dashed rgba(255,255,255,0.08);
//     border-radius: 1.25rem;
//     color: #475569;
//     font-size: 0.85rem;
//   }
//   .empty-state-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.4; }

//   /* Initial state */
//   .initial-state {
//     text-align: center;
//     padding: 5rem 0;
//     color: #334155;
//     font-size: 0.9rem;
//   }

//   /* Cards list */
//   .cards-list { display: flex; flex-direction: column; gap: 0.75rem; }

//   /* Lab / Journal Card */
//   .entity-card {
//     border-radius: 1rem;
//     border: 1px solid rgba(255,255,255,0.07);
//     background: rgba(255,255,255,0.03);
//     overflow: hidden;
//     transition: border-color 0.2s;
//   }
//   .entity-card:hover { border-color: rgba(255,255,255,0.12); }
//   .entity-card.expanded-lab { border-color: rgba(16,185,129,0.25); }
//   .entity-card.expanded-journal { border-color: rgba(59,130,246,0.25); }

//   .card-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 1.1rem 1.4rem;
//     cursor: pointer;
//     transition: background 0.2s;
//   }
//   .card-header:hover { background: rgba(255,255,255,0.02); }

//   .card-title-area { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
//   .card-icon {
//     width: 2.4rem; height: 2.4rem;
//     border-radius: 0.6rem;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 1.1rem;
//     flex-shrink: 0;
//   }
//   .lab-icon { background: rgba(16,185,129,0.12); }
//   .journal-icon { background: rgba(59,130,246,0.12); }

//   .card-name {
//     font-size: 0.95rem;
//     font-weight: 700;
//     color: #f1f5f9;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   .card-meta { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }

//   .meta-pill {
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.65rem;
//     font-weight: 600;
//     padding: 0.2rem 0.6rem;
//     border-radius: 2rem;
//     white-space: nowrap;
//   }
//   .pill-green { background: rgba(16,185,129,0.12); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
//   .pill-slate { background: rgba(100,116,139,0.12); color: #94a3b8; border: 1px solid rgba(100,116,139,0.2); }
//   .pill-amber { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
//   .pill-blue  { background: rgba(59,130,246,0.12);  color: #60a5fa; border: 1px solid rgba(59,130,246,0.2); }
//   .pill-purple{ background: rgba(139,92,246,0.12); color: #a78bfa; border: 1px solid rgba(139,92,246,0.2); }

//   .chevron {
//     width: 1.5rem; height: 1.5rem;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.05);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 0.6rem;
//     color: #64748b;
//     transition: transform 0.2s, background 0.2s;
//     flex-shrink: 0;
//   }
//   .chevron.open { transform: rotate(180deg); background: rgba(255,255,255,0.08); color: #94a3b8; }

//   /* Expanded details */
//   .card-details {
//     border-top: 1px solid rgba(255,255,255,0.06);
//     padding: 1.25rem 1.4rem;
//     background: rgba(0,0,0,0.15);
//     animation: slideDown 0.2s ease;
//   }
//   @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

//   .detail-section { margin-bottom: 1.25rem; }
//   .detail-section:last-child { margin-bottom: 0; }

//   .detail-label {
//     font-size: 0.7rem;
//     font-weight: 700;
//     color: #475569;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     margin-bottom: 0.6rem;
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//   }

//   .detail-text {
//     font-size: 0.82rem;
//     color: #94a3b8;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 0.6rem;
//     padding: 0.75rem 1rem;
//     line-height: 1.7;
//   }

//   .detail-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
//   .detail-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }

//   .field-items-list { display: flex; flex-direction: column; gap: 0.4rem; }
//   .field-item {
//     font-size: 0.78rem;
//     color: #94a3b8;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 0.5rem;
//     padding: 0.5rem 0.75rem;
//     line-height: 1.5;
//   }
//   .field-item a {
//     color: #60a5fa;
//     text-decoration: none;
//     font-size: 0.72rem;
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     margin-top: 0.25rem;
//   }
//   .field-item a:hover { text-decoration: underline; }
//   .field-empty { font-size: 0.75rem; color: #334155; font-style: italic; }

//   .divider {
//     height: 1px;
//     background: rgba(255,255,255,0.05);
//     margin: 1.25rem 0;
//   }

//   @media (max-width: 640px) {
//     .detail-grid-3 { grid-template-columns: 1fr; }
//     .detail-grid-2 { grid-template-columns: 1fr; }
//     .card-meta .meta-pill:nth-child(n+3) { display: none; }
//     .labs-title { font-size: 1.6rem; }
//   }
// `;

// // ── Sub-components ──
// const FieldItems = ({ items }) => {
//   if (!items?.length)
//     return <span className="field-empty">لا توجد بيانات</span>;
//   return (
//     <div className="field-items-list">
//       {items.map((item, idx) => (
//         <div key={idx} className="field-item">
//           {item.text && <p>{item.text}</p>}
//           {item.file && (
//             <a href={item.file} target="_blank" rel="noreferrer">
//               <span>📎</span> عرض الملف
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const TextItems = ({ items }) => {
//   if (!items?.length)
//     return <span className="field-empty">لا توجد بيانات</span>;
//   return (
//     <div className="field-items-list">
//       {items.map((item, idx) => (
//         <div key={idx} className="field-item">
//           {item}
//         </div>
//       ))}
//     </div>
//   );
// };

// // ── Lab Card ──
// const LabCard = ({ lab, expanded, onToggle }) => (
//   <div className={`entity-card ${expanded ? "expanded-lab" : ""}`}>
//     <div className="card-header" onClick={onToggle}>
//       <div className="card-title-area">
//         <div className="card-icon lab-icon">🔬</div>
//         <span className="card-name">{lab.name}</span>
//       </div>
//       <div className="card-meta">
//         {lab.battaka_taqniya?.length > 0 && (
//           <span className="meta-pill pill-green">
//             {lab.battaka_taqniya.length} بطاقة
//           </span>
//         )}
//         {lab.hassila?.length > 0 && (
//           <span className="meta-pill pill-slate">
//             {lab.hassila.length} حصيلة
//           </span>
//         )}
//         {lab.nashatat?.length > 0 && (
//           <span className="meta-pill pill-amber">
//             {lab.nashatat.length} نشاط
//           </span>
//         )}
//         <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
//       </div>
//     </div>

//     {expanded && (
//       <div className="card-details">
//         {lab.taareef && (
//           <div className="detail-section">
//             <div className="detail-label">📝 التعريف</div>
//             <div className="detail-text">{lab.taareef}</div>
//           </div>
//         )}

//         <div className="detail-grid-3 detail-section">
//           <div>
//             <div className="detail-label">📋 البطاقة التقنية</div>
//             <FieldItems items={lab.battaka_taqniya} />
//           </div>
//           <div>
//             <div className="detail-label">📊 الحصيلة</div>
//             <FieldItems items={lab.hassila} />
//           </div>
//           <div>
//             <div className="detail-label">⚡ النشاطات</div>
//             <FieldItems items={lab.nashatat} />
//           </div>
//         </div>

//         {(lab.mokawinat?.length > 0 || lab.firaq?.length > 0) && (
//           <>
//             <div className="divider" />
//             <div className="detail-grid-2">
//               <div>
//                 <div className="detail-label">🧩 المكونات</div>
//                 <TextItems items={lab.mokawinat} />
//               </div>
//               <div>
//                 <div className="detail-label">👥 الفرق</div>
//                 <TextItems items={lab.firaq} />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     )}
//   </div>
// );

// // ── Journal Card ──
// const JournalCard = ({ journal, expanded, onToggle }) => (
//   <div className={`entity-card ${expanded ? "expanded-journal" : ""}`}>
//     <div className="card-header" onClick={onToggle}>
//       <div className="card-title-area">
//         <div className="card-icon journal-icon">📰</div>
//         <span className="card-name">{journal.name}</span>
//       </div>
//       <div className="card-meta">
//         {journal.battaka_taqniya?.length > 0 && (
//           <span className="meta-pill pill-blue">
//             {journal.battaka_taqniya.length} بطاقة
//           </span>
//         )}
//         {journal.aadat && (
//           <span className="meta-pill pill-slate">أعداد متاحة</span>
//         )}
//         <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
//       </div>
//     </div>

//     {expanded && (
//       <div className="card-details">
//         <div className="detail-grid-2">
//           <div>
//             <div className="detail-label">📋 البطاقة التقنية</div>
//             <FieldItems items={journal.battaka_taqniya} />
//           </div>
//           <div>
//             <div className="detail-label">📰 الأعداد</div>
//             {journal.aadat ? (
//               <div className="detail-text">{journal.aadat}</div>
//             ) : (
//               <span className="field-empty">لا توجد بيانات</span>
//             )}
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );

// // ── Main ──
// export default function LabsAndJrns() {
//   const [activeTab, setActiveTab] = useState(null);
//   const [labs, setLabs] = useState([]);
//   const [journals, setJournals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedId, setExpandedId] = useState(null);

//   const fetchLabs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/laboratories`);
//       setLabs(res.data.makhaber || []);
//     } catch {
//       setLabs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchJournals = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/journals`);
//       setJournals(res.data.majallat || []);
//     } catch {
//       setJournals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "labs") fetchLabs();
//     if (activeTab === "journals") fetchJournals();
//     setExpandedId(null);
//   }, [activeTab]);

//   const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="labs-root">
//         <div className="labs-container">
//           {/* Header */}
//           <header className="labs-header">
//             <div className="labs-eyebrow">منظومة البحث العلمي</div>
//             <h1 className="labs-title">المخابر والمجلات العلمية</h1>
//             <p className="labs-subtitle">
//               استعراض تفاصيل المخابر البحثية والمجلات العلمية
//             </p>
//           </header>

//           {/* Tabs */}
//           <div className="tab-grid">
//             <button
//               className={`tab-btn lab-btn ${activeTab === "labs" ? "active" : ""}`}
//               onClick={() => setActiveTab("labs")}
//             >
//               {activeTab === "labs" && labs.length > 0 && (
//                 <span className="tab-count">{labs.length}</span>
//               )}
//               <span className="tab-btn-icon">🔬</span>
//               <span className="tab-btn-label">مخابر البحث</span>
//               <span className="tab-btn-desc">المخابر العلمية والبحثية</span>
//             </button>

//             <button
//               className={`tab-btn journal-btn ${activeTab === "journals" ? "active" : ""}`}
//               onClick={() => setActiveTab("journals")}
//             >
//               {activeTab === "journals" && journals.length > 0 && (
//                 <span className="tab-count">{journals.length}</span>
//               )}
//               <span className="tab-btn-icon">📰</span>
//               <span className="tab-btn-label">المجلات العلمية</span>
//               <span className="tab-btn-desc">المجلات والدوريات البحثية</span>
//             </button>
//           </div>

//           {/* Content */}
//           {loading && (
//             <div className="loading-state">
//               <div className="loader" />
//               <span>جارٍ تحميل البيانات...</span>
//             </div>
//           )}

//           {!loading &&
//             activeTab === "labs" &&
//             (labs.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">🔬</div>لا توجد مخابر مضافة
//                 بعد
//               </div>
//             ) : (
//               <div className="cards-list">
//                 {labs.map((lab) => (
//                   <LabCard
//                     key={lab._id}
//                     lab={lab}
//                     expanded={expandedId === lab._id}
//                     onToggle={() => toggle(lab._id)}
//                   />
//                 ))}
//               </div>
//             ))}

//           {!loading &&
//             activeTab === "journals" &&
//             (journals.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">📰</div>لا توجد مجلات مضافة
//                 بعد
//               </div>
//             ) : (
//               <div className="cards-list">
//                 {journals.map((j) => (
//                   <JournalCard
//                     key={j._id}
//                     journal={j}
//                     expanded={expandedId === j._id}
//                     onToggle={() => toggle(j._id)}
//                   />
//                 ))}
//               </div>
//             ))}

//           {!activeTab && (
//             <div className="initial-state">اختر قسماً لعرض البيانات</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// 444444444

// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// // ── الأنماط (سجلّ بحث علمي / فهرس مخابر ومجلات) ──
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;600;700&family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

//   .labs-root * { box-sizing: border-box; }

//   .labs-root {
//     --ink-950: #15120d;
//     --ink-900: #1f1a14;
//     --ink-850: #29231a;
//     --line: rgba(237,228,208,0.08);
//     --line-strong: rgba(237,228,208,0.18);
//     --parchment: #ede4d0;
//     --parchment-dim: #a39a86;
//     --parchment-faint: #6b6455;
//     --brass: #cc9a4d;
//     --brass-dim: rgba(204,154,77,0.14);
//     --teal: #54a196;
//     --teal-dim: rgba(84,161,150,0.14);
//     --stamp: #b5533f;

//     font-family: 'Tajawal', sans-serif;
//     min-height: 100vh;
//     background: var(--ink-950);
//     background-image:
//       radial-gradient(ellipse 70% 50% at 12% -10%, rgba(204,154,77,0.07) 0%, transparent 60%),
//       radial-gradient(ellipse 60% 45% at 88% 105%, rgba(84,161,150,0.06) 0%, transparent 60%);
//     color: var(--parchment);
//     padding: 3rem 1.25rem 5rem;
//     direction: rtl;
//   }

//   .labs-container { max-width: 920px; margin: 0 auto; }

//   /* Header + ختم السجل */
//   .labs-header {
//     position: relative;
//     margin-bottom: 2.75rem;
//     padding-bottom: 1.75rem;
//     border-bottom: 1px solid var(--line);
//   }
//   .labs-eyebrow {
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.7rem;
//     color: var(--brass);
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     margin-bottom: 0.85rem;
//     display: flex;
//     align-items: center;
//     gap: 0.6rem;
//   }
//   .labs-eyebrow::before { content: ''; width: 2rem; height: 1px; background: var(--brass); }
//   .labs-title {
//     font-family: 'Markazi Text', serif;
//     font-size: 2.7rem;
//     font-weight: 700;
//     color: var(--parchment);
//     line-height: 1.15;
//     margin: 0 0 0.5rem;
//   }
//   .labs-subtitle { font-size: 0.92rem; color: var(--parchment-dim); margin: 0; font-weight: 300; max-width: 34rem; }

//   .labs-stamp {
//     position: absolute;
//     top: -0.4rem;
//     left: 0;
//     width: 5.4rem;
//     height: 5.4rem;
//     border: 1.5px dashed var(--stamp);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transform: rotate(-9deg);
//     opacity: 0.55;
//     pointer-events: none;
//   }
//   .labs-stamp-inner {
//     width: 4.3rem; height: 4.3rem;
//     border: 1px solid var(--stamp);
//     border-radius: 50%;
//     display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.15rem;
//   }
//   .labs-stamp-code { font-family: 'IBM Plex Mono', monospace; font-size: 0.55rem; letter-spacing: 0.1em; color: var(--stamp); }
//   .labs-stamp-label { font-family: 'IBM Plex Mono', monospace; font-size: 0.46rem; letter-spacing: 0.06em; color: var(--stamp); text-align: center; line-height: 1.3; }

//   /* أزرار التبويب (بشكل درج فهرسة) */
//   .tab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; margin-bottom: 2.25rem; }

//   .tab-btn {
//     position: relative;
//     padding: 1.4rem 1.5rem 1.25rem;
//     border-radius: 0.65rem 0.65rem 0.35rem 0.35rem;
//     border: 1px solid var(--line);
//     border-top: 3px solid transparent;
//     background: var(--ink-900);
//     cursor: pointer;
//     text-align: right;
//     transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
//   }
//   .tab-btn.type-lab { --accent: var(--brass); --accent-dim: var(--brass-dim); }
//   .tab-btn.type-journal { --accent: var(--teal); --accent-dim: var(--teal-dim); }
//   .tab-btn:hover { transform: translateY(-3px); border-color: var(--line-strong); }
//   .tab-btn.active {
//     border-top-color: var(--accent);
//     background: var(--accent-dim);
//     box-shadow: 0 14px 30px -20px rgba(0,0,0,0.7);
//   }
//   .tab-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

//   .tab-btn-icon { font-size: 1.7rem; margin-bottom: 0.65rem; display: block; }
//   .tab-btn-label { font-family: 'Markazi Text', serif; font-size: 1.2rem; font-weight: 700; color: var(--parchment); display: block; margin-bottom: 0.2rem; }
//   .tab-btn-desc { font-size: 0.74rem; color: var(--parchment-dim); font-weight: 300; }

//   .tab-count {
//     position: absolute; top: 1rem; left: 1rem;
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.65rem; font-weight: 600;
//     padding: 0.2rem 0.55rem; border-radius: 2rem;
//     background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-dim);
//   }

//   /* حالات التحميل / الفراغ / البداية */
//   .loading-state {
//     text-align: center; padding: 5rem 0;
//     color: var(--parchment-faint); font-size: 0.85rem;
//     display: flex; flex-direction: column; align-items: center; gap: 1rem;
//   }
//   .loader {
//     width: 2rem; height: 2rem;
//     border: 2px solid var(--line);
//     border-top-color: var(--brass);
//     border-radius: 50%;
//     animation: spin 0.8s linear infinite;
//   }
//   .loading-state.type-journal .loader { border-top-color: var(--teal); }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .empty-state {
//     text-align: center; padding: 4.5rem 2rem;
//     background: rgba(255,255,255,0.015);
//     border: 1px dashed var(--line-strong);
//     border-radius: 0.9rem;
//     color: var(--parchment-faint);
//     font-size: 0.85rem;
//   }
//   .empty-state-icon { font-size: 2.3rem; margin-bottom: 1rem; opacity: 0.45; }

//   .initial-state { text-align: center; padding: 5rem 0; color: var(--parchment-faint); font-size: 0.9rem; }

//   /* قائمة البطاقات */
//   .cards-list { display: flex; flex-direction: column; gap: 0.7rem; }

//   .entity-card {
//     border-radius: 0.65rem;
//     border: 1px solid var(--line);
//     border-inline-start: 3px solid transparent;
//     background: var(--ink-900);
//     overflow: hidden;
//     transition: border-color 0.18s ease;
//   }
//   .entity-card.type-lab { --accent: var(--brass); --accent-dim: var(--brass-dim); }
//   .entity-card.type-journal { --accent: var(--teal); --accent-dim: var(--teal-dim); }
//   .entity-card:hover { border-color: var(--line-strong); }
//   .entity-card.expanded { border-color: var(--line-strong); border-inline-start-color: var(--accent); }

//   .card-header {
//     all: unset;
//     box-sizing: border-box;
//     display: flex; align-items: center; justify-content: space-between;
//     width: 100%; padding: 1.05rem 1.3rem;
//     cursor: pointer;
//     transition: background 0.15s ease;
//   }
//   .card-header:hover { background: rgba(255,255,255,0.02); }
//   .card-header:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }

//   .card-title-area { display: flex; align-items: center; gap: 0.8rem; min-width: 0; }
//   .card-icon {
//     width: 2.3rem; height: 2.3rem;
//     border-radius: 0.5rem;
//     background: var(--accent-dim);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 1.05rem;
//     flex-shrink: 0;
//   }
//   .card-id {
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.68rem; font-weight: 600;
//     color: var(--accent); flex-shrink: 0; letter-spacing: 0.03em;
//   }
//   .card-name {
//     font-family: 'Markazi Text', serif;
//     font-size: 1.18rem; font-weight: 700;
//     color: var(--parchment);
//     white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//   }

//   .card-meta { display: flex; align-items: center; gap: 0.55rem; flex-shrink: 0; }
//   .meta-pill {
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.63rem; font-weight: 600;
//     padding: 0.2rem 0.55rem; border-radius: 0.3rem;
//     white-space: nowrap;
//     background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-dim);
//   }
//   .meta-pill.pill-muted { background: rgba(163,154,134,0.08); color: var(--parchment-dim); border-color: rgba(163,154,134,0.16); }

//   .chevron {
//     width: 1.4rem; height: 1.4rem;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.04);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 0.55rem;
//     color: var(--parchment-dim);
//     transition: transform 0.2s ease, background 0.2s ease;
//     flex-shrink: 0;
//   }
//   .chevron.open { transform: rotate(180deg); background: var(--accent-dim); color: var(--accent); }

//   /* تفاصيل موسّعة */
//   .card-details {
//     border-top: 1px solid var(--line);
//     padding: 1.3rem;
//     background: rgba(0,0,0,0.15);
//     animation: reveal 0.18s ease;
//   }
//   @keyframes reveal { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

//   .detail-section { margin-bottom: 1.2rem; }
//   .detail-section:last-child { margin-bottom: 0; }

//   .card-empty-note {
//     margin: 0; padding: 0.5rem 0.1rem;
//     font-size: 0.82rem; color: var(--parchment-faint); font-style: italic;
//   }

//   .record-meta {
//     margin-top: 1.2rem;
//     padding-top: 0.9rem;
//     border-top: 1px dashed var(--line);
//     display: flex; flex-wrap: wrap; gap: 0.4rem 1.2rem;
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.66rem;
//     color: var(--parchment-faint);
//     letter-spacing: 0.02em;
//   }

//   .detail-fields-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//     gap: 1.1rem;
//   }
//   .detail-field { min-width: 0; }

//   .detail-label {
//     font-family: 'IBM Plex Mono', monospace;
//     font-size: 0.66rem; font-weight: 600;
//     color: var(--parchment-faint);
//     text-transform: uppercase; letter-spacing: 0.09em;
//     margin-bottom: 0.55rem;
//     display: flex; align-items: center; gap: 0.4rem;
//   }

//   .detail-text {
//     font-size: 0.85rem; color: var(--parchment-dim);
//     background: rgba(255,255,255,0.02);
//     border: 1px solid var(--line);
//     border-radius: 0.5rem;
//     padding: 0.75rem 1rem;
//     line-height: 1.75;
//   }

//   .field-items-list { display: flex; flex-direction: column; gap: 0.4rem; }
//   .field-item {
//     font-size: 0.8rem; color: var(--parchment-dim);
//     background: rgba(255,255,255,0.02);
//     border: 1px solid var(--line);
//     border-radius: 0.45rem;
//     padding: 0.5rem 0.75rem;
//     line-height: 1.55;
//   }
//   .field-item a {
//     color: var(--accent);
//     text-decoration: none;
//     font-size: 0.72rem;
//     display: inline-flex; align-items: center; gap: 0.3rem;
//     margin-top: 0.3rem;
//   }
//   .field-item a:hover { text-decoration: underline; }

//   .divider { height: 1px; background: var(--line); margin: 1.2rem 0; }

//   @media (max-width: 640px) {
//     .labs-stamp { display: none; }
//     .labs-title { font-size: 1.7rem; }
//     .card-meta .meta-pill:nth-child(n+2) { display: none; }
//   }

//   @media (prefers-reduced-motion: reduce) {
//     .labs-root * { animation: none !important; transition: none !important; }
//   }
// `;

// // ── وحدات فرعية ──

// // عنصر يُعتبر "فيه بيانات فعلية" فقط إذا كان له نص أو ملف — وليس مجرد إدخال فارغ
// // (مثلاً { text: null, file: null }) كان يظهر كصندوق فاضي رغم أن العدّاد يحسبه.
// const hasFieldContent = (item) =>
//   Boolean(item?.text?.trim() || item?.file?.trim());
// const hasTextContent = (item) =>
//   Boolean(typeof item === "string" && item.trim());

// const FieldItems = ({ items }) => (
//   <div className="field-items-list">
//     {items.filter(hasFieldContent).map((item, idx) => (
//       <div key={idx} className="field-item">
//         {item.text?.trim() && <p>{item.text}</p>}
//         {item.file?.trim() && (
//           <a href={item.file} target="_blank" rel="noreferrer">
//             <span>📎</span> عرض الملف
//           </a>
//         )}
//       </div>
//     ))}
//   </div>
// );

// const TextItems = ({ items }) => (
//   <div className="field-items-list">
//     {items.filter(hasTextContent).map((item, idx) => (
//       <div key={idx} className="field-item">
//         {item}
//       </div>
//     ))}
//   </div>
// );

// // حقل تفصيلي: لا يُعرض إطلاقاً (لا عنوان ولا محتوى) إن لم تتوفر بيانات فعلية —
// // حتى لو كانت المصفوفة تحتوي عناصر لكنها كلها فارغة (بدون نص وبدون ملف).
// const DetailField = ({ icon, label, items, rich = true }) => {
//   const count = (items || []).filter(
//     rich ? hasFieldContent : hasTextContent,
//   ).length;
//   if (count === 0) return null;
//   return (
//     <div className="detail-field">
//       <div className="detail-label">
//         <span>{icon}</span>
//         {label}
//       </div>
//       {rich ? <FieldItems items={items} /> : <TextItems items={items} />}
//     </div>
//   );
// };

// // كتلة نصية (مثل التعريف أو الأعداد): نفس المنطق، تختفي كلياً إن كانت فارغة أو مسافات فقط.
// const TextBlock = ({ icon, label, text }) => {
//   if (!text || !text.trim()) return null;
//   return (
//     <div className="detail-field">
//       <div className="detail-label">
//         <span>{icon}</span>
//         {label}
//       </div>
//       <div className="detail-text">{text}</div>
//     </div>
//   );
// };

// // تنسيق تواريخ mongoose (createdAt / updatedAt) بصيغة عربية مقروءة
// const formatDate = (value) => {
//   if (!value) return null;
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return null;
//   return new Intl.DateTimeFormat("ar", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(date);
// };

// // ── بطاقة مخبر ──
// const LabCard = ({ lab, index, expanded, onToggle }) => {
//   const fields = [
//     {
//       icon: "📋",
//       label: "البطاقة التقنية",
//       items: lab.battaka_taqniya,
//       rich: true,
//     },
//     { icon: "📊", label: "الحصيلة", items: lab.hassila, rich: true },
//     { icon: "⚡", label: "النشاطات", items: lab.nashatat, rich: true },
//   ];
//   const groupFields = [
//     { icon: "🧩", label: "المكونات", items: lab.mokawinat, rich: false },
//     { icon: "👥", label: "الفرق", items: lab.firaq, rich: false },
//   ];

//   const battakaCount = (lab.battaka_taqniya || []).filter(
//     hasFieldContent,
//   ).length;
//   const hassilaCount = (lab.hassila || []).filter(hasFieldContent).length;
//   const nashatatCount = (lab.nashatat || []).filter(hasFieldContent).length;
//   const mokawinatCount = (lab.mokawinat || []).filter(hasTextContent).length;
//   const firaqCount = (lab.firaq || []).filter(hasTextContent).length;

//   const hasFields = battakaCount > 0 || hassilaCount > 0 || nashatatCount > 0;
//   const hasGroups = mokawinatCount > 0 || firaqCount > 0;
//   const hasAnyDetail = Boolean(lab.taareef?.trim()) || hasFields || hasGroups;
//   const catalogId = `L-${String(index + 1).padStart(2, "0")}`;
//   const panelId = `lab-panel-${lab._id}`;

//   const createdLabel = formatDate(lab.createdAt);
//   const updatedLabel = formatDate(lab.updatedAt);
//   const showUpdated = updatedLabel && updatedLabel !== createdLabel;

//   return (
//     <div className={`entity-card type-lab ${expanded ? "expanded" : ""}`}>
//       <button
//         type="button"
//         className="card-header"
//         onClick={onToggle}
//         aria-expanded={expanded}
//         aria-controls={panelId}
//       >
//         <div className="card-title-area">
//           <div className="card-icon">🔬</div>
//           <span className="card-id">{catalogId}</span>
//           <span className="card-name">{lab.name}</span>
//         </div>
//         <div className="card-meta">
//           {battakaCount > 0 && (
//             <span className="meta-pill">{battakaCount} بطاقة</span>
//           )}
//           {hassilaCount > 0 && (
//             <span className="meta-pill">{hassilaCount} حصيلة</span>
//           )}
//           {nashatatCount > 0 && (
//             <span className="meta-pill">{nashatatCount} نشاط</span>
//           )}
//           <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
//         </div>
//       </button>

//       {expanded && (
//         <div className="card-details" id={panelId}>
//           {hasAnyDetail ? (
//             <>
//               <TextBlock icon="📝" label="التعريف" text={lab.taareef} />

//               {hasFields && (
//                 <div className="detail-fields-grid detail-section">
//                   {fields.map((f) => (
//                     <DetailField key={f.label} {...f} />
//                   ))}
//                 </div>
//               )}

//               {hasGroups && (
//                 <>
//                   <div className="divider" />
//                   <div className="detail-fields-grid">
//                     {groupFields.map((f) => (
//                       <DetailField key={f.label} {...f} />
//                     ))}
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             <p className="card-empty-note">
//               لا تتوفر تفاصيل إضافية لهذا المخبر حالياً.
//             </p>
//           )}

//           {(createdLabel || showUpdated) && (
//             <div className="record-meta">
//               {createdLabel && <span>📅 أُضيف في {createdLabel}</span>}
//               {showUpdated && <span>🔄 آخر تحديث {updatedLabel}</span>}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── بطاقة مجلة ──
// const JournalCard = ({ journal, index, expanded, onToggle }) => {
//   const battakaCount = (journal.battaka_taqniya || []).filter(
//     hasFieldContent,
//   ).length;
//   const hasAadat = Boolean(journal.aadat?.trim());
//   const hasAnyDetail = battakaCount > 0 || hasAadat;
//   const catalogId = `J-${String(index + 1).padStart(2, "0")}`;
//   const panelId = `journal-panel-${journal._id}`;

//   return (
//     <div className={`entity-card type-journal ${expanded ? "expanded" : ""}`}>
//       <button
//         type="button"
//         className="card-header"
//         onClick={onToggle}
//         aria-expanded={expanded}
//         aria-controls={panelId}
//       >
//         <div className="card-title-area">
//           <div className="card-icon">📰</div>
//           <span className="card-id">{catalogId}</span>
//           <span className="card-name">{journal.name}</span>
//         </div>
//         <div className="card-meta">
//           {battakaCount > 0 && (
//             <span className="meta-pill">{battakaCount} بطاقة</span>
//           )}
//           {hasAadat && (
//             <span className="meta-pill pill-muted">أعداد متاحة</span>
//           )}
//           <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
//         </div>
//       </button>

//       {expanded && (
//         <div className="card-details" id={panelId}>
//           {hasAnyDetail ? (
//             <div className="detail-fields-grid">
//               <DetailField
//                 icon="📋"
//                 label="البطاقة التقنية"
//                 items={journal.battaka_taqniya}
//                 rich
//               />
//               <TextBlock icon="📰" label="الأعداد" text={journal.aadat} />
//             </div>
//           ) : (
//             <p className="card-empty-note">
//               لا تتوفر تفاصيل إضافية لهذه المجلة حالياً.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── المكوّن الرئيسي ──
// export default function LabsAndJrns() {
//   const [activeTab, setActiveTab] = useState(null);
//   const [labs, setLabs] = useState([]);
//   const [journals, setJournals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedId, setExpandedId] = useState(null);

//   const fetchLabs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/laboratories`);
//       setLabs(res.data.makhaber || []);
//     } catch {
//       setLabs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchJournals = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/journals`);
//       setJournals(res.data.majallat || []);
//     } catch {
//       setJournals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "labs") fetchLabs();
//     if (activeTab === "journals") fetchJournals();
//     setExpandedId(null);
//   }, [activeTab]);

//   const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="labs-root">
//         <div className="labs-container">
//           {/* الترويسة */}
//           <header className="labs-header">
//             <div className="labs-stamp">
//               <div className="labs-stamp-inner">
//                 <span className="labs-stamp-code">REG</span>
//                 <span className="labs-stamp-label">
//                   سجل
//                   <br />
//                   علمي
//                 </span>
//               </div>
//             </div>
//             <div className="labs-eyebrow">منظومة البحث العلمي</div>
//             <h1 className="labs-title">المخابر والمجلات العلمية</h1>
//             <p className="labs-subtitle">
//               استعراض تفاصيل المخابر البحثية والمجلات العلمية
//             </p>
//           </header>

//           {/* التبويبات */}
//           <div className="tab-grid">
//             <button
//               type="button"
//               className={`tab-btn type-lab ${activeTab === "labs" ? "active" : ""}`}
//               onClick={() => setActiveTab("labs")}
//               aria-pressed={activeTab === "labs"}
//             >
//               {activeTab === "labs" && labs.length > 0 && (
//                 <span className="tab-count">{labs.length}</span>
//               )}
//               <span className="tab-btn-icon">🔬</span>
//               <span className="tab-btn-label">مخابر البحث</span>
//               <span className="tab-btn-desc">المخابر العلمية والبحثية</span>
//             </button>

//             <button
//               type="button"
//               className={`tab-btn type-journal ${activeTab === "journals" ? "active" : ""}`}
//               onClick={() => setActiveTab("journals")}
//               aria-pressed={activeTab === "journals"}
//             >
//               {activeTab === "journals" && journals.length > 0 && (
//                 <span className="tab-count">{journals.length}</span>
//               )}
//               <span className="tab-btn-icon">📰</span>
//               <span className="tab-btn-label">المجلات العلمية</span>
//               <span className="tab-btn-desc">المجلات والدوريات البحثية</span>
//             </button>
//           </div>

//           {/* المحتوى */}
//           {loading && (
//             <div
//               className={`loading-state ${activeTab === "journals" ? "type-journal" : "type-lab"}`}
//             >
//               <div className="loader" />
//               <span>جارٍ تحميل البيانات...</span>
//             </div>
//           )}

//           {!loading &&
//             activeTab === "labs" &&
//             (labs.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">🔬</div>لا توجد مخابر مضافة
//                 بعد
//               </div>
//             ) : (
//               <div className="cards-list">
//                 {labs.map((lab, i) => (
//                   <LabCard
//                     key={lab._id}
//                     lab={lab}
//                     index={i}
//                     expanded={expandedId === lab._id}
//                     onToggle={() => toggle(lab._id)}
//                   />
//                 ))}
//               </div>
//             ))}

//           {!loading &&
//             activeTab === "journals" &&
//             (journals.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">📰</div>لا توجد مجلات مضافة
//                 بعد
//               </div>
//             ) : (
//               <div className="cards-list">
//                 {journals.map((j, i) => (
//                   <JournalCard
//                     key={j._id}
//                     journal={j}
//                     index={i}
//                     expanded={expandedId === j._id}
//                     onToggle={() => toggle(j._id)}
//                   />
//                 ))}
//               </div>
//             ))}

//           {!activeTab && (
//             <div className="initial-state">اختر قسماً لعرض البيانات</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// 55555555555

import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ── DESIGN SYSTEM ──
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;600;700&family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  .labs-root * { box-sizing: border-box; }

  .labs-root {
    --ink-950: #0c1016;
    --ink-900: #121820;
    --ink-850: #1a2230;
    --ink-800: #222d3d;
    --line: rgba(200,210,230,0.06);
    --line-strong: rgba(200,210,230,0.14);
    --line-focus: rgba(200,210,230,0.22);
    --parchment: #dce4f0;
    --parchment-dim: #8a95a8;
    --parchment-faint: #5a6475;
    --brass: #c4a35a;
    --brass-glow: rgba(196,163,90,0.18);
    --brass-dim: rgba(196,163,90,0.10);
    --teal: #5db5aa;
    --teal-glow: rgba(93,181,170,0.18);
    --teal-dim: rgba(93,181,170,0.10);
    --stamp: #c45d4a;

    font-family: 'Tajawal', sans-serif;
    min-height: 100vh;
    background: var(--ink-950);
    background-image:
      radial-gradient(ellipse 80% 60% at 10% -5%, rgba(196,163,90,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 70% 50% at 90% 110%, rgba(93,181,170,0.05) 0%, transparent 55%);
    color: var(--parchment);
    padding: 3rem 1.25rem 5rem;
    direction: rtl;
  }

  .labs-container { max-width: 960px; margin: 0 auto; }

  /* ── Header ── */
  .labs-header {
    position: relative;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--line);
  }
  .labs-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    color: var(--brass);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .labs-eyebrow::before { content: ''; width: 2.2rem; height: 1px; background: var(--brass); opacity: 0.6; }
  .labs-title {
    font-family: 'Markazi Text', serif;
    font-size: 2.9rem;
    font-weight: 700;
    color: var(--parchment);
    line-height: 1.1;
    margin: 0 0 0.6rem;
    letter-spacing: -0.01em;
  }
  .labs-subtitle { font-size: 0.95rem; color: var(--parchment-dim); margin: 0; font-weight: 300; max-width: 36rem; line-height: 1.7; }

  .labs-stamp {
    position: absolute;
    top: -0.6rem;
    left: 0;
    width: 5.6rem;
    height: 5.6rem;
    border: 1.5px dashed var(--stamp);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-12deg);
    opacity: 0.45;
    pointer-events: none;
  }
  .labs-stamp-inner {
    width: 4.5rem; height: 4.5rem;
    border: 1px solid var(--stamp);
    border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.15rem;
  }
  .labs-stamp-code { font-family: 'IBM Plex Mono', monospace; font-size: 0.55rem; letter-spacing: 0.12em; color: var(--stamp); }
  .labs-stamp-label { font-family: 'IBM Plex Mono', monospace; font-size: 0.46rem; letter-spacing: 0.06em; color: var(--stamp); text-align: center; line-height: 1.3; }

  /* ── Tabs ── */
  .tab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2.5rem; }

  .tab-btn {
    position: relative;
    padding: 1.5rem 1.6rem 1.3rem;
    border-radius: 0.75rem;
    border: 1px solid var(--line);
    background: var(--ink-900);
    cursor: pointer;
    text-align: right;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  .tab-btn.type-lab { --accent: var(--brass); --accent-dim: var(--brass-dim); --accent-glow: var(--brass-glow); }
  .tab-btn.type-journal { --accent: var(--teal); --accent-dim: var(--teal-dim); --accent-glow: var(--teal-glow); }

  .tab-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 100% at 50% 0%, var(--accent-glow), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .tab-btn:hover {
    transform: translateY(-2px);
    border-color: var(--line-strong);
    box-shadow: 0 8px 32px -12px rgba(0,0,0,0.5);
  }
  .tab-btn:hover::before { opacity: 1; }
  .tab-btn.active {
    border-color: var(--accent);
    background: var(--accent-dim);
    box-shadow: 0 0 0 1px var(--accent-glow), 0 20px 40px -16px rgba(0,0,0,0.6);
  }
  .tab-btn.active::before { opacity: 1; }
  .tab-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

  .tab-btn-icon { font-size: 1.8rem; margin-bottom: 0.7rem; display: block; position: relative; z-index: 1; }
  .tab-btn-label { font-family: 'Markazi Text', serif; font-size: 1.25rem; font-weight: 700; color: var(--parchment); display: block; margin-bottom: 0.25rem; position: relative; z-index: 1; }
  .tab-btn-desc { font-size: 0.75rem; color: var(--parchment-dim); font-weight: 300; position: relative; z-index: 1; }

  .tab-count {
    position: absolute; top: 1.1rem; left: 1.1rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem; font-weight: 600;
    padding: 0.25rem 0.6rem; border-radius: 2rem;
    background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-glow);
    z-index: 1;
  }

  /* ── Toolbar ── */
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 0 0.2rem;
  }
  .toolbar-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
    color: var(--parchment-faint);
    letter-spacing: 0.02em;
  }
  .toolbar-count strong { color: var(--parchment-dim); font-weight: 600; }
  .search-box {
    position: relative;
    flex: 1;
    max-width: 320px;
  }
  .search-box input {
    width: 100%;
    background: var(--ink-900);
    border: 1px solid var(--line);
    border-radius: 0.6rem;
    padding: 0.6rem 2.4rem 0.6rem 0.9rem;
    font-family: 'Tajawal', sans-serif;
    font-size: 0.85rem;
    color: var(--parchment);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .search-box input::placeholder { color: var(--parchment-faint); }
  .search-box input:focus {
    border-color: var(--line-focus);
    box-shadow: 0 0 0 3px rgba(200,210,230,0.04);
  }
  .search-icon {
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.85rem;
    opacity: 0.4;
    pointer-events: none;
  }

  /* ── States ── */
  .loading-state {
    text-align: center; padding: 5rem 0;
    color: var(--parchment-faint); font-size: 0.85rem;
    display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
  }
  .loader {
    width: 2.2rem; height: 2.2rem;
    border: 2.5px solid var(--line);
    border-top-color: var(--brass);
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }
  .loading-state.type-journal .loader { border-top-color: var(--teal); }
  @keyframes spin { to { transform: rotate(360deg); } }

  .empty-state {
    text-align: center; padding: 5rem 2rem;
    background: rgba(255,255,255,0.012);
    border: 1px dashed var(--line-strong);
    border-radius: 1rem;
    color: var(--parchment-faint);
    font-size: 0.88rem;
  }
  .empty-state-icon { font-size: 2.5rem; margin-bottom: 1.2rem; opacity: 0.4; }

  .initial-state {
    text-align: center; padding: 6rem 0;
    color: var(--parchment-faint);
    font-size: 0.95rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .initial-state-icon { font-size: 3rem; opacity: 0.25; }

  /* ── Cards ── */
  .cards-list { display: flex; flex-direction: column; gap: 0.8rem; }

  .entity-card {
    border-radius: 0.75rem;
    border: 1px solid var(--line);
    background: var(--ink-900);
    overflow: hidden;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }
  .entity-card.type-lab { --accent: var(--brass); --accent-dim: var(--brass-dim); --accent-glow: var(--brass-glow); }
  .entity-card.type-journal { --accent: var(--teal); --accent-dim: var(--teal-dim); --accent-glow: var(--teal-glow); }

  .entity-card::after {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.25s ease;
    border-radius: 0.75rem 0 0 0.75rem;
  }
  .entity-card:hover {
    border-color: var(--line-strong);
    transform: translateY(-1px);
    box-shadow: 0 12px 40px -16px rgba(0,0,0,0.4);
  }
  .entity-card.expanded {
    border-color: var(--line-focus);
    box-shadow: 0 16px 48px -20px rgba(0,0,0,0.5);
  }
  .entity-card.expanded::after { opacity: 1; }

  .card-header {
    all: unset;
    box-sizing: border-box;
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 1.1rem 1.4rem;
    cursor: pointer;
    transition: background 0.15s ease;
    position: relative;
    z-index: 1;
  }
  .card-header:hover { background: rgba(255,255,255,0.02); }
  .card-header:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }

  .card-title-area { display: flex; align-items: center; gap: 0.9rem; min-width: 0; }
  .card-icon {
    width: 2.5rem; height: 2.5rem;
    border-radius: 0.6rem;
    background: var(--accent-dim);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
    transition: transform 0.2s ease, background 0.2s ease;
    border: 1px solid var(--accent-glow);
  }
  .entity-card:hover .card-icon {
    transform: scale(1.05);
    background: var(--accent-glow);
  }
  .card-id {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem; font-weight: 600;
    color: var(--accent); flex-shrink: 0; letter-spacing: 0.04em;
    opacity: 0.8;
  }
  .card-name {
    font-family: 'Markazi Text', serif;
    font-size: 1.22rem; font-weight: 700;
    color: var(--parchment);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    transition: color 0.2s ease;
  }
  .entity-card:hover .card-name { color: #eef2f8; }

  .card-meta { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
  .meta-pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.64rem; font-weight: 600;
    padding: 0.22rem 0.55rem; border-radius: 0.35rem;
    white-space: nowrap;
    background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-glow);
  }
  .meta-pill.pill-muted { background: rgba(138,149,168,0.06); color: var(--parchment-dim); border-color: rgba(138,149,168,0.12); }

  .chevron {
    width: 1.5rem; height: 1.5rem;
    border-radius: 50%;
    background: rgba(255,255,255,0.03);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem;
    color: var(--parchment-dim);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease, color 0.2s ease;
    flex-shrink: 0;
    margin-right: 0.3rem;
  }
  .chevron.open {
    transform: rotate(180deg);
    background: var(--accent-glow);
    color: var(--accent);
  }

  /* ── Details ── */
  .card-details {
    border-top: 1px solid var(--line);
    padding: 1.5rem;
    background: rgba(0,0,0,0.12);
    animation: reveal 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes reveal { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

  .detail-section { margin-bottom: 1.4rem; }
  .detail-section:last-child { margin-bottom: 0; }

  .card-empty-note {
    margin: 0; padding: 0.6rem 0.2rem;
    font-size: 0.85rem; color: var(--parchment-faint); font-style: italic;
    text-align: center;
  }

  .record-meta {
    margin-top: 1.4rem;
    padding-top: 1rem;
    border-top: 1px dashed var(--line);
    display: flex; flex-wrap: wrap; gap: 0.5rem 1.4rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.66rem;
    color: var(--parchment-faint);
    letter-spacing: 0.02em;
  }

  .detail-fields-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }
  .detail-field { min-width: 0; }

  .detail-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.66rem; font-weight: 600;
    color: var(--parchment-faint);
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 0.6rem;
    display: flex; align-items: center; gap: 0.45rem;
  }

  .detail-text {
    font-size: 0.87rem; color: var(--parchment-dim);
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--line);
    border-radius: 0.55rem;
    padding: 0.85rem 1.1rem;
    line-height: 1.8;
    transition: border-color 0.2s ease;
  }
  .detail-text:hover { border-color: var(--line-strong); }

  .field-items-list { display: flex; flex-direction: column; gap: 0.45rem; }
  .field-item {
    font-size: 0.82rem; color: var(--parchment-dim);
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    padding: 0.6rem 0.85rem;
    line-height: 1.6;
    transition: all 0.2s ease;
  }
  .field-item:hover {
    border-color: var(--line-strong);
    background: rgba(255,255,255,0.03);
    transform: translateX(-2px);
  }
  .field-item a {
    color: var(--accent);
    text-decoration: none;
    font-size: 0.74rem;
    display: inline-flex; align-items: center; gap: 0.35rem;
    margin-top: 0.35rem;
    transition: color 0.2s ease;
  }
  .field-item a:hover { text-decoration: underline; color: var(--parchment); }

  .divider { height: 1px; background: var(--line); margin: 1.3rem 0; }

  @media (max-width: 640px) {
    .labs-stamp { display: none; }
    .labs-title { font-size: 1.9rem; }
    .tab-grid { gap: 0.6rem; }
    .tab-btn { padding: 1.1rem 1rem 0.9rem; }
    .tab-btn-label { font-size: 1.05rem; }
    .card-meta .meta-pill:nth-child(n+2) { display: none; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .search-box { max-width: none; }
    .detail-fields-grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .labs-root * { animation: none !important; transition: none !important; }
  }
`;

// ── UTILITIES ──
const hasFieldContent = (item) =>
  Boolean(item?.text?.trim() || item?.file?.trim());
const hasTextContent = (item) =>
  Boolean(typeof item === "string" && item.trim());

const FieldItems = ({ items }) => (
  <div className="field-items-list">
    {items.filter(hasFieldContent).map((item, idx) => (
      <div key={idx} className="field-item">
        {item.text?.trim() && <p>{item.text}</p>}
        {item.file?.trim() && (
          <a href={item.file} target="_blank" rel="noreferrer">
            <span>📎</span> عرض الملف
          </a>
        )}
      </div>
    ))}
  </div>
);

const TextItems = ({ items }) => (
  <div className="field-items-list">
    {items.filter(hasTextContent).map((item, idx) => (
      <div key={idx} className="field-item">
        {item}
      </div>
    ))}
  </div>
);

const DetailField = ({ icon, label, items, rich = true }) => {
  const count = (items || []).filter(
    rich ? hasFieldContent : hasTextContent,
  ).length;
  if (count === 0) return null;
  return (
    <div className="detail-field">
      <div className="detail-label">
        <span>{icon}</span>
        {label}
      </div>
      {rich ? <FieldItems items={items} /> : <TextItems items={items} />}
    </div>
  );
};

const TextBlock = ({ icon, label, text }) => {
  if (!text || !text.trim()) return null;
  return (
    <div className="detail-field">
      <div className="detail-label">
        <span>{icon}</span>
        {label}
      </div>
      <div className="detail-text">{text}</div>
    </div>
  );
};

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// ── SUB-COMPONENTS ──
const LabCard = ({ lab, index, expanded, onToggle }) => {
  const fields = [
    {
      icon: "📋",
      label: "البطاقة التقنية",
      items: lab.battaka_taqniya,
      rich: true,
    },
    { icon: "📊", label: "الحصيلة", items: lab.hassila, rich: true },
    { icon: "⚡", label: "النشاطات", items: lab.nashatat, rich: true },
  ];
  const groupFields = [
    { icon: "🧩", label: "المكونات", items: lab.mokawinat, rich: false },
    { icon: "👥", label: "الفرق", items: lab.firaq, rich: false },
  ];

  const battakaCount = (lab.battaka_taqniya || []).filter(
    hasFieldContent,
  ).length;
  const hassilaCount = (lab.hassila || []).filter(hasFieldContent).length;
  const nashatatCount = (lab.nashatat || []).filter(hasFieldContent).length;
  const mokawinatCount = (lab.mokawinat || []).filter(hasTextContent).length;
  const firaqCount = (lab.firaq || []).filter(hasTextContent).length;

  const hasFields = battakaCount > 0 || hassilaCount > 0 || nashatatCount > 0;
  const hasGroups = mokawinatCount > 0 || firaqCount > 0;
  const hasAnyDetail = Boolean(lab.taareef?.trim()) || hasFields || hasGroups;
  const catalogId = `L-${String(index + 1).padStart(2, "0")}`;
  const panelId = `lab-panel-${lab._id}`;

  const createdLabel = formatDate(lab.createdAt);
  const updatedLabel = formatDate(lab.updatedAt);
  const showUpdated = updatedLabel && updatedLabel !== createdLabel;

  return (
    <div className={`entity-card type-lab ${expanded ? "expanded" : ""}`}>
      <button
        type="button"
        className="card-header"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="card-title-area">
          <div className="card-icon">🏢</div>
          <span className="card-id">{catalogId}</span>
          <span className="card-name">{lab.name}</span>
        </div>
        <div className="card-meta">
          {battakaCount > 0 && (
            <span className="meta-pill">{battakaCount} بطاقة</span>
          )}
          {hassilaCount > 0 && (
            <span className="meta-pill">{hassilaCount} حصيلة</span>
          )}
          {nashatatCount > 0 && (
            <span className="meta-pill">{nashatatCount} نشاط</span>
          )}
          <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
        </div>
      </button>

      {expanded && (
        <div className="card-details" id={panelId}>
          {hasAnyDetail ? (
            <>
              <TextBlock icon="📝" label="التعريف" text={lab.taareef} />
              {hasFields && (
                <div className="detail-fields-grid detail-section">
                  {fields.map((f) => (
                    <DetailField key={f.label} {...f} />
                  ))}
                </div>
              )}
              {hasGroups && (
                <>
                  <div className="divider" />
                  <div className="detail-fields-grid">
                    {groupFields.map((f) => (
                      <DetailField key={f.label} {...f} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="card-empty-note">
              لا تتوفر تفاصيل إضافية لهذا المخبر حالياً.
            </p>
          )}

          {(createdLabel || showUpdated) && (
            <div className="record-meta">
              {createdLabel && <span>📅 أُضيف في {createdLabel}</span>}
              {showUpdated && <span>🔄 آخر تحديث {updatedLabel}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const JournalCard = ({ journal, index, expanded, onToggle }) => {
  const battakaCount = (journal.battaka_taqniya || []).filter(
    hasFieldContent,
  ).length;
  const hasAadat = Boolean(journal.aadat?.trim());
  const hasAnyDetail = battakaCount > 0 || hasAadat;
  const catalogId = `J-${String(index + 1).padStart(2, "0")}`;
  const panelId = `journal-panel-${journal._id}`;

  return (
    <div className={`entity-card type-journal ${expanded ? "expanded" : ""}`}>
      <button
        type="button"
        className="card-header"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="card-title-area">
          <div className="card-icon">📰</div>
          <span className="card-id">{catalogId}</span>
          <span className="card-name">{journal.name}</span>
        </div>
        <div className="card-meta">
          {battakaCount > 0 && (
            <span className="meta-pill">{battakaCount} بطاقة</span>
          )}
          {hasAadat && (
            <span className="meta-pill pill-muted">أعداد متاحة</span>
          )}
          <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
        </div>
      </button>

      {expanded && (
        <div className="card-details" id={panelId}>
          {hasAnyDetail ? (
            <div className="detail-fields-grid">
              <DetailField
                icon="📋"
                label="البطاقة التقنية"
                items={journal.battaka_taqniya}
                rich
              />
              <TextBlock icon="📰" label="الأعداد" text={journal.aadat} />
            </div>
          ) : (
            <p className="card-empty-note">
              لا تتوفر تفاصيل إضافية لهذه المجلة حالياً.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// ── MAIN COMPONENT ──
export default function LabsAndJrns() {
  const [activeTab, setActiveTab] = useState(null);
  const [labs, setLabs] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchLabs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/laboratories`);
      setLabs(res.data.makhaber || []);
    } catch {
      setLabs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/journals`);
      setJournals(res.data.majallat || []);
    } catch {
      setJournals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "labs") fetchLabs();
    if (activeTab === "journals") fetchJournals();
    setExpandedId(null);
    setSearch("");
  }, [activeTab]);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const filteredLabs = useMemo(() => {
    if (!search.trim()) return labs;
    const q = search.trim().toLowerCase();
    return labs.filter((l) => l.name.toLowerCase().includes(q));
  }, [labs, search]);

  const filteredJournals = useMemo(() => {
    if (!search.trim()) return journals;
    const q = search.trim().toLowerCase();
    return journals.filter((j) => j.name.toLowerCase().includes(q));
  }, [journals, search]);

  const currentList = activeTab === "labs" ? filteredLabs : filteredJournals;
  const currentCount = currentList.length;
  const totalCount = activeTab === "labs" ? labs.length : journals.length;

  return (
    <>
      <style>{styles}</style>
      <div className="labs-root">
        <div className="labs-container">
          {/* Header */}
          <header className="labs-header">
           
            <div className="labs-eyebrow">منظومة البحث العلمي</div>
            <h1 className="labs-title">المخابر والمجلات العلمية</h1>
            <p className="labs-subtitle">
              استعراض تفاصيل المخابر البحثية والمجلات العلمية
            </p>
          </header>

          {/* Tabs */}
          <div className="tab-grid">
            <button
              type="button"
              className={`tab-btn type-lab ${activeTab === "labs" ? "active" : ""}`}
              onClick={() => setActiveTab("labs")}
              aria-pressed={activeTab === "labs"}
            >
              {activeTab === "labs" && labs.length > 0 && (
                <span className="tab-count">{labs.length}</span>
              )}
              <span className="tab-btn-icon">🏢</span>
              <span className="tab-btn-label">مخابر البحث</span>
              <span className="tab-btn-desc">المخابر العلمية والبحثية</span>
            </button>

            <button
              type="button"
              className={`tab-btn type-journal ${activeTab === "journals" ? "active" : ""}`}
              onClick={() => setActiveTab("journals")}
              aria-pressed={activeTab === "journals"}
            >
              {activeTab === "journals" && journals.length > 0 && (
                <span className="tab-count">{journals.length}</span>
              )}
              <span className="tab-btn-icon">📰</span>
              <span className="tab-btn-label">المجلات العلمية</span>
              <span className="tab-btn-desc">المجلات والدوريات البحثية</span>
            </button>
          </div>

          {/* Toolbar */}
          {activeTab && (
            <div className="toolbar">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="ابحث بالاسم..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  dir="rtl"
                />
              </div>
              <div className="toolbar-count">
                <strong>{currentCount}</strong> / {totalCount} سجل
              </div>
            </div>
          )}

          {/* Content */}
          {loading && (
            <div
              className={`loading-state ${activeTab === "journals" ? "type-journal" : "type-lab"}`}
            >
              <div className="loader" />
              <span>جارٍ تحميل البيانات...</span>
            </div>
          )}

          {!loading &&
            activeTab === "labs" &&
            (currentCount === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏢</div>
                {search.trim()
                  ? "لا توجد نتائج مطابقة للبحث"
                  : "لا توجد مخابر مضافة بعد"}
              </div>
            ) : (
              <div className="cards-list">
                {filteredLabs.map((lab, i) => (
                  <LabCard
                    key={lab._id}
                    lab={lab}
                    index={i}
                    expanded={expandedId === lab._id}
                    onToggle={() => toggle(lab._id)}
                  />
                ))}
              </div>
            ))}

          {!loading &&
            activeTab === "journals" &&
            (currentCount === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📰</div>
                {search.trim()
                  ? "لا توجد نتائج مطابقة للبحث"
                  : "لا توجد مجلات مضافة بعد"}
              </div>
            ) : (
              <div className="cards-list">
                {filteredJournals.map((j, i) => (
                  <JournalCard
                    key={j._id}
                    journal={j}
                    index={i}
                    expanded={expandedId === j._id}
                    onToggle={() => toggle(j._id)}
                  />
                ))}
              </div>
            ))}

          {!activeTab && (
            <div className="initial-state">
              <div className="initial-state-icon">📚</div>
              اختر قسماً لعرض البيانات
            </div>
          )}
        </div>
      </div>
    </>
  );
}
