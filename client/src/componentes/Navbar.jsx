import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/univ-logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="bg-blue-600 text-white border-b-4 border-blue-800 shadow-md"
      dir="ltr"
    >
      <div className="flex flex-row justify-between items-center py-2 px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex flex-row justify-center items-center gap-2 md:gap-3">
          <img src={logo} alt="logo" className="w-8 h-8 rounded-full" />
          <h2 className="font-bold text-lg md:text-xl">Univ-Laghouat</h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-4 justify-center items-center">
          <Link to="/">
            <li className="cursor-pointer font-semibold text-xl hover:text-yellow-200 transition-colors duration-200">
              الصفحة الرئيسية
            </li>
          </Link>
        </ul>

        {/* Desktop Admin Button */}
        {/* <Link to="/admin" className="hidden md:block">
          <button className="px-4 py-1 rounded-full border-2 border-amber-500 bg-amber-100 text-red-400 cursor-pointer font-semibold hover:bg-amber-200 hover:text-red-500 hover:border-amber-600 transition-all duration-300">
            admin
          </button>
        </Link> */}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 border-t-2 border-blue-600">
          <ul className="flex flex-col py-4">
            <Link to="/" onClick={toggleMenu}>
              <li className="cursor-pointer font-semibold text-lg hover:bg-blue-600 py-3 px-4 text-center transition-colors duration-200">
                الصفحة الرئيسية
              </li>
            </Link>
            {/* <Link to="/admin" onClick={toggleMenu} className="px-4 py-3">
              <button className="w-full px-4 py-2 rounded-full border-2 border-amber-500 bg-amber-100 text-red-400 cursor-pointer font-semibold hover:bg-amber-200 hover:text-red-500 hover:border-amber-600 transition-all duration-300">
                admin
              </button>
            </Link> */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
