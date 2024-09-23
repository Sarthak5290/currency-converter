import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_of_currency_converter (1).jpeg"; // Adjust the path to your logo image

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 rounded-full mr-2"
            />
            <span className="text-white text-2xl font-bold">
              Currency Converter
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
