import React from "react";
import LoginInput from "../ui/LoginInput";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { MdEmail } from "react-icons/md";

const Newsletter = () => {
  const { register } = useForm();
  return (
    <div className="px-20 py-10 flex justify-between items-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl text-[#1D293B] font-bold cursor-pointer">
          Staymandu.
        </h2>
        <p className="text-base font-normal text-[#343434]">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id es
        </p>
        <div className="flex items-center gap-5">
          <p className="text-base font-medium cursor-pointer text-[#343434] border border-[#050B20] px-6 py-2 rounded-2xl hover:bg-slate-200">
            +977-9845672165
          </p>
          <p className="text-base font-medium cursor-pointer text-[#343434] border border-[#050B20] px-6 py-2 rounded-2xl hover:bg-slate-200">
            admin@mail.com
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#343434]">Join Staymandu.</h2>
        <p className="text-base font-normal text-[#343434]">
          Receive pricing updates, booking tips & more!
        </p>
        <LoginInput
          register={register}
          placeholder={"Your email address"}
          name={"email"}
          type="email"
          icon={<MdEmail fontSize={28} className="text-[#8E8E93] pr-2" />}
        />
        <Button btnName={"Signup"} />
      </div>
    </div>
  );
};

export default Newsletter;
