import React from "react";
import Navbar from "./componentes/Navbar.jsx";
import Footer from "./componentes/Footer.jsx";
import Home from "./pages/Home.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import Login from "./pages/admin/Login";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddStudent from "./pages/admin/AddStudent";
import ManageStudents from "./pages/admin/ManageStudents";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <div
      className="flex flex-col justify-between min-h-screen font-arabic"
      dir="rtl"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route
          path="/admin/login"
          element={<Login onLoginSuccess={() => window.location.reload()} />}
        />
        {isLoggedIn ? (
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage" element={<ManageStudents />} />
            <Route path="add" element={<AddStudent />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/admin/login" />} />
        )}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
