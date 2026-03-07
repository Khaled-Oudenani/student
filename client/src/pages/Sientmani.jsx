import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const TABS = [
  {
    key: "ayyam",
    label: "الأيام الدراسية والتكوينية",
    icon: "📚",
    color: {
      active:
        "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200 shadow-md",
      hover: "hover:border-emerald-300 hover:text-emerald-600",
      badge: "bg-emerald-50 border-emerald-100 text-emerald-600",
      expanded: "bg-emerald-50/40",
      field: "bg-emerald-50 border-emerald-100",
      header: "bg-emerald-600",
    },
    sections: [
      {
        key: "ayyamDirasiyaWaTakwiniya",
        label: "الأيام الدراسية والتكوينية",
        icon: "📚",
      },
    ],
  },
  {
    key: "nadawat",
    label: "الندوات",
    icon: "🏛️",
    color: {
      active:
        "bg-blue-600 border-blue-600 text-white shadow-blue-200 shadow-md",
      hover: "hover:border-blue-300 hover:text-blue-600",
      badge: "bg-blue-50 border-blue-100 text-blue-600",
      expanded: "bg-blue-50/40",
      field: "bg-blue-50 border-blue-100",
      header: "bg-blue-600",
    },
    sections: [
      { key: "nadawatWataniya", label: "الندوات الوطنية", icon: "🏛️" },
      { key: "nadawatDawliya", label: "الندوات الدولية", icon: "🌐" },
    ],
  },
  {
    key: "multaqayat",
    label: "الملتقيات",
    icon: "🤝",
    color: {
      active:
        "bg-violet-600 border-violet-600 text-white shadow-violet-200 shadow-md",
      hover: "hover:border-violet-300 hover:text-violet-600",
      badge: "bg-violet-50 border-violet-100 text-violet-600",
      expanded: "bg-violet-50/40",
      field: "bg-violet-50 border-violet-100",
      header: "bg-violet-600",
    },
    sections: [
      { key: "multaqayatWataniya", label: "الملتقيات الوطنية", icon: "🤝" },
      { key: "multaqayatDawliya", label: "الملتقيات الدولية", icon: "🌍" },
    ],
  },
];

const FieldItems = ({ items, color }) => {
  if (!items?.length) return <span className="text-slate-400 text-xs">—</span>;
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

export default function Sientmani() {
  const [activeTab, setActiveTab] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    if (!activeTab) return;
    const fetchData = async () => {
      setLoading(true);
      setExpandedSection(null);
      try {
        const res = await axios.get(`${API}/api/scientmani`);
        setData(res.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const toggleSection = (key) =>
    setExpandedSection((prev) => (prev === key ? null : key));

  const currentTab = TABS.find((t) => t.key === activeTab);

  // حساب عدد العناصر الكلي للتاب
  const countItems = (tab) => {
    if (!data) return 0;
    return tab.sections.reduce((acc, s) => acc + (data[s.key]?.length || 0), 0);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            التظاهرات العلمية
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            اختر قسماً لعرض البيانات
          </p>
        </div>

        {/* أزرار التبديل */}
        <div className="flex gap-4 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl border-2 font-semibold text-sm transition-all shadow-sm
                ${
                  activeTab === tab.key
                    ? tab.color.active
                    : `bg-white border-slate-200 text-slate-600 ${tab.color.hover}`
                }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span>{tab.label}</span>
              {data && activeTab === tab.key && (
                <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {countItems(tab)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* المحتوى */}
        {loading && (
          <div className="text-center py-16 text-slate-400 text-sm">
            جارٍ التحميل...
          </div>
        )}

        {!loading && activeTab && currentTab && data && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* رأس الجدول */}
            <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <div>القسم</div>
              <div>عدد العناصر</div>
              <div>التفاصيل</div>
            </div>

            {/* صفوف الأقسام */}
            {currentTab.sections.map((section, idx) => {
              const entries = data[section.key] || [];
              const isExpanded = expandedSection === section.key;

              return (
                <div key={section.key}>
                  <div
                    className={`grid grid-cols-3 gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50
                      ${idx !== currentTab.sections.length - 1 || isExpanded ? "border-b border-slate-100" : ""}
                      ${isExpanded ? currentTab.color.expanded : ""}
                    `}
                    onClick={() => toggleSection(section.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{section.icon}</span>
                      <span className="font-semibold text-slate-800 text-sm">
                        {section.label}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-xs border rounded-full px-2.5 py-1 ${currentTab.color.badge}`}
                      >
                        {entries.length} عنصر
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {entries.length > 0 ? "اضغط للعرض" : "لا توجد بيانات"}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>

                  {/* تفاصيل موسّعة */}
                  {isExpanded && (
                    <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
                      {entries.length === 0 ? (
                        <p className="text-slate-400 text-xs text-center py-4">
                          لا توجد إدخالات في هذا القسم
                        </p>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-slate-500 mb-3">
                            {section.icon} {section.label}
                          </p>
                          <FieldItems
                            items={entries}
                            color={currentTab.color.field}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
