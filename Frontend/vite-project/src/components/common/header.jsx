import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            TodoZen
          </Link>

          <div className="space-x-4 hidden md:flex">
            <Link
              to="/auth?mode=login"
              className="text-sm font-medium px-4 py-2 rounded-md text-indigo-700 hover:text-orange-400"
            >
              Login
            </Link>

            <Link
              to="/auth?mode=signup"
              className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
