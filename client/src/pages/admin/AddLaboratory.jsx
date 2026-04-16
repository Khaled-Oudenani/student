// import { useState } from "react";
// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL}/api/laboratories`;

// const emptyItem = () => ({ text: "", file: null });

// // ✅ خارج الـ component الرئيسي
// const Section = ({
//   title,
//   icon,
//   items,
//   onAdd,
//   onRemove,
//   onTextChange,
//   onFileChange,
// }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//     <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
//       <div className="flex items-center gap-2">
//         <span className="text-xl">{icon}</span>
//         <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
//       </div>
//       <button
//         type="button"
//         onClick={onAdd}
//         className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
//       >
//         <span>+</span> إضافة
//       </button>
//     </div>

//     <div className="p-5 space-y-4">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className="relative bg-slate-50 rounded-xl p-4 border border-slate-100"
//         >
//           {items.length > 1 && (
//             <button
//               type="button"
//               onClick={() => onRemove(idx)}
//               className="absolute top-3 left-3 text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
//             >
//               ×
//             </button>
//           )}
//           <div className="space-y-3">
//             <div>
//               <label className="block text-xs font-medium text-slate-500 mb-1.5">
//                 النص
//               </label>
//               <textarea
//                 rows={3}
//                 value={item.text}
//                 onChange={(e) => onTextChange(idx, e.target.value)}
//                 placeholder="أدخل النص هنا..."
//                 className="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
//                 dir="rtl"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-slate-500 mb-1.5">
//                 الملف <span className="text-slate-300">(اختياري)</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer w-fit">
//                 <div className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 px-3 py-2 rounded-lg transition-all">
//                   <span>📎</span>
//                   <span>{item.file ? item.file.name : "اختر ملفاً"}</span>
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={(e) => onFileChange(idx, e.target.files[0])}
//                   accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xls,.xlsx,.ppt,.pptx"
//                 />
//               </label>
//               {item.file && (
//                 <p className="mt-1 text-xs text-emerald-600 truncate max-w-xs">
//                   ✓ {item.file.name}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default function AddLaboratory() {
//   const [name, setName] = useState("");
//   const [battaka, setBattaka] = useState([emptyItem()]);
//   const [hassila, setHassila] = useState([emptyItem()]);
//   const [nashatat, setNashatat] = useState([emptyItem()]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const makeHandlers = (setter) => ({
//     onAdd: () => setter((p) => [...p, emptyItem()]),
//     onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
//     onTextChange: (idx, val) =>
//       setter((p) =>
//         p.map((item, i) => (i === idx ? { ...item, text: val } : item)),
//       ),
//     onFileChange: (idx, file) =>
//       setter((p) => p.map((item, i) => (i === idx ? { ...item, file } : item))),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return setError("اسم المخبر مطلوب");
//     setError("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     battaka.forEach((item) => {
//       formData.append("battaka_taqniya[text]", item.text || "");
//       if (item.file) formData.append("battaka_file", item.file);
//     });
//     hassila.forEach((item) => {
//       formData.append("hassila[text]", item.text || "");
//       if (item.file) formData.append("hassila_file", item.file);
//     });
//     nashatat.forEach((item) => {
//       formData.append("nashatat[text]", item.text || "");
//       if (item.file) formData.append("nashatat_file", item.file);
//     });

//     try {
//       await axios.post(API_URL, formData);
//       setSuccess(true);
//       setName("");
//       setBattaka([emptyItem()]);
//       setHassila([emptyItem()]);
//       setNashatat([emptyItem()]);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-800">إضافة مخبر جديد</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             أدخل بيانات المخبر البحثي
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               اسم المخبر <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="مثال: مخبر الذكاء الاصطناعي"
//               className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
//             />
//           </div>

//           <Section
//             title="البطاقة التقنية"
//             icon="📋"
//             items={battaka}
//             {...makeHandlers(setBattaka)}
//           />
//           <Section
//             title="الحصيلة"
//             icon="📊"
//             items={hassila}
//             {...makeHandlers(setHassila)}
//           />
//           <Section
//             title="النشاطات"
//             icon="⚡"
//             items={nashatat}
//             {...makeHandlers(setNashatat)}
//           />

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
//               ⚠️ {error}
//             </div>
//           )}
//           {success && (
//             <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm rounded-xl px-4 py-3">
//               ✅ تم إضافة المخبر بنجاح!
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
//           >
//             {loading ? "جارٍ الحفظ..." : "حفظ المخبر"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// 222222222222222222222222

