// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { FaClipboardList, FaHome, FaPowerOff, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigateTo = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigateTo("/");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userData.userInfo.userName);
    const user = userData?.userInfo.userName;
    setUserName(user);
  }, []);
  return (
    <nav className="bg-orange-500 shadow-md py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5 flex-shrink-0 text-white text-2xl font-bold">
              <FaUserAlt /> Welcome '{userName}'!
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="
                  text-white hover:text-indigo-500 transition font-semibold px-3 py-2 rounded-md text-lg flex items-center space-x-2"
                >
                  <FaHome className="text-xl" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/todo-list"
                  className="text-white hover:text-indigo-500 px-3 py-2 rounded-md text-lg font-medium flex items-center space-x-2"
                >
                  <FaClipboardList className="text-xl" />
                  <span>Todo List</span>
                </Link>

                <button
                  onClick={handleLogOut}
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-lg font-medium flex items-center space-x-2"
                >
                  <FaPowerOff className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
