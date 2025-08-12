import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.jpg";

const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:flex lg:items-center lg:justify-between lg:px-8">
        {/* Text Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight">
            Organize Your <span className="text-orange-600">Work</span> &{" "}
            <span className="text-orange-600">Life</span>
          </h1>
          <p className="mt-6 text-xl font-semibold text-gray-700 ">
            Simplify your day with our intelligent to-do app that helps you
            prioritize tasks effortlessly and keeps you on track.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <Link
              to="/auth?mode=signup"
              className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-500 focus:outline-none focus:ring-2 hover:bg-indigo-400"
            >
              Get Started
            </Link>

            <Link
              to="/auth?mode=login"
              className="text-sm font-semibold text-indigo-800 hover:text-orange-400"
            >
              Already have an account? <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="mt-16 lg:mt-0 lg:ml-16">
          <img
            src={hero}
            alt="Productivity Hero"
            className="w-full max-w-md mx-auto rounded-xl drop-shadow-xl/25"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
