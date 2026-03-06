// import React from "react";
// import backgroundImage from "../assets/image1.jpg";
// import { BookOpen, GraduationCap, FlaskConical } from "lucide-react";
// import { Link } from "react-router-dom";

// const Home1 = () => {
//   return (
//     <div className="relative w-screen h-[calc(100vh-3rem)]">
//       {/* الصورة */}
//       <img src={backgroundImage} alt="background" className="w-screen h-full" />

//       <div className="absolute inset-0 flex justify-center items-start">
//         <div className="z-10 flex flex-col items-center gap-4 p-8 bg-gray-900/70 rounded-lg shadow-lg">
//           <div className="flex flex-col md:flex-row gap-4">
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

//             <Link to="/labs-jrns">
//               <button className="group relative flex items-center gap-4 px-8 py-2 cursor-pointer bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-w-[250px]">
//                 <div className="flex items-center justify-center w-14 h-14 bg-purple-500 rounded-full group-hover:bg-purple-600 transition-colors">
//                   <FlaskConical className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-right">
//                   <div className="text-2xl font-bold">مخابر البحث</div>
//                   <div className="text-sm text-gray-600">
//                     Research Labs & Journals
//                   </div>
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

const cards = [
  {
    to: "/Student",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600",
    glow: "group-hover:shadow-blue-500/30",
    border: "hover:border-blue-300",
    label: "دليل الطلبة",
    sub: "Student Guide",
    bg: "group-hover:bg-blue-50",
  },
  {
    to: "/Teacher",
    icon: BookOpen,
    color: "from-emerald-500 to-emerald-600",
    glow: "group-hover:shadow-emerald-500/30",
    border: "hover:border-emerald-300",
    label: "دليل الأساتذة",
    sub: "Teacher Guide",
    bg: "group-hover:bg-emerald-50",
  },
  {
    to: "/labs-jrns",
    icon: FlaskConical,
    color: "from-purple-500 to-purple-600",
    glow: "group-hover:shadow-purple-500/30",
    border: "hover:border-purple-300",
    label: "مخابر البحث",
    sub: "Research Labs & Journals",
    bg: "group-hover:bg-purple-50",
  },
];

const Home1 = () => {
  return (
    <div className="relative w-screen h-auto overflow-hidden" dir="rtl">
      {/* Background */}
      {/* <img
        src={backgroundImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      /> */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-black/30 to-red-700/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
        {/* Title */}
        <div className="mb-12">
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-3">
            مرحباً بكم في
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
            البوابة الأكاديمية
          </h1>
          <div className="mt-4 w-20 h-1 bg-white/30 rounded-full mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl">
          {cards.map(
            ({ to, icon: Icon, color, glow, border, label, sub, bg }) => (
              <Link to={to} key={to} className="group">
                <div
                  className={`
                relative flex flex-col items-center gap-4 px-6 py-8
                bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50
                shadow-xl transition-all duration-300 cursor-pointer
                hover:scale-105 hover:shadow-2xl ${glow} ${border} ${bg}
              `}
                >
                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{label}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {sub}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-400 text-xs">
                    ←
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-white/40 text-xs tracking-wide">
          اختر القسم المناسب للمتابعة
        </p>
      </div>
    </div>
  );
};

export default Home1;

// ////////////v3

// import React from "react";
// import backgroundImage from "../assets/image1.jpg";
// import { BookOpen, GraduationCap, FlaskConical } from "lucide-react";
// import { Link } from "react-router-dom";

// const Home1 = () => {
//   return (
//     <div
//       className="min-h-[calc(100vh-3rem)] w-full bg-cover bg-center relative flex items-center justify-center"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* overlay */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

//       <div className="relative z-10 w-full max-w-6xl px-4 py-10 text-center">
//         {/* title */}
//         <h1 className="text-white text-2xl md:text-4xl font-bold mb-10">
//           بوابة الكلية
//         </h1>

//         {/* buttons grid */}
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {/* Student */}
//           <Link to="/Student">
//             <div className="group flex items-center gap-4 p-5 bg-white/90 hover:bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
//               <div className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full group-hover:bg-blue-600 transition">
//                 <GraduationCap className="w-7 h-7 text-white" />
//               </div>

//               <div className="text-right">
//                 <p className="text-lg md:text-xl font-bold text-gray-800">
//                   دليل الطلبة
//                 </p>
//                 <p className="text-sm text-gray-600">Student Guide</p>
//               </div>
//             </div>
//           </Link>

//           {/* Teacher */}
//           <Link to="/Teacher">
//             <div className="group flex items-center gap-4 p-5 bg-white/90 hover:bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
//               <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full group-hover:bg-green-600 transition">
//                 <BookOpen className="w-7 h-7 text-white" />
//               </div>

//               <div className="text-right">
//                 <p className="text-lg md:text-xl font-bold text-gray-800">
//                   دليل الأساتذة
//                 </p>
//                 <p className="text-sm text-gray-600">Teacher Guide</p>
//               </div>
//             </div>
//           </Link>

//           {/* Labs */}
//           <Link to="/labs-jrns">
//             <div className="group flex items-center gap-4 p-5 bg-white/90 hover:bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
//               <div className="flex items-center justify-center w-14 h-14 bg-purple-500 rounded-full group-hover:bg-purple-600 transition">
//                 <FlaskConical className="w-7 h-7 text-white" />
//               </div>

//               <div className="text-right">
//                 <p className="text-lg md:text-xl font-bold text-gray-800">
//                   مخابر البحث
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Research Labs & Journals
//                 </p>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home1;
