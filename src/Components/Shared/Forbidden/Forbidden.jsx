import React from "react";
import forbidden from "../../../assets/forbidden403.json";
import { Link } from "react-router";
import Lottie from "lottie-react";
import { RiDashboardFill } from "react-icons/ri";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-100">
      <div className="w-80 md:w-96 lg:w-96">
        <Lottie animationData={forbidden} loop={true}></Lottie>
      </div>
      <h2 className="text-3xl font-bold mt-4 text-accent"> Access Denied</h2>
      <p className="text-neutral mt-2 text-center max-w-md">
        You don’t have permission to access this page. If you think this is a
        mistake, please contact your administrator.
      </p>
      <div className=" mt-5">
        <Link to="/dashboard">
          <button className="flex items-center gap-1 px-6 py-3 bg-primary text-white rounded-md shadow hover:scale-105 transition">
            <RiDashboardFill />

            <span>Go to Dashboard</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
