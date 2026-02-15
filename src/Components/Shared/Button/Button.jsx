import React from "react";

const Button = ({ label, onClick, disabled, outline }) => {
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
          py-2
          w-auto
          text-md 
          font-semibold
          border-2
          ${outline ? "bg-base-100" : "bg-[#4d5bbf]"}
          ${outline ? "border-[#5BB4EA]" : "border-[#4d5bbf]"}
          ${outline ? "text-[#5BB4EA]" : "text-white"}
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
