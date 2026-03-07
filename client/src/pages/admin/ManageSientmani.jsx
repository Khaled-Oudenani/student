import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const SECTIONS = [
  {
    key: "ayyamDirasiyaWaTakwiniya",
    title: "الأيام الدراسية والتكوينية",
    icon: "📚",
  },
  { key: "nadawatWataniya", title: "الندوات الوطنية", icon: "🏛️" },
  { key: "nadawatDawliya", title: "الندوات الدولية", icon: "🌐" },
  { key: "multaqayatWataniya", title: "الملتقيات الوطنية", icon: "🤝" },
  { key: "multaqayatDawliya", title: "الملتقيات الدولية", icon: "🌍" },
];

// ─────────────────────────────────────────────
// Modal تعديل entry
// ─────────────────────────────────────────────
function EditEntryModal({ sectionKey, index, entry, onClose, onSaved }) {
  const [text, setText] = useState(entry.text || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      // حذف القديم وإضافة جديد
      await axios.delete(`${API}/api/scientmani/${sectionKey}/${index}`);
      const fd = new FormData();
      if (text) fd.append("text", text);
      if (file) fd.append("scientmani_file", file);
      await axios.post(`${API}/api/scientmani/${sectionKey}`, fd);
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">تعديل الإدخال</h2>
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
              النص
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="أدخل النص هنا..."
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              الملف{" "}
              <span className="text-slate-400 font-normal">
                (اتركه فارغاً للإبقاء على الملف الحالي)
              </span>
            </label>
            {entry.file && !file && (
              <a
                href={entry.file}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-blue-500 hover:underline mb-2"
              >
                📎 الملف الحالي
              </a>
            )}
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 px-3 py-2 rounded-lg transition-all">
                <span>📎</span>
                <span>{file ? file.name : "اختر ملفاً جديداً"}</span>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xls,.xlsx,.ppt,.pptx"
              />
            </label>
            {file && (
              <p className="mt-1 text-xs text-emerald-600">✓ {file.name}</p>
            )}
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
// الصفحة الرئيسية
// ─────────────────────────────────────────────
export default function ManageSientmani() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingKey, setDeletingKey] = useState(null);
  const [editTarget, setEditTarget] = useState(null); // { sectionKey, index, entry }

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/scientmani`);
      setData(res.data);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (sectionKey, index) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإدخال؟")) return;
    setDeletingKey(`${sectionKey}-${index}`);
    try {
      await axios.delete(`${API}/api/scientmani/${sectionKey}/${index}`);
      fetchData();
    } catch {
      alert("فشل الحذف");
    } finally {
      setDeletingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            إدارة التظاهرات العلمية
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            عرض وتعديل وحذف التظاهرات العلمية
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            جارٍ التحميل...
          </div>
        ) : !data ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
            لا توجد بيانات بعد
          </div>
        ) : (
          SECTIONS.map((section) => {
            const entries = data[section.key] || [];
            return (
              <section key={section.key}>
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="text-lg font-bold text-slate-700">
                    {section.title}
                  </h2>
                  <span className="text-xs bg-emerald-100 text-emerald-600 font-semibold rounded-full px-2.5 py-0.5">
                    {entries.length}
                  </span>
                </div>

                {entries.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                    لا توجد إدخالات
                  </div>
                ) : (
                  <div className="space-y-3">
                    {entries.map((entry, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-start justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0 space-y-2">
                          {entry.text && (
                            <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                              {entry.text}
                            </p>
                          )}
                          {entry.file && (
                            <a
                              href={entry.file}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 hover:underline"
                            >
                              📎 عرض الملف
                            </a>
                          )}
                          {!entry.text && !entry.file && (
                            <span className="text-xs text-slate-400">
                              إدخال فارغ
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() =>
                              setEditTarget({
                                sectionKey: section.key,
                                index: idx,
                                entry,
                              })
                            }
                            className="text-xs font-medium text-slate-600 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-3 py-2 rounded-xl transition-all"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(section.key, idx)}
                            disabled={deletingKey === `${section.key}-${idx}`}
                            className="text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition-all disabled:opacity-50"
                          >
                            {deletingKey === `${section.key}-${idx}`
                              ? "..."
                              : "حذف"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      {/* Modal */}
      {editTarget && (
        <EditEntryModal
          sectionKey={editTarget.sectionKey}
          index={editTarget.index}
          entry={editTarget.entry}
          onClose={() => setEditTarget(null)}
          onSaved={fetchData}
        />
      )}
    </div>
  );
}
