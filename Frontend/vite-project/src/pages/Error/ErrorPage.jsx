import { Link } from "react-router-dom";
import errorImg from "../../assets/error.png";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center px-10 justify-center gap-10 text-white text-center  h-screen">
        <img className="md:w-[60%] md:max-w-[600px]" src={errorImg} alt="" />

        <div className="flex flex-col">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            OOps... Page Not Found
          </h1>
          <p className="text-body-text-color mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            The page you looking for is not found or is removed.
          </p>
        </div>
        <Link
          to="/"
          className="
          rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-500"
        >
          Go To Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
