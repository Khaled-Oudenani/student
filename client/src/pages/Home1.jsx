// import React from "react";
// import { BookOpen, GraduationCap } from "lucide-react";
// import { Link } from "react-router-dom";
// // import backgroundImage from "../assets/bg-img.jpg";

// const Home1 = () => {
//   const backgroundImage = null; // استبدل بـ backgroundImage إذا كنت تريد استخدام صورة خلفية
//   return (
//     <div
//       className="relative flex flex-col justify-center items-center min-h-screen"
//       style={{
//         backgroundImage: backgroundImage
//           ? `url(${backgroundImage})`
//           : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* المحتوى */}
//   <div className="relative z-10 flex flex-col items-center gap-8 p-8">
//     {/* العنوان */}
//     <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 drop-shadow-2xl">
//       مرحباً بك
//     </h1>

//     {/* الأزرار */}
// <div className="flex flex-col md:flex-row gap-6">
//   {/* زر دليل الطلبة */}
//   <Link to="/Student">
//     <button className="group relative flex items-center gap-4 px-8 py-5 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
//       <div className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors">
//         <GraduationCap className="w-8 h-8 text-white" />
//       </div>
//       <div className="text-right">
//         <div className="text-2xl font-bold">دليل الطلبة</div>
//         <div className="text-sm text-gray-600">Student Guide</div>
//       </div>
//     </button>
//   </Link>

//   {/* زر دليل الأساتذة */}
//   <button className="group relative flex items-center gap-4 px-8 py-5 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
//     <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors">
//       <BookOpen className="w-8 h-8 text-white" />
//     </div>
//     <div className="text-right">
//       <div className="text-2xl font-bold">دليل الأساتذة</div>
//       <div className="text-sm text-gray-600">Teacher Guide</div>
//     </div>
//   </button>
// </div>
//   </div>
//     </div>
//   );
// };

// export default Home1;

// import React from "react";
// import backgroundImage from "../assets/bg-img.jpg";

// const Home1 = () => {
//   return (
//     <div
//       className="relative flex flex-col justify-center items-center min-h-screen"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         backgroundSize: "contain", // 🔴 الأهم
//       }}
//     >
//       <div className="relative z-10 flex flex-col items-center gap-8 p-8 bg-white bg-opacity-70 rounded-lg shadow-lg">
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-8 drop-shadow-2xl">
//           مرحباً بك في موقعنا
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl">
//           هذا هو الصفحة الرئيسية لموقعنا. استكشف المحتوى وتعرف على المزيد عنا.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home1;
import React from "react";
import backgroundImage from "../assets/image1.jpg";
import { BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Home1 = () => {
  return (
    <div className="relative w-screen h-[calc(100vh-3rem)]">
      {/* الصورة */}
      <img src={backgroundImage} alt="background" className="w-screen h-full" />
      {/* <div className="absolute inset-0 bg-black/50"></div> */}
      <div className="absolute inset-0 flex justify-center items-start">
        <div className="z-10 flex flex-col items-center gap-4 p-8 bg-gray-900/70 bg-opacity-70 rounded-lg shadow-lg">
          {/* <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
            مرحباً بك
          </h1> */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* زر دليل الطلبة */}
            <Link to="/Student">
              <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">دليل الطلبة</div>
                  <div className="text-sm text-gray-600">Student Guide</div>
                </div>
              </button>
            </Link>

            {/* زر دليل الأساتذة */}
            <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
              <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">دليل الأساتذة</div>
                <div className="text-sm text-gray-600">Teacher Guide</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;
