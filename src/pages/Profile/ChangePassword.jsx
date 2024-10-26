import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaLock } from "react-icons/fa6";
import LoginInput from "../../ui/LoginInput";
import Button from "../../ui/Button";

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Confirm Password must match new password"
  ),
});

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data) => {};

  return (
    <div>
      <h2 className="text-xl font-bold">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div>
            <LoginInput
              labelName={"Current Password"}
              type="password"
              name={"currentPassword"}
              placeholder={"Enter your current password"}
              register={register}
              icon={<FaLock fontSize={24} className="text-[#8E8E93] pr-2" />}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.currentPassword?.message}
            </p>
          </div>
          <div>
            <LoginInput
              labelName={"New Password"}
              type="password"
              name={"newPassword"}
              placeholder={"Enter your new password"}
              register={register}
              icon={<FaLock fontSize={24} className="text-[#8E8E93] pr-2" />}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.newPassword?.message}
            </p>
          </div>
          <div>
            <LoginInput
              labelName={"Confirm Password"}
              type="password"
              name={"confirmPassword"}
              placeholder={"Enter your confirm password"}
              register={register}
              icon={<FaLock fontSize={24} className="text-[#8E8E93] pr-2" />}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.confirmPassword?.message}
            </p>
          </div>
          <div></div>
          <div></div>
          <div className="w-2/3 flex justify-end place-self-end">
            <Button btnName={"Change Password"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
