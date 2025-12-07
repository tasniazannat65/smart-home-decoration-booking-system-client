import React from 'react';

const Button = ({ label, onClick, disabled, outline, small, icon: Icon, gradient }) => {
  return (
   <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          cursor-pointer
          px-4
          w-full
          ${outline ? 'bg-white' : 'bg-[#4F46E5]'}
          ${outline ? 'border-[#4F46E5]' : 'border-[#4F46E5]'}
          ${outline ? 'text-[#4F46E5]' : 'text-white'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border' : 'border-2'}
          ${gradient ? `bg-gradient-to-r from-[#4F46E5] to-[#A78BFA] text-white border-transparent hover:scale-105 hover:shadow-lg` : outline ? `bg-white text-[#4F46E5] border-[#4F46E5] hover:bg-[#F3F4F6]` : `bg-[#4F46E5] text-white border-[#4F46E5] hover:bg-[#4F46E5]`}
        `}
    >
      {Icon && (
        <Icon
          size={22}
          className='
              absolute
              left-4
              top-1/2
              -translate-y-1/2
            '
        />
      )}
      {label}
    </button>
  );
};

export default Button;