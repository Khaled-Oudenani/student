import { createContext, useState } from "react";
// import man1 from "../assets/man1.jpg";
import axios from "axios";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  fetchStudents();
  const value = {
    students,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
