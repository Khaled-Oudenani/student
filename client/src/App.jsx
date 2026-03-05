import React from "react";
import Navbar from "./componentes/Navbar.jsx";
import Footer from "./componentes/Footer.jsx";
import Home1 from "./pages/Home1.jsx";
import Home from "./pages/Home.jsx";
import Teacher from "./pages/Teacher.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import TeacherDetails from "./pages/TeacherDetails.jsx";
import Login from "./pages/admin/Login";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddStudent from "./pages/admin/AddStudent";
import ManageStudents from "./pages/admin/ManageStudents";
import AddTeacher from "./pages/admin/AddTeacher";
import ManageTeachers from "./pages/admin/ManageTeachers";
import AddLaboratory from "./pages/admin/AddLaboratory";
import AddJournal from "./pages/admin/AddJournal";
import ManageLabsAndJrns from "./pages/admin/ManageLabs&Jrns";

import ProtectedRoute from "./componentes/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-amiri max-w-full" dir="rtl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/student" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/teacher/:id" element={<TeacherDetails />} />

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
          <Route path="manage-teachers" element={<ManageTeachers />} />
          <Route path="manage-labs-jrns" element={<ManageLabsAndJrns />} />
          <Route path="add" element={<AddStudent />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="add-laboratory" element={<AddLaboratory />} />
          <Route path="add-journal" element={<AddJournal />} />
          <Route path="update-student/:id" element={<AddStudent />} />
          <Route path="update-teacher/:id" element={<AddTeacher />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
