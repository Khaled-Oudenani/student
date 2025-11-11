import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center">لوحة التحكم</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">
            🏠 الرئيسية
          </Link>
          <Link to="/admin/manage" className="hover:bg-gray-700 p-2 rounded">
            👨‍🎓 إدارة الطلبة
          </Link>
          <Link to="/admin/add" className="hover:bg-gray-700 p-2 rounded">
            ➕ إضافة طالب
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-600 mt-6 w-full py-2 rounded hover:bg-red-700"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
