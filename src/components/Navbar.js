import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_of_currency_converter (1).jpeg"; 

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 relative">
          <Link 
            to="/" 
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 rounded-full mr-3 group-hover:rotate-6 transition-transform duration-300 shadow-md border-2 border-white"
            />
            <span className="text-white text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Currency Converter
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;