// import { useState } from "react";
// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL}/api/laboratories`;

// const emptyItem = () => ({ text: "", file: null });

// // ── Section مع نص + ملف (للبطاقة التقنية، الحصيلة، النشاطات)
// const Section = ({
//   title,
//   icon,
//   items,
//   onAdd,
//   onRemove,
//   onTextChange,
//   onFileChange,
// }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//     <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
//       <div className="flex items-center gap-2">
//         <span className="text-xl">{icon}</span>
//         <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
//       </div>
//       <button
//         type="button"
//         onClick={onAdd}
//         className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
//       >
//         <span>+</span> إضافة
//       </button>
//     </div>
//     <div className="p-5 space-y-4">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className="relative bg-slate-50 rounded-xl p-4 border border-slate-100"
//         >
//           {items.length > 1 && (
//             <button
//               type="button"
//               onClick={() => onRemove(idx)}
//               className="absolute top-3 left-3 text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
//             >
//               ×
//             </button>
//           )}
//           <div className="space-y-3">
//             <div>
//               <label className="block text-xs font-medium text-slate-500 mb-1.5">
//                 النص
//               </label>
//               <textarea
//                 rows={3}
//                 value={item.text}
//                 onChange={(e) => onTextChange(idx, e.target.value)}
//                 placeholder="أدخل النص هنا..."
//                 className="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
//                 dir="rtl"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-slate-500 mb-1.5">
//                 الملف <span className="text-slate-300">(اختياري)</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer w-fit">
//                 <div className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 px-3 py-2 rounded-lg transition-all">
//                   <span>📎</span>
//                   <span>{item.file ? item.file.name : "اختر ملفاً"}</span>
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={(e) => onFileChange(idx, e.target.files[0])}
//                   accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xls,.xlsx,.ppt,.pptx"
//                 />
//               </label>
//               {item.file && (
//                 <p className="mt-1 text-xs text-emerald-600 truncate max-w-xs">
//                   ✓ {item.file.name}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ── Section نصوص متعددة فقط (للمكونات والفرق)
// const TextListSection = ({
//   title,
//   icon,
//   items,
//   onAdd,
//   onRemove,
//   onTextChange,
// }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//     <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
//       <div className="flex items-center gap-2">
//         <span className="text-xl">{icon}</span>
//         <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
//       </div>
//       <button
//         type="button"
//         onClick={onAdd}
//         className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
//       >
//         <span>+</span> إضافة
//       </button>
//     </div>
//     <div className="p-5 space-y-3">
//       {items.map((item, idx) => (
//         <div key={idx} className="flex items-center gap-2">
//           <input
//             type="text"
//             value={item}
//             onChange={(e) => onTextChange(idx, e.target.value)}
//             placeholder="أدخل النص هنا..."
//             className="flex-1 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
//             dir="rtl"
//           />
//           {items.length > 1 && (
//             <button
//               type="button"
//               onClick={() => onRemove(idx)}
//               className="text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
//             >
//               ×
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default function AddLaboratory() {
//   const [name, setName] = useState("");
//   const [taareef, setTaareef] = useState("");
//   const [battaka, setBattaka] = useState([emptyItem()]);
//   const [hassila, setHassila] = useState([emptyItem()]);
//   const [nashatat, setNashatat] = useState([emptyItem()]);
//   const [mokawinat, setMokawinat] = useState([""]);
//   const [firaq, setFiraq] = useState([""]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // handlers للـ Section (نص + ملف)
//   const makeHandlers = (setter) => ({
//     onAdd: () => setter((p) => [...p, emptyItem()]),
//     onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
//     onTextChange: (idx, val) =>
//       setter((p) =>
//         p.map((item, i) => (i === idx ? { ...item, text: val } : item)),
//       ),
//     onFileChange: (idx, file) =>
//       setter((p) => p.map((item, i) => (i === idx ? { ...item, file } : item))),
//   });

//   // handlers للـ TextListSection (نص فقط)
//   const makeTextListHandlers = (setter) => ({
//     onAdd: () => setter((p) => [...p, ""]),
//     onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
//     onTextChange: (idx, val) =>
//       setter((p) => p.map((item, i) => (i === idx ? val : item))),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return setError("اسم المخبر مطلوب");
//     setError("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("taareef", taareef);

//     battaka.forEach((item) => {
//       formData.append("battaka_taqniya[text]", item.text || "");
//       if (item.file) formData.append("battaka_file", item.file);
//     });
//     hassila.forEach((item) => {
//       formData.append("hassila[text]", item.text || "");
//       if (item.file) formData.append("hassila_file", item.file);
//     });
//     nashatat.forEach((item) => {
//       formData.append("nashatat[text]", item.text || "");
//       if (item.file) formData.append("nashatat_file", item.file);
//     });
//     mokawinat.forEach((item) => formData.append("mokawinat", item));
//     firaq.forEach((item) => formData.append("firaq", item));

//     try {
//       await axios.post(API_URL, formData);
//       setSuccess(true);
//       setName("");
//       setTaareef("");
//       setBattaka([emptyItem()]);
//       setHassila([emptyItem()]);
//       setNashatat([emptyItem()]);
//       setMokawinat([""]);
//       setFiraq([""]);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-800">إضافة مخبر جديد</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             أدخل بيانات المخبر البحثي
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* اسم المخبر */}
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               اسم المخبر <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="مثال: مخبر الذكاء الاصطناعي"
//               className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
//             />
//           </div>

