import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const LoginInput = ({
  labelName,
  type = "text",
  name,
  placeholder,
  register,
  required,
  defaultValue,
  className,
  icon,
  disabled,
}) => {
  const [passwordType, setPasswordType] = useState("password");
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-base font-normal text-[#1E1E1E]">
        {labelName} {required && <span className="text-red-600"> *</span>}
      </label>
      <div
        className={`px-2 py-3 w-full h-12 border border-[#8E8E93] hover:border-gray-800 focus-within:border-gray-800 rounded flex items-center ${className}`}
      >
        {icon}
        <input
          id={name}
          disabled={disabled}
          type={type === "password" ? passwordType : type}
          placeholder={placeholder}
          min={type === "number" && 1}
          className="w-full outline-none bg-inherit"
          {...register(name)}
          defaultValue={defaultValue}
        />
        {type === "password" && (
          <div className="text-[#8E8E93] cursor-pointer">
            {passwordType === "password" ? (
              <BsEye size={17} onClick={() => setPasswordType("text")} />
            ) : (
              <BsEyeSlash
                size={17}
                onClick={() => setPasswordType("password")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginInput;
