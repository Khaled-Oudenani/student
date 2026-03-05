import { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/journals`;

const emptyItem = () => ({ text: "", file: null });

export default function AddJournal() {
  const [name, setName] = useState("");
  const [battaka, setBattaka] = useState([emptyItem()]);
  const [aadat, setAadat] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ── helpers ────────────────────────────────────────────────
  const addItem = () => setBattaka((prev) => [...prev, emptyItem()]);
  const removeItem = (idx) =>
    setBattaka((prev) => prev.filter((_, i) => i !== idx));
  const updateText = (idx, val) =>
    setBattaka((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, text: val } : item)),
    );
  const updateFile = (idx, file) =>
    setBattaka((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, file } : item)),
    );

  // ── submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("اسم المجلة مطلوب");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("aadat", aadat);

    battaka.forEach((item) => {
      formData.append("battaka_taqniya[text]", item.text || "");
      if (item.file) formData.append("battaka_file", item.file);
    });

    try {
      await axios.post(API_URL, formData);
      setSuccess(true);
      setName("");
      setBattaka([emptyItem()]);
      setAadat("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };

  // ── render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            إضافة مجلة جديدة
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            أدخل بيانات المجلة العلمية
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* اسم المجلة */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              اسم المجلة <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: مجلة العلوم التطبيقية"
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-300"
            />
          </div>

          {/* البطاقة التقنية */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                <h3 className="font-semibold text-slate-700 text-sm">
                  البطاقة التقنية
                </h3>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>+</span> إضافة
              </button>
            </div>

            <div className="p-5 space-y-4">
              {battaka.map((item, idx) => (
                <div
                  key={idx}
                  className="relative bg-slate-50 rounded-xl p-4 border border-slate-100"
                >
                  {battaka.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
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
                        onChange={(e) => updateText(idx, e.target.value)}
                        placeholder="أدخل النص هنا..."
                        className="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-300"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        الملف <span className="text-slate-300">(اختياري)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer w-fit">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-300 px-3 py-2 rounded-lg transition-all">
                          <span>📎</span>
                          <span>
                            {item.file ? item.file.name : "اختر ملفاً"}
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => updateFile(idx, e.target.files[0])}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xls,.xlsx,.ppt,.pptx"
                        />
                      </label>
                      {item.file && (
                        <p className="mt-1 text-xs text-blue-600 truncate max-w-xs">
                          ✓ {item.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الأعداد */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📰</span>
              <label className="text-sm font-semibold text-slate-700">
                الأعداد
              </label>
            </div>
            <textarea
              rows={4}
              value={aadat}
              onChange={(e) => setAadat(e.target.value)}
              placeholder="مثال: العدد الأول - 2024، العدد الثاني - 2024..."
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-300"
              dir="rtl"
            />
          </div>

          {/* رسائل */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="bg-blue-50 border border-blue-200 text-blue-600 text-sm rounded-xl px-4 py-3">
              ✅ تم إضافة المجلة بنجاح!
            </div>
          )}

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ المجلة"}
          </button>
        </form>
      </div>
    </div>
  );
}
