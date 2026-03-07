// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const Layout = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   const navLinks = [
//     { to: "/admin/dashboard", icon: "🏠", label: "الرئيسية" },
//     { to: "/admin/manage", icon: "👨‍🎓", label: "إدارة الطلبة" },
//     { to: "/admin/manage-teachers", icon: "👩‍🏫", label: "إدارة الأساتذة" },
//     { to: "/admin/add", icon: "➕", label: "إضافة طالب" },
//     { to: "/admin/add-teacher", icon: "➕", label: "إضافة أستاذ" },
//     { to: "/admin/add-laboratory", icon: "🔬", label: "إضافة مخبر" },
//     { to: "/admin/add-journal", icon: "📰", label: "إضافة مجلة" },
//     {
//       to: "/admin/manage-labs-jrns",
//       icon: "📁",
//       label: "إدارة المخابر والمجلات",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed z-50 top-0 left-0 h-full bg-gray-800 text-white p-4 w-64 transform
//         ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         transition-transform duration-300 ease-in-out
//         md:relative md:translate-x-0`}
//       >
//         <div className="flex items-center justify-between md:block">
//           <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
//             لوحة التحكم
//           </h2>
//           <button
//             className="md:hidden text-white text-2xl"
//             onClick={() => setIsOpen(false)}
//           >
//             <X size={28} />
//           </button>
//         </div>

//         <nav className="flex flex-col gap-1 mt-4">
//           {/* -- الطلبة والأساتذة -- */}
//           <p className="text-xs text-gray-400 uppercase tracking-widest px-2 mt-2 mb-1">
//             الأعضاء
//           </p>
//           {navLinks.slice(0, 5).map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               onClick={() => setIsOpen(false)}
//               className="hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
//             >
//               <span>{link.icon}</span>
//               <span>{link.label}</span>
//             </Link>
//           ))}

//           {/* -- المخابر والمجلات -- */}
//           <p className="text-xs text-gray-400 uppercase tracking-widest px-2 mt-4 mb-1">
//             البحث العلمي
//           </p>
//           {navLinks.slice(5).map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               onClick={() => setIsOpen(false)}
//               className="hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
//             >
//               <span>{link.icon}</span>
//               <span>{link.label}</span>
//             </Link>
//           ))}
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="bg-red-600 mt-6 w-full py-2 rounded-lg hover:bg-red-700 text-sm font-semibold transition-colors"
//         >
//           تسجيل الخروج
//         </button>
//       </div>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col p-6 w-full">
//         <div className="md:hidden flex items-center justify-between mb-4">
//           <button onClick={() => setIsOpen(true)} className="text-gray-700">
//             <Menu size={28} />
//           </button>
//           <h1 className="text-xl font-bold">لوحة التحكم</h1>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navLinks = [
    { to: "/admin/dashboard", icon: "🏠", label: "الرئيسية" },
    { to: "/admin/manage", icon: "👨‍🎓", label: "إدارة الطلبة" },
    { to: "/admin/manage-teachers", icon: "👩‍🏫", label: "إدارة الأساتذة" },
    { to: "/admin/add", icon: "➕", label: "إضافة طالب" },
    { to: "/admin/add-teacher", icon: "➕", label: "إضافة أستاذ" },
  ];

  const researchLinks = [
    { to: "/admin/add-laboratory", icon: "🔬", label: "إضافة مخبر" },
    { to: "/admin/add-journal", icon: "📰", label: "إضافة مجلة" },
    {
      to: "/admin/manage-labs-jrns",
      icon: "📁",
      label: "إدارة المخابر والمجلات",
    },
    { to: "/admin/add-sientmani", icon: "🧪", label: "إضافة تظاهرات علمية" },
    {
      to: "/admin/manage-sientmani",
      icon: "🗂️",
      label: "إدارة التظاهرات العلمية",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full bg-gray-800 text-white p-4 w-64 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out 
        md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between md:block">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            لوحة التحكم
          </h2>
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 mt-4">
          {/* -- الأعضاء -- */}
          <p className="text-xs text-gray-400 uppercase tracking-widest px-2 mt-2 mb-1">
            الأعضاء
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* -- البحث العلمي -- */}
          <p className="text-xs text-gray-400 uppercase tracking-widest px-2 mt-4 mb-1">
            البحث العلمي
          </p>
          {researchLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-600 mt-6 w-full py-2 rounded-lg hover:bg-red-700 text-sm font-semibold transition-colors"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 w-full">
        <div className="md:hidden flex items-center justify-between mb-4">
          <button onClick={() => setIsOpen(true)} className="text-gray-700">
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-bold">لوحة التحكم</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
