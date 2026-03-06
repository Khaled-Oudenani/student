import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  // ── مكوّن عرض عناصر المصفوفة ──
  const FieldItems = ({ items, color }) => {
    if (!items?.length)
      return <span className="text-slate-400 text-xs">—</span>;
    return (
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`text-xs rounded-lg px-3 py-2 border ${color}`}
          >
            {item.text && <p className="text-slate-700">{item.text}</p>}
            {item.file && (
              <a
                href={item.file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1 mt-1"
              >
                <span>📎</span> عرض الملف
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            المخابر والمجلات العلمية
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            اختر قسماً لعرض البيانات
          </p>
        </div>

        {/* أزرار التبديل */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("labs")}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
              ${
                activeTab === "labs"
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200 shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
              }`}
          >
            <span className="text-2xl">🔬</span>
            <span>مخابر البحث</span>
            {labs.length > 0 && activeTab === "labs" && (
              <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {labs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("journals")}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
              ${
                activeTab === "journals"
                  ? "bg-blue-600 border-blue-600 text-white shadow-blue-200 shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
          >
            <span className="text-2xl">📰</span>
            <span>المجلات العلمية</span>
            {journals.length > 0 && activeTab === "journals" && (
              <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {journals.length}
              </span>
            )}
          </button>
        </div>

        {/* المحتوى */}
        {loading && (
          <div className="text-center py-16 text-slate-400 text-sm">
            جارٍ التحميل...
          </div>
        )}

        {/* ── جدول المخابر ── */}
        {!loading && activeTab === "labs" && (
          <div>
            {labs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                لا توجد مخابر مضافة بعد
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* رأس الجدول */}
                <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <div>اسم المخبر</div>
                  <div>البطاقة التقنية</div>
                  <div>الحصيلة</div>
                  <div>النشاطات</div>
                </div>

                {/* صفوف البيانات */}
                {labs.map((lab, idx) => (
                  <div key={lab._id}>
                    <div
                      className={`grid grid-cols-4 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
                        ${idx !== labs.length - 1 ? "border-b border-slate-100" : ""}
                        ${expandedId === lab._id ? "bg-emerald-50/40" : ""}
                      `}
                      onClick={() => toggleExpand(lab._id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🔬</span>
                        <span className="font-semibold text-slate-800 text-sm">
                          {lab.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-2.5 py-1">
                          {lab.battaka_taqniya?.length || 0} عنصر
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
                          {lab.hassila?.length || 0} عنصر
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2.5 py-1">
                          {lab.nashatat?.length || 0} عنصر
                        </span>
                        <span className="text-slate-400 text-xs">
                          {expandedId === lab._id ? "▲" : "▼"}
                        </span>
                      </div>
                    </div>

                    {/* تفاصيل موسّعة */}
                    {expandedId === lab._id && (
                      <div className="grid grid-cols-3 gap-4 px-5 py-4 bg-slate-50 border-t border-slate-100">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">
                            📋 البطاقة التقنية
                          </p>
                          <FieldItems
                            items={lab.battaka_taqniya}
                            color="bg-emerald-50 border-emerald-100"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">
                            📊 الحصيلة
                          </p>
                          <FieldItems
                            items={lab.hassila}
                            color="bg-slate-50 border-slate-200"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">
                            ⚡ النشاطات
                          </p>
                          <FieldItems
                            items={lab.nashatat}
                            color="bg-amber-50 border-amber-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── جدول المجلات ── */}
        {!loading && activeTab === "journals" && (
          <div>
            {journals.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                لا توجد مجلات مضافة بعد
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* رأس الجدول */}
                <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <div>اسم المجلة</div>
                  <div>البطاقة التقنية</div>
                  <div>الأعداد</div>
                </div>

                {/* صفوف البيانات */}
                {journals.map((journal, idx) => (
                  <div key={journal._id}>
                    <div
                      className={`grid grid-cols-3 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
                        ${idx !== journals.length - 1 ? "border-b border-slate-100" : ""}
                        ${expandedId === journal._id ? "bg-blue-50/40" : ""}
                      `}
                      onClick={() => toggleExpand(journal._id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">📰</span>
                        <span className="font-semibold text-slate-800 text-sm">
                          {journal.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-1">
                          {journal.battaka_taqniya?.length || 0} عنصر
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded-full px-2.5 py-1">
                          {journal.aadat ? "متاح" : "—"}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {expandedId === journal._id ? "▲" : "▼"}
                        </span>
                      </div>
                    </div>

                    {/* تفاصيل موسّعة */}
                    {expandedId === journal._id && (
                      <div className="grid grid-cols-2 gap-4 px-5 py-4 bg-slate-50 border-t border-slate-100">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">
                            📋 البطاقة التقنية
                          </p>
                          <FieldItems
                            items={journal.battaka_taqniya}
                            color="bg-blue-50 border-blue-100"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">
                            📰 الأعداد
                          </p>
                          {journal.aadat ? (
                            <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">
                              {journal.aadat}
                            </p>
                          ) : (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* حالة البداية */}
        {!activeTab && (
          <div className="text-center py-16 text-slate-400 text-sm">
            اضغط على أحد الأزرار لعرض البيانات
          </div>
        )}
      </div>
    </div>
  );
}

// ///////////////////////////////////////////////////
