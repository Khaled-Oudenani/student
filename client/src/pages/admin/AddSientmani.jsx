import { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/scientmani`;

const emptyItem = () => ({ text: "", file: null });

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

export default function AddSientmani() {
  const [sections, setSections] = useState(() => {
    const init = {};
    SECTIONS.forEach((s) => {
      init[s.key] = [emptyItem()];
    });
    return init;
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const makeHandlers = (key) => ({
    onAdd: () =>
      setSections((p) => ({ ...p, [key]: [...p[key], emptyItem()] })),
    onRemove: (idx) =>
      setSections((p) => ({ ...p, [key]: p[key].filter((_, i) => i !== idx) })),
    onTextChange: (idx, val) =>
      setSections((p) => ({
        ...p,
        [key]: p[key].map((item, i) =>
          i === idx ? { ...item, text: val } : item,
        ),
      })),
    onFileChange: (idx, file) =>
      setSections((p) => ({
        ...p,
        [key]: p[key].map((item, i) => (i === idx ? { ...item, file } : item)),
      })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      for (const section of SECTIONS) {
        const items = sections[section.key];
        for (const item of items) {
          if (!item.text && !item.file) continue;
          const fd = new FormData();
          if (item.text) fd.append("text", item.text);
          if (item.file) fd.append("scientmani_file", item.file);
          await axios.post(`${API_URL}/${section.key}`, fd);
        }
      }

      setSuccess(true);
      const reset = {};
      SECTIONS.forEach((s) => {
        reset[s.key] = [emptyItem()];
      });
      setSections(reset);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            إضافة تظاهرات علمية
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            أدخل بيانات التظاهرات العلمية
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {SECTIONS.map((section) => (
            <Section
              key={section.key}
              title={section.title}
              icon={section.icon}
              items={sections[section.key]}
              {...makeHandlers(section.key)}
            />
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm rounded-xl px-4 py-3">
              ✅ تم حفظ التظاهرات العلمية بنجاح!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ التظاهرات العلمية"}
          </button>
        </form>
      </div>
    </div>
  );
}
