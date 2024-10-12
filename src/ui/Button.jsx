import React from "react";

const Button = ({ btnName, type, className, btnClick }) => {
  return (
    <button
      className={`px-6 py-3 rounded bg-[#1D293B] hover:bg-[#2c3b52] text-base font-medium text-white tracking-wide ${className}`}
      type={type}
      onClick={btnClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
