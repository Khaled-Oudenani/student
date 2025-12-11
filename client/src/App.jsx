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
import ProtectedRoute from "./componentes/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-amiri " dir="rtl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route
          path="/admin/login"
          element={<Login onLoginSuccess={() => window.location.reload()} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage" element={<ManageStudents />} />
          <Route path="add" element={<AddStudent />} />
          <Route path="update-student/:id" element={<AddStudent />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
