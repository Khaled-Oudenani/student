// import React from "react";
// import backgroundImage from "../assets/image1.jpg";
// import { BookOpen, GraduationCap } from "lucide-react";
// import { Link } from "react-router-dom";

// const Home1 = () => {
//   return (
//     <div className="relative w-screen h-[calc(100vh-3rem)]">
//       {/* الصورة */}
//       <img src={backgroundImage} alt="background" className="w-screen h-full" />
//       {/* <div className="absolute inset-0 bg-black/50"></div> */}
//       <div className="absolute inset-0 flex justify-center items-start">
//         <div className="z-10 flex flex-col items-center gap-4 p-8 bg-gray-900/70 bg-opacity-70 rounded-lg shadow-lg">
//           {/* <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
//             مرحباً بك
//           </h1> */}
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* زر دليل الطلبة */}
//             <Link to="/Student">
//               <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
//                 <div className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors">
//                   <GraduationCap className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-right">
//                   <div className="text-2xl font-bold">دليل الطلبة</div>
//                   <div className="text-sm text-gray-600">Student Guide</div>
//                 </div>
//               </button>
//             </Link>

//             {/* زر دليل الأساتذة */}
//             <Link to="/Teacher">
//               <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
//                 <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors">
//                   <BookOpen className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-right">
//                   <div className="text-2xl font-bold">دليل الأساتذة</div>
//                   <div className="text-sm text-gray-600">Teacher Guide</div>
//                 </div>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home1;
import React from "react";
import backgroundImage from "../assets/image1.jpg";
import { BookOpen, GraduationCap, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const Home1 = () => {
  return (
    <div className="relative w-screen h-[calc(100vh-3rem)]">
      {/* الصورة */}
      <img src={backgroundImage} alt="background" className="w-screen h-full" />

      <div className="absolute inset-0 flex justify-center items-start">
        <div className="z-10 flex flex-col items-center gap-4 p-8 bg-gray-900/70 rounded-lg shadow-lg">
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
            <Link to="/Teacher">
              <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">دليل الأساتذة</div>
                  <div className="text-sm text-gray-600">Teacher Guide</div>
                </div>
              </button>
            </Link>

            {/* زر مخابر البحث و المجلات العلمية */}
            <Link to="/labs-jrns">
              <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
                <div className="flex items-center justify-center w-14 h-14 bg-purple-500 rounded-full group-hover:bg-purple-600 transition-colors">
                  <FlaskConical className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">مخابر البحث</div>
                  <div className="text-sm text-gray-600">
                    Research Labs & Journals
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;
