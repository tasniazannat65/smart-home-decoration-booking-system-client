import React from "react";
import loading from "../../../assets/Loading.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-40 h-40">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
};

export default Loading;
