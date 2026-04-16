// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// // ─────────────────────────────────────────────
// // Modal تعديل مخبر
// // ─────────────────────────────────────────────
// function EditLabModal({ lab, onClose, onSaved }) {
//   const [name, setName] = useState(lab.name);
//   const [battaka, setBattaka] = useState(
//     lab.battaka_taqniya?.length ? lab.battaka_taqniya : [{ text: "", file: null }]
//   );
//   const [hassila, setHassila] = useState(
//     lab.hassila?.length ? lab.hassila : [{ text: "", file: null }]
//   );
//   const [nashatat, setNashatat] = useState(
//     lab.nashatat?.length ? lab.nashatat : [{ text: "", file: null }]
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const addItem = (setter) => setter((p) => [...p, { text: "", file: null }]);
//   const removeItem = (setter, idx) => setter((p) => p.filter((_, i) => i !== idx));
//   const updateText = (setter, idx, val) =>
//     setter((p) => p.map((item, i) => (i === idx ? { ...item, text: val } : item)));
//   const updateFile = (setter, idx, file) =>
//     setter((p) => p.map((item, i) => (i === idx ? { ...item, file } : item)));

//   const handleSave = async () => {
//     if (!name.trim()) return setError("اسم المخبر مطلوب");
//     setLoading(true);
//     setError("");
//     const fd = new FormData();
//     fd.append("name", name);
//     battaka.forEach((i) => { fd.append("battaka_taqniya[text]", i.text || ""); if (i.file instanceof File) fd.append("battaka_file", i.file); });
//     hassila.forEach((i) => { fd.append("hassila[text]", i.text || ""); if (i.file instanceof File) fd.append("hassila_file", i.file); });
//     nashatat.forEach((i) => { fd.append("nashatat[text]", i.text || ""); if (i.file instanceof File) fd.append("nashatat_file", i.file); });
//     try {
//       await axios.put(`${API}/api/laboratories/${lab._id}`, fd);
//       onSaved();
//       onClose();
//     } catch (e) {
//       setError(e.response?.data?.message || "حدث خطأ");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const SectionRows = ({ title, icon, items, setter }) => (
//     <div className="mb-4">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-xs font-semibold text-slate-600">{icon} {title}</span>
//         <button type="button" onClick={() => addItem(setter)} className="text-xs text-emerald-600 hover:underline">+ إضافة</button>
//       </div>
//       {items.map((item, idx) => (
//         <div key={idx} className="flex gap-2 mb-2 items-start">
//           <textarea
//             rows={2}
//             value={item.text}
//             onChange={(e) => updateText(setter, idx, e.target.value)}
//             placeholder="النص..."
//             className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             dir="rtl"
//           />
//           <label className="cursor-pointer mt-1">
//             <div className="text-xs text-slate-400 hover:text-emerald-600 border border-slate-200 rounded-lg px-2 py-2">📎</div>
//             <input type="file" className="hidden" onChange={(e) => updateFile(setter, idx, e.target.files[0])} />
//           </label>
//           {items.length > 1 && (
//             <button type="button" onClick={() => removeItem(setter, idx)} className="mt-1 text-slate-300 hover:text-red-500 text-lg">×</button>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-5 border-b border-slate-100">
//           <h2 className="font-bold text-slate-800">تعديل المخبر</h2>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
//         </div>
//         <div className="p-5 space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-600 mb-1.5">اسم المخبر *</label>
//             <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
//           </div>
//           <SectionRows title="البطاقة التقنية" icon="📋" items={battaka} setter={setBattaka} />
//           <SectionRows title="الحصيلة" icon="📊" items={hassila} setter={setHassila} />
//           <SectionRows title="النشاطات" icon="⚡" items={nashatat} setter={setNashatat} />
//           {error && <p className="text-red-500 text-xs">{error}</p>}
//         </div>
//         <div className="flex gap-3 p-5 border-t border-slate-100">
//           <button onClick={onClose} className="flex-1 text-sm text-slate-600 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors">إلغاء</button>
//           <button onClick={handleSave} disabled={loading} className="flex-1 text-sm bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white rounded-xl py-2.5 font-semibold transition-colors">
//             {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // Modal تعديل مجلة
// // ─────────────────────────────────────────────
// function EditJournalModal({ journal, onClose, onSaved }) {
//   const [name, setName] = useState(journal.name);
//   const [battaka, setBattaka] = useState(
//     journal.battaka_taqniya?.length ? journal.battaka_taqniya : [{ text: "", file: null }]
//   );
//   const [aadat, setAadat] = useState(journal.aadat || "");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const addItem = () => setBattaka((p) => [...p, { text: "", file: null }]);
//   const removeItem = (idx) => setBattaka((p) => p.filter((_, i) => i !== idx));
//   const updateText = (idx, val) => setBattaka((p) => p.map((item, i) => (i === idx ? { ...item, text: val } : item)));
//   const updateFile = (idx, file) => setBattaka((p) => p.map((item, i) => (i === idx ? { ...item, file } : item)));

