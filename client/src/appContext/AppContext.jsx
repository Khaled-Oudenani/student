// import { createContext, useState } from "react";
// // import man1 from "../assets/man1.jpg";
// import axios from "axios";
// export const AppContext = createContext(null);

// export const AppProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/students`,
//       );
//       setStudents(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/teachers`,
//       );
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   fetchStudents();
//   fetchTeachers();
//   const value = {
//     students,
//     teachers,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppProvider;

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students`,
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers`,
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const value = {
    students,
    teachers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
