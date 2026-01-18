import React from "react";

const Button = ({ label, onClick, disabled, outline, small }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          
          transition
          cursor-pointer
          px-4
          w-full
          ${outline ? "bg-base-100" : "bg-[#4d5bbf]"}
          ${outline ? "border-[#5BB4EA]" : "border-[#4d5bbf]"}
          ${outline ? "text-[#5BB4EA]" : "text-white"}
          ${small ? "text-sm" : "text-md"}
          ${small ? "py-1" : "py-2"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "border" : "border-2"}
          ${
            outline
              ? "hover:bg-[#5BB4EA] hover:text-white"
              : "hover:bg-[#5BB4EA] hover:border-[#5BB4EA]"
          }
        
         
        `}
    >
      {label}
    </button>
  );
};

export default Button;
