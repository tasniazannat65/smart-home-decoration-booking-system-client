import React from "react";
import pageNotFound from "../../../assets/404Error.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

const PageError = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-100">
      <div className="w-80 md:w-96 lg:w-96">
        <Lottie animationData={pageNotFound} loop={true}></Lottie>
      </div>
      <h2 className="text-3xl font-bold mt-4 text-accent">
        Oops! Page Not Found
      </h2>
      <p className="text-neutral mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or might have been moved.
      </p>
      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-6 py-3 border-2 border-secondary  text-secondary  bg-base-100  rounded-md shadow hover:scale-105 transition "
        >
          <FaArrowLeftLong />

          <span>Go back</span>
        </button>
        <Link to="/">
          <button className="flex items-center gap-1 px-6 py-3 bg-primary text-white rounded-md shadow hover:scale-105 transition">
            <FaHome />
            <span>Go to Homepage</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageError;