//   const handleSave = async () => {
//     if (!name.trim()) return setError("اسم المجلة مطلوب");
//     setLoading(true);
//     setError("");
//     const fd = new FormData();
//     fd.append("name", name);
//     fd.append("aadat", aadat);
//     battaka.forEach((i) => { fd.append("battaka_taqniya[text]", i.text || ""); if (i.file instanceof File) fd.append("battaka_file", i.file); });
//     try {
//       await axios.put(`${API}/api/journals/${journal._id}`, fd);
//       onSaved();
//       onClose();
//     } catch (e) {
//       setError(e.response?.data?.message || "حدث خطأ");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-5 border-b border-slate-100">
//           <h2 className="font-bold text-slate-800">تعديل المجلة</h2>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
//         </div>
//         <div className="p-5 space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-600 mb-1.5">اسم المجلة *</label>
//             <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400" />
//           </div>
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs font-semibold text-slate-600">📋 البطاقة التقنية</span>
//               <button type="button" onClick={addItem} className="text-xs text-blue-600 hover:underline">+ إضافة</button>
//             </div>
//             {battaka.map((item, idx) => (
//               <div key={idx} className="flex gap-2 mb-2 items-start">
//                 <textarea rows={2} value={item.text} onChange={(e) => updateText(idx, e.target.value)} placeholder="النص..." className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" dir="rtl" />
//                 <label className="cursor-pointer mt-1">
//                   <div className="text-xs text-slate-400 hover:text-blue-600 border border-slate-200 rounded-lg px-2 py-2">📎</div>
//                   <input type="file" className="hidden" onChange={(e) => updateFile(idx, e.target.files[0])} />
//                 </label>
//                 {battaka.length > 1 && <button type="button" onClick={() => removeItem(idx)} className="mt-1 text-slate-300 hover:text-red-500 text-lg">×</button>}
//               </div>
//             ))}
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-slate-600 mb-1.5">📰 الأعداد</label>
//             <textarea rows={3} value={aadat} onChange={(e) => setAadat(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" dir="rtl" />
//           </div>
//           {error && <p className="text-red-500 text-xs">{error}</p>}
//         </div>
//         <div className="flex gap-3 p-5 border-t border-slate-100">
//           <button onClick={onClose} className="flex-1 text-sm text-slate-600 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors">إلغاء</button>
//           <button onClick={handleSave} disabled={loading} className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl py-2.5 font-semibold transition-colors">
//             {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // الصفحة الرئيسية
// // ─────────────────────────────────────────────
// export default function ManageLabsAndJrns() {
//   const [labs, setLabs] = useState([]);
//   const [journals, setJournals] = useState([]);
//   const [loadingLabs, setLoadingLabs] = useState(true);
//   const [loadingJournals, setLoadingJournals] = useState(true);
//   const [editLab, setEditLab] = useState(null);
//   const [editJournal, setEditJournal] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchLabs = async () => {
//     setLoadingLabs(true);
//     try {
//       const res = await axios.get(`${API}/api/laboratories`);
//       setLabs(res.data.makhaber || []);
//     } catch { setLabs([]); }
//     finally { setLoadingLabs(false); }
//   };

