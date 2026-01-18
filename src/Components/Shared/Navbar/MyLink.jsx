import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-secondary font-medium transition text-lg  "
          : "text-white text-lg font-medium"
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
