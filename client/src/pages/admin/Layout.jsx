// import React from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";

// const Layout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
//         <h2 className="text-2xl font-bold mb-6 text-center">لوحة التحكم</h2>
//         <nav className="flex flex-col gap-2">
//           <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">
//             🏠 الرئيسية
//           </Link>
//           <Link to="/admin/manage" className="hover:bg-gray-700 p-2 rounded">
//             👨‍🎓 إدارة الطلبة
//           </Link>
//           <Link to="/admin/add" className="hover:bg-gray-700 p-2 rounded">
//             ➕ إضافة طالب
//           </Link>
//         </nav>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 mt-6 w-full py-2 rounded hover:bg-red-700"
//         >
//           تسجيل الخروج
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // أيقونات جميلة من lucide-react (اختياري)

const Layout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

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
          {/* زر الإغلاق للشاشات الصغيرة */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-700 p-2 rounded"
          >
            🏠 الرئيسية
          </Link>
          <Link
            to="/admin/manage"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-700 p-2 rounded"
          >
            👨‍🎓 إدارة الطلبة
          </Link>
          <Link
            to="/admin/manage-teachers"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-700 p-2 rounded"
          >
            👩‍🏫 إدارة الأساتذة
          </Link>
          <Link
            to="/admin/add"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-700 p-2 rounded"
          >
            ➕ إضافة طالب
          </Link>
          <Link
            to="/admin/add-teacher"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-700 p-2 rounded"
          >
            ➕ إضافة أستاذ
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-600 mt-6 w-full py-2 rounded hover:bg-red-700"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Overlay للشاشات الصغيرة */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 w-full">
        {/* Top bar for small screens */}
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