//   const fetchJournals = async () => {
//     setLoadingJournals(true);
//     try {
//       const res = await axios.get(`${API}/api/journals`);
//       setJournals(res.data.majallat || []);
//     } catch { setJournals([]); }
//     finally { setLoadingJournals(false); }
//   };

//   useEffect(() => { fetchLabs(); fetchJournals(); }, []);

//   const deleteLab = async (id) => {
//     if (!confirm("هل أنت متأكد من حذف هذا المخبر؟")) return;
//     setDeletingId(id);
//     try { await axios.delete(`${API}/api/laboratories/${id}`); fetchLabs(); }
//     catch { alert("فشل الحذف"); }
//     finally { setDeletingId(null); }
//   };

//   const deleteJournal = async (id) => {
//     if (!confirm("هل أنت متأكد من حذف هذه المجلة؟")) return;
//     setDeletingId(id);
//     try { await axios.delete(`${API}/api/journals/${id}`); fetchJournals(); }
//     catch { alert("فشل الحذف"); }
//     finally { setDeletingId(null); }
//   };

//   // ── بطاقة مخبر ──
//   const LabCard = ({ lab }) => (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-start justify-between gap-4">
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-lg">🔬</span>
//           <h3 className="font-semibold text-slate-800 truncate">{lab.name}</h3>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {lab.battaka_taqniya?.length > 0 && (
//             <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-2.5 py-1">
//               📋 {lab.battaka_taqniya.length} بطاقة تقنية
//             </span>
//           )}
//           {lab.hassila?.length > 0 && (
//             <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
//               📊 {lab.hassila.length} حصيلة
//             </span>
//           )}
//           {lab.nashatat?.length > 0 && (
//             <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2.5 py-1">
//               ⚡ {lab.nashatat.length} نشاط
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="flex gap-2 shrink-0">
//         <button
//           onClick={() => setEditLab(lab)}
//           className="text-xs font-medium text-slate-600 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-3 py-2 rounded-xl transition-all"
//         >
//           تعديل
//         </button>
//         <button
//           onClick={() => deleteLab(lab._id)}
//           disabled={deletingId === lab._id}
//           className="text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition-all disabled:opacity-50"
//         >
//           {deletingId === lab._id ? "..." : "حذف"}
//         </button>
//       </div>
//     </div>
//   );

//   // ── بطاقة مجلة ──
//   const JournalCard = ({ journal }) => (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-start justify-between gap-4">
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-lg">📰</span>
//           <h3 className="font-semibold text-slate-800 truncate">{journal.name}</h3>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {journal.battaka_taqniya?.length > 0 && (
//             <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-1">
//               📋 {journal.battaka_taqniya.length} بطاقة تقنية
//             </span>
//           )}
//           {journal.aadat && (
//             <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
//               📄 الأعداد متاحة
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="flex gap-2 shrink-0">
//         <button
//           onClick={() => setEditJournal(journal)}
//           className="text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-2 rounded-xl transition-all"
//         >
//           تعديل
//         </button>
//         <button
//           onClick={() => deleteJournal(journal._id)}
//           disabled={deletingId === journal._id}
//           className="text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition-all disabled:opacity-50"
//         >
//           {deletingId === journal._id ? "..." : "حذف"}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
//       <div className="max-w-3xl mx-auto space-y-10">

//         {/* Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">إدارة المخابر والمجلات</h1>
//           <p className="text-sm text-slate-500 mt-1">عرض وتعديل وحذف المخابر البحثية والمجلات العلمية</p>
//         </div>

//         {/* ── قسم المخابر ── */}
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">🔬</span>
//               <h2 className="text-lg font-bold text-slate-700">المخابر</h2>
//               {!loadingLabs && (
//                 <span className="text-xs bg-emerald-100 text-emerald-600 font-semibold rounded-full px-2.5 py-0.5">
//                   {labs.length}
//                 </span>
//               )}
//             </div>
//           </div>

