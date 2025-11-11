import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/univ-logo.jpg";

const Navbar = () => {
  return (
    <div
      className="flex flex-row justify-between text-center items-center py-4 px-8 bg-blue-400 text-white border-b-4 border-blue-800"
      dir="ltr"
    >
      <div className="flex flex-row justify-center items-center gap-3">
        <img src={logo} alt="logo" className="w-8 h-8 rounded-full" />
        <h2 className="font-bold text-xl">Univ-Laghouat</h2>
      </div>
      <ul className="flex flex-row gap-4 justify-center items-center">
        <Link to="/">
          <li className="cursor-pointer font-semibold text-xl hover:text-yellow-200">
            الصفحة الرئيسية
          </li>
        </Link>
      </ul>
      <Link to="/admin">
        <button className="px-4 py-2 rounded-full border-2 border-amber-500 bg-amber-100 text-red-400 cursor-pointer font-semibold hover:bg-amber-200 hover:text-red-500 hover:border-amber-600 transition-all duration-300">
          admin
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
