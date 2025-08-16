import React, { useState } from "react";
import hitApi from "../../services/hitApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import getErrorMessage from "../../../../../Backend/src/utils/getErrorMessage";

const Login = ({ buttonClasses, toggleSignUpMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const result = await hitApi({
        url: "/users/login",
        method: "POST",
        data,
      });
      const info = JSON.stringify(result.data.data);
      localStorage.setItem("userInfo", info);

      toast.success(result.data.message);
      navigateTo("/home");
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err) || "Login failed");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 border border-gray-100">
      <div className="p-6 space-y-6 md:space-y-7 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-backgroundColor-500 md:text-2xl text-center">
          Welcome Back
          <p className="text-sm font-normal text-gray-500 mt-1">
            Sign in to your account
          </p>
        </h1>

        <form className="space-y-5 md:space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdEmail className="text-gray-500 w-5 h-5 transition-transform duration-300 hover:scale-110 hover:text-brightColor" />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-brightColor focus:border-brightColor block w-full pl-10 p-3 transition-all duration-200 shadow-sm"
              placeholder="Email address"
              required
              autoComplete="username"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <RiLockPasswordFill className="text-gray-500 w-5 h-5 transition-transform duration-300 hover:scale-110 hover:text-brightColor" />
            </div>
            <input
              type={type}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-brightColor focus:border-brightColor block w-full pl-10 pr-10 p-3 transition-all duration-200 shadow-sm"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setType(type === "password" ? "text" : "password")}
            >
              {type === "password" ? (
                <FaEye className="text-gray-500 w-5 h-5 transition-transform duration-300 hover:scale-110 hover:text-backgroundColor" />
              ) : (
                <FaEyeSlash className="text-gray-500 w-5 h-5 transition-transform duration-300 hover:scale-110 hover:text-backgroundColor" />
              )}
            </div>
          </div>

          <button type="submit" className={buttonClasses}>
            Sign in
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4 border-t border-gray-100 pt-4">
          If you don&apos;t have an account,{" "}
          <span
            onClick={toggleSignUpMode}
            className="text-brightColor font-medium cursor-pointer hover:underline"
          >
            Do Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