//           {/* التعريف - نص واحد فقط */}
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//             <div className="flex items-center gap-2 mb-3">
//               <span className="text-xl">📝</span>
//               <label className="text-sm font-semibold text-slate-700">
//                 التعريف
//               </label>
//             </div>
//             <textarea
//               rows={4}
//               value={taareef}
//               onChange={(e) => setTaareef(e.target.value)}
//               placeholder="أدخل تعريف المخبر..."
//               className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
//               dir="rtl"
//             />
//           </div>

//           {/* البطاقة التقنية */}
//           <Section
//             title="البطاقة التقنية"
//             icon="📋"
//             items={battaka}
//             {...makeHandlers(setBattaka)}
//           />

//           {/* الحصيلة */}
//           <Section
//             title="الحصيلة"
//             icon="📊"
//             items={hassila}
//             {...makeHandlers(setHassila)}
//           />

//           {/* النشاطات */}
//           <Section
//             title="النشاطات"
//             icon="⚡"
//             items={nashatat}
//             {...makeHandlers(setNashatat)}
//           />

//           {/* المكونات */}
//           <TextListSection
//             title="المكونات"
//             icon="🧩"
//             items={mokawinat}
//             {...makeTextListHandlers(setMokawinat)}
//           />

//           {/* الفرق */}
//           <TextListSection
//             title="الفرق"
//             icon="👥"
//             items={firaq}
//             {...makeTextListHandlers(setFiraq)}
//           />

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
//               ⚠️ {error}
//             </div>
//           )}
//           {success && (
//             <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm rounded-xl px-4 py-3">
//               ✅ تم إضافة المخبر بنجاح!
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
//           >
//             {loading ? "جارٍ الحفظ..." : "حفظ المخبر"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// 333333333333

import { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/laboratories`;

const emptyItem = () => ({ text: "", file: null });

// ── Section مع نص + ملف (للبطاقة التقنية، الحصيلة، النشاطات)
const Section = ({
  title,
  icon,
  items,
  onAdd,
  onRemove,
  onTextChange,
  onFileChange,
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
      >
        <span>+</span> إضافة
      </button>
    </div>
    <div className="p-5 space-y-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative bg-slate-50 rounded-xl p-4 border border-slate-100"
        >
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="absolute top-3 left-3 text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
            >
              ×
            </button>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                النص
              </label>
              <textarea
                rows={3}
                value={item.text}
                onChange={(e) => onTextChange(idx, e.target.value)}
                placeholder="أدخل النص هنا..."
                className="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                الملف <span className="text-slate-300">(اختياري)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 px-3 py-2 rounded-lg transition-all">
                  <span>📎</span>
                  <span>{item.file ? item.file.name : "اختر ملفاً"}</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => onFileChange(idx, e.target.files[0])}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xls,.xlsx,.ppt,.pptx"
                />
              </label>
              {item.file && (
                <p className="mt-1 text-xs text-emerald-600 truncate max-w-xs">
                  ✓ {item.file.name}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Section نصوص متعددة فقط (للمكونات والفرق)
const TextListSection = ({
  title,
  icon,
  items,
  onAdd,
  onRemove,
  onTextChange,
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
      >
        <span>+</span> إضافة
      </button>
    </div>
    <div className="p-5 space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onTextChange(idx, e.target.value)}
            placeholder="أدخل النص هنا..."
            className="flex-1 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
            dir="rtl"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function AddLaboratory() {
  const [name, setName] = useState("");
  const [taareef, setTaareef] = useState("");
  const [battaka, setBattaka] = useState([emptyItem()]);
  const [hassila, setHassila] = useState([emptyItem()]);
  const [nashatat, setNashatat] = useState([emptyItem()]);
  const [mokawinat, setMokawinat] = useState([""]);
  const [firaq, setFiraq] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // handlers للـ Section (نص + ملف)
  const makeHandlers = (setter) => ({
    onAdd: () => setter((p) => [...p, emptyItem()]),
    onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
    onTextChange: (idx, val) =>
      setter((p) =>
        p.map((item, i) => (i === idx ? { ...item, text: val } : item)),
      ),
    onFileChange: (idx, file) =>
      setter((p) => p.map((item, i) => (i === idx ? { ...item, file } : item))),
  });

  // handlers للـ TextListSection (نص فقط)
  const makeTextListHandlers = (setter) => ({
    onAdd: () => setter((p) => [...p, ""]),
    onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
    onTextChange: (idx, val) =>
      setter((p) => p.map((item, i) => (i === idx ? val : item))),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("اسم المخبر مطلوب");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("taareef", taareef);

    // البطاقة التقنية
    battaka.forEach((item, idx) => {
      formData.append("battaka_texts", item.text || "");
      if (item.file) {
        formData.append("battaka_file", item.file);
        formData.append("battaka_file_indices", idx);
      }
    });

    // الحصيلة
    hassila.forEach((item, idx) => {
      formData.append("hassila_texts", item.text || "");
      if (item.file) {
        formData.append("hassila_file", item.file);
        formData.append("hassila_file_indices", idx);
      }
    });

    // النشاطات
    nashatat.forEach((item, idx) => {
      formData.append("nashatat_texts", item.text || "");
      if (item.file) {
        formData.append("nashatat_file", item.file);
        formData.append("nashatat_file_indices", idx);
      }
    });

    // المكونات والفرق
    mokawinat.forEach((item) => formData.append("mokawinat", item));
    firaq.forEach((item) => formData.append("firaq", item));

    try {
      await axios.post(API_URL, formData);
      setSuccess(true);
      setName("");
      setTaareef("");
      setBattaka([emptyItem()]);
      setHassila([emptyItem()]);
      setNashatat([emptyItem()]);
      setMokawinat([""]);
      setFiraq([""]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">إضافة مخبر جديد</h1>
          <p className="text-sm text-slate-500 mt-1">
            أدخل بيانات المخبر البحثي
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* اسم المخبر */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              اسم المخبر <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: مخبر الذكاء الاصطناعي"
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
            />
          </div>

          {/* التعريف */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📝</span>
              <label className="text-sm font-semibold text-slate-700">
                التعريف
              </label>
            </div>
            <textarea
              rows={4}
              value={taareef}
              onChange={(e) => setTaareef(e.target.value)}
              placeholder="أدخل تعريف المخبر..."
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
              dir="rtl"
            />
          </div>

          {/* البطاقة التقنية */}
          <Section
            title="البطاقة التقنية"
            icon="📋"
            items={battaka}
            {...makeHandlers(setBattaka)}
          />

          {/* الحصيلة */}
          <Section
            title="الحصيلة"
            icon="📊"
            items={hassila}
            {...makeHandlers(setHassila)}
          />

          {/* النشاطات */}
          <Section
            title="النشاطات"
            icon="⚡"
            items={nashatat}
            {...makeHandlers(setNashatat)}
          />

          {/* المكونات */}
          <TextListSection
            title="المكونات"
            icon="🧩"
            items={mokawinat}
            {...makeTextListHandlers(setMokawinat)}
          />

          {/* الفرق */}
          <TextListSection
            title="الفرق"
            icon="👥"
            items={firaq}
            {...makeTextListHandlers(setFiraq)}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm rounded-xl px-4 py-3">
              ✅ تم إضافة المخبر بنجاح!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ المخبر"}
          </button>
        </form>
      </div>
    </div>
  );
}
