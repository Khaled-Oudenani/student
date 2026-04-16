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

import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ── CSS مدمج ──
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap');

  .labs-root * { box-sizing: border-box; }

  .labs-root {
    font-family: 'Tajawal', sans-serif;
    min-height: 100vh;
    background: #0a0f1e;
    background-image:
      radial-gradient(ellipse 80% 60% at 20% -10%, rgba(16,185,129,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 110%, rgba(59,130,246,0.1) 0%, transparent 60%);
    color: #e2e8f0;
    padding: 3rem 1rem;
    direction: rtl;
  }

  .labs-container { max-width: 900px; margin: 0 auto; }

  /* Header */
  .labs-header { margin-bottom: 3rem; }
  .labs-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    color: #10b981;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .labs-eyebrow::before {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 1px;
    background: #10b981;
  }
  .labs-title {
    font-size: 2.25rem;
    font-weight: 800;
    background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin: 0 0 0.5rem;
  }
  .labs-subtitle { font-size: 0.9rem; color: #64748b; margin: 0; font-weight: 300; }

  /* Tab buttons */
  .tab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }

  .tab-btn {
    position: relative;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: right;
    overflow: hidden;
  }
  .tab-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: inherit;
  }
  .tab-btn:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
  .tab-btn:hover::before { opacity: 1; }

  .tab-btn.lab-btn.active {
    border-color: rgba(16,185,129,0.4);
    background: rgba(16,185,129,0.08);
    box-shadow: 0 0 40px rgba(16,185,129,0.1), inset 0 1px 0 rgba(16,185,129,0.15);
  }
  .tab-btn.journal-btn.active {
    border-color: rgba(59,130,246,0.4);
    background: rgba(59,130,246,0.08);
    box-shadow: 0 0 40px rgba(59,130,246,0.1), inset 0 1px 0 rgba(59,130,246,0.15);
  }

  .tab-btn-icon { font-size: 2rem; margin-bottom: 0.75rem; display: block; }
  .tab-btn-label { font-size: 1rem; font-weight: 700; color: #f1f5f9; display: block; margin-bottom: 0.25rem; }
  .tab-btn-desc { font-size: 0.75rem; color: #64748b; font-weight: 300; }

  .tab-count {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 2rem;
  }
  .lab-btn .tab-count { background: rgba(16,185,129,0.15); color: #10b981; }
  .journal-btn .tab-count { background: rgba(59,130,246,0.15); color: #60a5fa; }

  /* Loading */
  .loading-state {
    text-align: center;
    padding: 5rem 0;
    color: #475569;
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .loader {
    width: 2rem; height: 2rem;
    border: 2px solid rgba(255,255,255,0.05);
    border-top-color: #10b981;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Empty */
  .empty-state {
    text-align: center;
    padding: 5rem 2rem;
    background: rgba(255,255,255,0.02);
    border: 1px dashed rgba(255,255,255,0.08);
    border-radius: 1.25rem;
    color: #475569;
    font-size: 0.85rem;
  }
  .empty-state-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.4; }

  /* Initial state */
  .initial-state {
    text-align: center;
    padding: 5rem 0;
    color: #334155;
    font-size: 0.9rem;
  }

  /* Cards list */
  .cards-list { display: flex; flex-direction: column; gap: 0.75rem; }

  /* Lab / Journal Card */
  .entity-card {
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .entity-card:hover { border-color: rgba(255,255,255,0.12); }
  .entity-card.expanded-lab { border-color: rgba(16,185,129,0.25); }
  .entity-card.expanded-journal { border-color: rgba(59,130,246,0.25); }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1.4rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .card-header:hover { background: rgba(255,255,255,0.02); }

  .card-title-area { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
  .card-icon {
    width: 2.4rem; height: 2.4rem;
    border-radius: 0.6rem;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .lab-icon { background: rgba(16,185,129,0.12); }
  .journal-icon { background: rgba(59,130,246,0.12); }

  .card-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-meta { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }

  .meta-pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 2rem;
    white-space: nowrap;
  }
  .pill-green { background: rgba(16,185,129,0.12); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
  .pill-slate { background: rgba(100,116,139,0.12); color: #94a3b8; border: 1px solid rgba(100,116,139,0.2); }
  .pill-amber { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
  .pill-blue  { background: rgba(59,130,246,0.12);  color: #60a5fa; border: 1px solid rgba(59,130,246,0.2); }
  .pill-purple{ background: rgba(139,92,246,0.12); color: #a78bfa; border: 1px solid rgba(139,92,246,0.2); }

  .chevron {
    width: 1.5rem; height: 1.5rem;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem;
    color: #64748b;
    transition: transform 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .chevron.open { transform: rotate(180deg); background: rgba(255,255,255,0.08); color: #94a3b8; }

  /* Expanded details */
  .card-details {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 1.25rem 1.4rem;
    background: rgba(0,0,0,0.15);
    animation: slideDown 0.2s ease;
  }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

  .detail-section { margin-bottom: 1.25rem; }
  .detail-section:last-child { margin-bottom: 0; }

  .detail-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .detail-text {
    font-size: 0.82rem;
    color: #94a3b8;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0.6rem;
    padding: 0.75rem 1rem;
    line-height: 1.7;
  }

  .detail-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .detail-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }

  .field-items-list { display: flex; flex-direction: column; gap: 0.4rem; }
  .field-item {
    font-size: 0.78rem;
    color: #94a3b8;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    line-height: 1.5;
  }
  .field-item a {
    color: #60a5fa;
    text-decoration: none;
    font-size: 0.72rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }
  .field-item a:hover { text-decoration: underline; }
  .field-empty { font-size: 0.75rem; color: #334155; font-style: italic; }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 1.25rem 0;
  }

  @media (max-width: 640px) {
    .detail-grid-3 { grid-template-columns: 1fr; }
    .detail-grid-2 { grid-template-columns: 1fr; }
    .card-meta .meta-pill:nth-child(n+3) { display: none; }
    .labs-title { font-size: 1.6rem; }
  }
`;

// ── Sub-components ──
const FieldItems = ({ items }) => {
  if (!items?.length)
    return <span className="field-empty">لا توجد بيانات</span>;
  return (
    <div className="field-items-list">
      {items.map((item, idx) => (
        <div key={idx} className="field-item">
          {item.text && <p>{item.text}</p>}
          {item.file && (
            <a href={item.file} target="_blank" rel="noreferrer">
              <span>📎</span> عرض الملف
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

const TextItems = ({ items }) => {
  if (!items?.length)
    return <span className="field-empty">لا توجد بيانات</span>;
  return (
    <div className="field-items-list">
      {items.map((item, idx) => (
        <div key={idx} className="field-item">
          {item}
        </div>
      ))}
    </div>
  );
};

// ── Lab Card ──
const LabCard = ({ lab, expanded, onToggle }) => (
  <div className={`entity-card ${expanded ? "expanded-lab" : ""}`}>
    <div className="card-header" onClick={onToggle}>
      <div className="card-title-area">
        <div className="card-icon lab-icon">🔬</div>
        <span className="card-name">{lab.name}</span>
      </div>
      <div className="card-meta">
        {lab.battaka_taqniya?.length > 0 && (
          <span className="meta-pill pill-green">
            {lab.battaka_taqniya.length} بطاقة
          </span>
        )}
        {lab.hassila?.length > 0 && (
          <span className="meta-pill pill-slate">
            {lab.hassila.length} حصيلة
          </span>
        )}
        {lab.nashatat?.length > 0 && (
          <span className="meta-pill pill-amber">
            {lab.nashatat.length} نشاط
          </span>
        )}
        <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
      </div>
    </div>

    {expanded && (
      <div className="card-details">
        {lab.taareef && (
          <div className="detail-section">
            <div className="detail-label">📝 التعريف</div>
            <div className="detail-text">{lab.taareef}</div>
          </div>
        )}

        <div className="detail-grid-3 detail-section">
          <div>
            <div className="detail-label">📋 البطاقة التقنية</div>
            <FieldItems items={lab.battaka_taqniya} />
          </div>
          <div>
            <div className="detail-label">📊 الحصيلة</div>
            <FieldItems items={lab.hassila} />
          </div>
          <div>
            <div className="detail-label">⚡ النشاطات</div>
            <FieldItems items={lab.nashatat} />
          </div>
        </div>

        {(lab.mokawinat?.length > 0 || lab.firaq?.length > 0) && (
          <>
            <div className="divider" />
            <div className="detail-grid-2">
              <div>
                <div className="detail-label">🧩 المكونات</div>
                <TextItems items={lab.mokawinat} />
              </div>
              <div>
                <div className="detail-label">👥 الفرق</div>
                <TextItems items={lab.firaq} />
              </div>
            </div>
          </>
        )}
      </div>
    )}
  </div>
);

// ── Journal Card ──
const JournalCard = ({ journal, expanded, onToggle }) => (
  <div className={`entity-card ${expanded ? "expanded-journal" : ""}`}>
    <div className="card-header" onClick={onToggle}>
      <div className="card-title-area">
        <div className="card-icon journal-icon">📰</div>
        <span className="card-name">{journal.name}</span>
      </div>
      <div className="card-meta">
        {journal.battaka_taqniya?.length > 0 && (
          <span className="meta-pill pill-blue">
            {journal.battaka_taqniya.length} بطاقة
          </span>
        )}
        {journal.aadat && (
          <span className="meta-pill pill-slate">أعداد متاحة</span>
        )}
        <div className={`chevron ${expanded ? "open" : ""}`}>▼</div>
      </div>
    </div>

    {expanded && (
      <div className="card-details">
        <div className="detail-grid-2">
          <div>
            <div className="detail-label">📋 البطاقة التقنية</div>
            <FieldItems items={journal.battaka_taqniya} />
          </div>
          <div>
            <div className="detail-label">📰 الأعداد</div>
            {journal.aadat ? (
              <div className="detail-text">{journal.aadat}</div>
            ) : (
              <span className="field-empty">لا توجد بيانات</span>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

// ── Main ──
export default function LabsAndJrns() {
  const [activeTab, setActiveTab] = useState(null);
  const [labs, setLabs] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

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
  }, [activeTab]);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

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
              className={`tab-btn lab-btn ${activeTab === "labs" ? "active" : ""}`}
              onClick={() => setActiveTab("labs")}
            >
              {activeTab === "labs" && labs.length > 0 && (
                <span className="tab-count">{labs.length}</span>
              )}
              <span className="tab-btn-icon">🔬</span>
              <span className="tab-btn-label">مخابر البحث</span>
              <span className="tab-btn-desc">المخابر العلمية والبحثية</span>
            </button>

            <button
              className={`tab-btn journal-btn ${activeTab === "journals" ? "active" : ""}`}
              onClick={() => setActiveTab("journals")}
            >
              {activeTab === "journals" && journals.length > 0 && (
                <span className="tab-count">{journals.length}</span>
              )}
              <span className="tab-btn-icon">📰</span>
              <span className="tab-btn-label">المجلات العلمية</span>
              <span className="tab-btn-desc">المجلات والدوريات البحثية</span>
            </button>
          </div>

          {/* Content */}
          {loading && (
            <div className="loading-state">
              <div className="loader" />
              <span>جارٍ تحميل البيانات...</span>
            </div>
          )}

          {!loading &&
            activeTab === "labs" &&
            (labs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔬</div>لا توجد مخابر مضافة
                بعد
              </div>
            ) : (
              <div className="cards-list">
                {labs.map((lab) => (
                  <LabCard
                    key={lab._id}
                    lab={lab}
                    expanded={expandedId === lab._id}
                    onToggle={() => toggle(lab._id)}
                  />
                ))}
              </div>
            ))}

          {!loading &&
            activeTab === "journals" &&
            (journals.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📰</div>لا توجد مجلات مضافة
                بعد
              </div>
            ) : (
              <div className="cards-list">
                {journals.map((j) => (
                  <JournalCard
                    key={j._id}
                    journal={j}
                    expanded={expandedId === j._id}
                    onToggle={() => toggle(j._id)}
                  />
                ))}
              </div>
            ))}

          {!activeTab && (
            <div className="initial-state">اختر قسماً لعرض البيانات</div>
          )}
        </div>
      </div>
    </>
  );
}
