// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4 text-blue-700">
//         مرحبًا بك في لوحة التحكم
//       </h1>
//       <p className="text-gray-700">
//         من هنا يمكنك إدارة معلومات الطلبة وإضافة أو تعديل بياناتهم.
//       </p>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students`
      );
      setStudentsCount(data.length);
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">
        مرحبًا بك في لوحة التحكم 👋
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-2">إحصائيات عامة</h2>
        <p>
          عدد الطلبة المسجلين:{" "}
          <span className="font-bold">{studentsCount}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
