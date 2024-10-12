import React from "react";
import LoginInput from "../../ui/LoginInput";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaLock } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useSignupMutation } from "../../hooks/useMutateData";
import toast from "react-hot-toast";

const signupSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const signupMutation = useSignupMutation();

  const onSubmit = (data) => {
    signupMutation.mutateAsync(["post", "", data], {
      onSuccess: (response) => {
        navigate("/login");
        toast.success("Account created successfully");
        reset();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  return (
    <div>
      <div className="px-28">
        <h2 className="text-2xl font-semibold">Create account</h2>
        <p className="text-base font-normal">
          Enter your credential to create an account...
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8 w-[80%] flex flex-col gap-6">
            <div>
              <LoginInput
                labelName={"Full name"}
                type="text"
                name={"fullname"}
                placeholder={"Enter your fullname"}
                register={register}
                icon={<FaUser fontSize={24} className="text-[#8E8E93] pr-2" />}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.fullname?.message}
              </p>
            </div>
            <div>
              <LoginInput
                labelName={"Email"}
                type="email"
                name={"email"}
                placeholder={"Enter your email"}
                register={register}
                icon={<FaUser fontSize={24} className="text-[#8E8E93] pr-2" />}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.email?.message}
              </p>
            </div>
            <div>
              <LoginInput
                labelName={"Password"}
                name={"password"}
                type="password"
                placeholder={"Enter your password"}
                register={register}
                icon={<FaLock fontSize={24} className="text-[#8E8E93] pr-2" />}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.password?.message}
              </p>
            </div>
            <Button btnName={"Create account"} />
            <p className="text-center text-sm font-normal">
              Already have an account?
              <span
                className="text-[#1D293B] font-medium cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