//           {loadingLabs ? (
//             <div className="text-center py-12 text-slate-400 text-sm">جارٍ التحميل...</div>
//           ) : labs.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
//               لا توجد مخابر مضافة بعد
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {labs.map((lab) => <LabCard key={lab._id} lab={lab} />)}
//             </div>
//           )}
//         </section>

//         {/* ── قسم المجلات ── */}
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">📰</span>
//               <h2 className="text-lg font-bold text-slate-700">المجلات</h2>
//               {!loadingJournals && (
//                 <span className="text-xs bg-blue-100 text-blue-600 font-semibold rounded-full px-2.5 py-0.5">
//                   {journals.length}
//                 </span>
//               )}
//             </div>
//           </div>

//           {loadingJournals ? (
//             <div className="text-center py-12 text-slate-400 text-sm">جارٍ التحميل...</div>
//           ) : journals.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
//               لا توجد مجلات مضافة بعد
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {journals.map((j) => <JournalCard key={j._id} journal={j} />)}
//             </div>
//           )}
//         </section>

//       </div>

//       {/* Modals */}
//       {editLab && <EditLabModal lab={editLab} onClose={() => setEditLab(null)} onSaved={fetchLabs} />}
//       {editJournal && <EditJournalModal journal={editJournal} onClose={() => setEditJournal(null)} onSaved={fetchJournals} />}
//     </div>
//   );
// }

//

import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ── خارج الـ components لتجنب مشكلة الـ focus ──
const SectionRows = ({
  title,
  icon,
  items,
  onAdd,
  onRemove,
  onTextChange,
  onFileChange,
}) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-slate-600">
        {icon} {title}
      </span>
      <button
        type="button"
        onClick={onAdd}
        className="text-xs text-emerald-600 hover:underline"
      >
        + إضافة
      </button>
    </div>
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2 mb-2 items-start">
        <textarea
          rows={2}
          value={item.text}
          onChange={(e) => onTextChange(idx, e.target.value)}
          placeholder="النص..."
          className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
          dir="rtl"
        />
        <label className="cursor-pointer mt-1">
          <div className="text-xs text-slate-400 hover:text-emerald-600 border border-slate-200 rounded-lg px-2 py-2">
            📎
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => onFileChange(idx, e.target.files[0])}
          />
        </label>
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="mt-1 text-slate-300 hover:text-red-500 text-lg"
          >
            ×
          </button>
        )}
      </div>
    ))}
  </div>
);

const TextListRows = ({
  title,
  icon,
  items,
  onAdd,
  onRemove,
  onTextChange,
}) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-slate-600">
        {icon} {title}
      </span>
      <button
        type="button"
        onClick={onAdd}
        className="text-xs text-emerald-600 hover:underline"
      >
        + إضافة
      </button>
    </div>
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2 mb-2 items-center">
        <input
          type="text"
          value={item}
          onChange={(e) => onTextChange(idx, e.target.value)}
          placeholder="النص..."
          className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          dir="rtl"
        />
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="text-slate-300 hover:text-red-500 text-lg"
          >
            ×
          </button>
        )}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// Modal تعديل مخبر
