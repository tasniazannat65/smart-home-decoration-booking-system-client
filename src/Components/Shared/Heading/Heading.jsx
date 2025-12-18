import React from "react";

const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">
        {title}
      </div>
      <div className="font-light text-neutral mt-4">{subtitle}</div>
    </div>
  );
};

export default Heading;
