import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 drop-shadow-xl/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()}{" "}
            <Link className="text-orange-600" to="/">
              TodoZen
            </Link>
            . All rights reserved.
          </p>

          <div className="mt-4 md:mt-0 space-x-4">
            <Link
              to="/privacy"
              className="text-gray-600 text-sm hover:text-orange-600"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 text-sm hover:text-orange-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