// ─────────────────────────────────────────────
function EditLabModal({ lab, onClose, onSaved }) {
  const [name, setName] = useState(lab.name);
  const [taareef, setTaareef] = useState(lab.taareef || "");
  const [battaka, setBattaka] = useState(
    lab.battaka_taqniya?.length
      ? lab.battaka_taqniya
      : [{ text: "", file: null }],
  );
  const [hassila, setHassila] = useState(
    lab.hassila?.length ? lab.hassila : [{ text: "", file: null }],
  );
  const [nashatat, setNashatat] = useState(
    lab.nashatat?.length ? lab.nashatat : [{ text: "", file: null }],
  );
  const [mokawinat, setMokawinat] = useState(
    lab.mokawinat?.length ? lab.mokawinat : [""],
  );
  const [firaq, setFiraq] = useState(lab.firaq?.length ? lab.firaq : [""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const makeHandlers = (setter) => ({
    onAdd: () => setter((p) => [...p, { text: "", file: null }]),
    onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
    onTextChange: (idx, val) =>
      setter((p) =>
        p.map((item, i) => (i === idx ? { ...item, text: val } : item)),
      ),
    onFileChange: (idx, file) =>
      setter((p) => p.map((item, i) => (i === idx ? { ...item, file } : item))),
  });

  const makeTextListHandlers = (setter) => ({
    onAdd: () => setter((p) => [...p, ""]),
    onRemove: (idx) => setter((p) => p.filter((_, i) => i !== idx)),
    onTextChange: (idx, val) =>
      setter((p) => p.map((item, i) => (i === idx ? val : item))),
  });

  // const handleSave = async () => {
  //   if (!name.trim()) return setError("اسم المخبر مطلوب");
  //   setLoading(true);
  //   setError("");
  //   const fd = new FormData();
  //   fd.append("name", name);
  //   fd.append("taareef", taareef);
  //   battaka.forEach((i) => {
  //     fd.append("battaka_taqniya[text]", i.text || "");
  //     if (i.file instanceof File) fd.append("battaka_file", i.file);
  //   });
  //   hassila.forEach((i) => {
  //     fd.append("hassila[text]", i.text || "");
  //     if (i.file instanceof File) fd.append("hassila_file", i.file);
  //   });
  //   nashatat.forEach((i) => {
  //     fd.append("nashatat[text]", i.text || "");
  //     if (i.file instanceof File) fd.append("nashatat_file", i.file);
  //   });
  //   mokawinat.forEach((i) => fd.append("mokawinat", i));
  //   firaq.forEach((i) => fd.append("firaq", i));
  //   try {
  //     await axios.put(`${API}/api/laboratories/${lab._id}`, fd);
  //     onSaved();
  //     onClose();
  //   } catch (e) {
  //     setError(e.response?.data?.message || "حدث خطأ");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //
  const handleSave = async () => {
    if (!name.trim()) return setError("اسم المخبر مطلوب");
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("name", name);
    fd.append("taareef", taareef);

    // battaka_taqniya
    const battakaFileIndices = [];
    battaka.forEach((item, idx) => {
      fd.append("battaka_texts", item.text || "");
      if (item.file instanceof File) {
        fd.append("battaka_file", item.file);
        battakaFileIndices.push(idx);
      }
    });
    battakaFileIndices.forEach((i) => fd.append("battaka_file_indices", i));

    // hassila
    const hassilaFileIndices = [];
    hassila.forEach((item, idx) => {
      fd.append("hassila_texts", item.text || "");
      if (item.file instanceof File) {
        fd.append("hassila_file", item.file);
        hassilaFileIndices.push(idx);
      }
    });
    hassilaFileIndices.forEach((i) => fd.append("hassila_file_indices", i));

    // nashatat
    const nashatatFileIndices = [];
    nashatat.forEach((item, idx) => {
      fd.append("nashatat_texts", item.text || "");
      if (item.file instanceof File) {
        fd.append("nashatat_file", item.file);
        nashatatFileIndices.push(idx);
      }
    });
    nashatatFileIndices.forEach((i) => fd.append("nashatat_file_indices", i));

    mokawinat.forEach((i) => fd.append("mokawinat", i));
    firaq.forEach((i) => fd.append("firaq", i));

    try {
      await axios.put(`${API}/api/laboratories/${lab._id}`, fd);
      onSaved();
      onClose();
    } catch (e) {
      setError(e.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };
  //

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">تعديل المخبر</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              اسم المخبر *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              📝 التعريف
            </label>
            <textarea
              rows={3}
              value={taareef}
              onChange={(e) => setTaareef(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
              dir="rtl"
            />
          </div>
          <SectionRows
            title="البطاقة التقنية"
            icon="📋"
            items={battaka}
            {...makeHandlers(setBattaka)}
          />
          <SectionRows
            title="الحصيلة"
            icon="📊"
            items={hassila}
            {...makeHandlers(setHassila)}
          />
          <SectionRows
            title="النشاطات"
            icon="⚡"
            items={nashatat}
            {...makeHandlers(setNashatat)}
          />
          <TextListRows
            title="المكونات"
            icon="🧩"
            items={mokawinat}
            {...makeTextListHandlers(setMokawinat)}
          />
          <TextListRows
            title="الفرق"
            icon="👥"
            items={firaq}
            {...makeTextListHandlers(setFiraq)}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
        <div className="flex gap-3 p-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 text-sm text-slate-600 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 text-sm bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white rounded-xl py-2.5 font-semibold transition-colors"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Modal تعديل مجلة
// ─────────────────────────────────────────────
function EditJournalModal({ journal, onClose, onSaved }) {
  const [name, setName] = useState(journal.name);
  const [battaka, setBattaka] = useState(
    journal.battaka_taqniya?.length
      ? journal.battaka_taqniya
      : [{ text: "", file: null }],
  );
  const [aadat, setAadat] = useState(journal.aadat || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const makeHandlers = () => ({
    onAdd: () => setBattaka((p) => [...p, { text: "", file: null }]),
    onRemove: (idx) => setBattaka((p) => p.filter((_, i) => i !== idx)),
    onTextChange: (idx, val) =>
      setBattaka((p) =>
        p.map((item, i) => (i === idx ? { ...item, text: val } : item)),
      ),
    onFileChange: (idx, file) =>
      setBattaka((p) =>
        p.map((item, i) => (i === idx ? { ...item, file } : item)),
      ),
  });

  const handleSave = async () => {
    if (!name.trim()) return setError("اسم المجلة مطلوب");
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("name", name);
    fd.append("aadat", aadat);
    battaka.forEach((i) => {
      fd.append("battaka_taqniya[text]", i.text || "");
      if (i.file instanceof File) fd.append("battaka_file", i.file);
    });
    try {
      await axios.put(`${API}/api/journals/${journal._id}`, fd);
      onSaved();
      onClose();
    } catch (e) {
      setError(e.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">تعديل المجلة</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              اسم المجلة *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <SectionRows
            title="البطاقة التقنية"
            icon="📋"
            items={battaka}
            {...makeHandlers()}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              📰 الأعداد
            </label>
            <textarea
              rows={3}
              value={aadat}
              onChange={(e) => setAadat(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              dir="rtl"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
        <div className="flex gap-3 p-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 text-sm text-slate-600 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl py-2.5 font-semibold transition-colors"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// الصفحة الرئيسية
// ─────────────────────────────────────────────
export default function ManageLabsAndJrns() {
  const [labs, setLabs] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loadingLabs, setLoadingLabs] = useState(true);
  const [loadingJournals, setLoadingJournals] = useState(true);
  const [editLab, setEditLab] = useState(null);
  const [editJournal, setEditJournal] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchLabs = async () => {
    setLoadingLabs(true);
    try {
      const res = await axios.get(`${API}/api/laboratories`);
      setLabs(res.data.makhaber || []);
    } catch {
      setLabs([]);
    } finally {
      setLoadingLabs(false);
    }
  };

  const fetchJournals = async () => {
    setLoadingJournals(true);
    try {
      const res = await axios.get(`${API}/api/journals`);
      setJournals(res.data.majallat || []);
    } catch {
      setJournals([]);
    } finally {
      setLoadingJournals(false);
    }
  };

  useEffect(() => {
    fetchLabs();
    fetchJournals();
  }, []);

  const deleteLab = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المخبر؟")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API}/api/laboratories/${id}`);
      fetchLabs();
    } catch {
      alert("فشل الحذف");
    } finally {
      setDeletingId(null);
    }
  };

  const deleteJournal = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذه المجلة؟")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API}/api/journals/${id}`);
      fetchJournals();
    } catch {
      alert("فشل الحذف");
    } finally {
      setDeletingId(null);
    }
  };

  const LabCard = ({ lab }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔬</span>
          <h3 className="font-semibold text-slate-800 truncate">{lab.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {lab.taareef && (
            <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
              📝 تعريف
            </span>
          )}
          {lab.battaka_taqniya?.length > 0 && (
            <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-2.5 py-1">
              📋 {lab.battaka_taqniya.length} بطاقة تقنية
            </span>
          )}
          {lab.hassila?.length > 0 && (
            <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
              📊 {lab.hassila.length} حصيلة
            </span>
          )}
          {lab.nashatat?.length > 0 && (
            <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2.5 py-1">
              ⚡ {lab.nashatat.length} نشاط
            </span>
          )}
          {lab.mokawinat?.length > 0 && (
            <span className="text-xs bg-purple-50 text-purple-600 border border-purple-100 rounded-full px-2.5 py-1">
              🧩 {lab.mokawinat.length} مكون
            </span>
          )}
          {lab.firaq?.length > 0 && (
            <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-1">
              👥 {lab.firaq.length} فرقة
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => setEditLab(lab)}
          className="text-xs font-medium text-slate-600 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-3 py-2 rounded-xl transition-all"
        >
          تعديل
        </button>
        <button
          onClick={() => deleteLab(lab._id)}
          disabled={deletingId === lab._id}
          className="text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          {deletingId === lab._id ? "..." : "حذف"}
        </button>
      </div>
    </div>
  );

  const JournalCard = ({ journal }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📰</span>
          <h3 className="font-semibold text-slate-800 truncate">
            {journal.name}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {journal.battaka_taqniya?.length > 0 && (
            <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-1">
              📋 {journal.battaka_taqniya.length} بطاقة تقنية
            </span>
          )}
          {journal.aadat && (
            <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
              📄 الأعداد متاحة
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => setEditJournal(journal)}
          className="text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-2 rounded-xl transition-all"
        >
          تعديل
        </button>
        <button
          onClick={() => deleteJournal(journal._id)}
          disabled={deletingId === journal._id}
          className="text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          {deletingId === journal._id ? "..." : "حذف"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            إدارة المخابر والمجلات
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            عرض وتعديل وحذف المخابر البحثية والمجلات العلمية
          </p>
        </div>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔬</span>
            <h2 className="text-lg font-bold text-slate-700">المخابر</h2>
            {!loadingLabs && (
              <span className="text-xs bg-emerald-100 text-emerald-600 font-semibold rounded-full px-2.5 py-0.5">
                {labs.length}
              </span>
            )}
          </div>
          {loadingLabs ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              جارٍ التحميل...
            </div>
          ) : labs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              لا توجد مخابر مضافة بعد
            </div>
          ) : (
            <div className="space-y-3">
              {labs.map((lab) => (
                <LabCard key={lab._id} lab={lab} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📰</span>
            <h2 className="text-lg font-bold text-slate-700">المجلات</h2>
            {!loadingJournals && (
              <span className="text-xs bg-blue-100 text-blue-600 font-semibold rounded-full px-2.5 py-0.5">
                {journals.length}
              </span>
            )}
          </div>
          {loadingJournals ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              جارٍ التحميل...
            </div>
          ) : journals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              لا توجد مجلات مضافة بعد
            </div>
          ) : (
            <div className="space-y-3">
              {journals.map((j) => (
                <JournalCard key={j._id} journal={j} />
              ))}
            </div>
          )}
        </section>
      </div>

      {editLab && (
        <EditLabModal
          lab={editLab}
          onClose={() => setEditLab(null)}
          onSaved={fetchLabs}
        />
      )}
      {editJournal && (
        <EditJournalModal
          journal={editJournal}
          onClose={() => setEditJournal(null)}
          onSaved={fetchJournals}
        />
      )}
    </div>
  );
}

// /////////////
