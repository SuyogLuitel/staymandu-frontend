import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Button from "../ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { getInitials } from "../utils/getInitials";

const Navbar = () => {
  const { loggedIn, user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="px-20 py-4 flex justify-between border border-b-gray-50 top-0 left-0 sticky z-10 bg-gray-50">
      <div
        className="font-bold text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Staymandu.
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6">
          <div
            className="flex gap-1 items-center cursor-pointer hover:text-[#1D293B]"
            onClick={() => navigate("/hotel")}
          >
            <FaHotel fontSize={26} cursor={"pointer"} />
            <p className="text-lg font-medium">Hotel</p>
          </div>
          <div
            className="flex items-center cursor-pointer hover:text-[#1D293B]"
            onClick={() =>
              loggedIn ? navigate("/hotel/add") : navigate("/login")
            }
          >
            <MdAdd fontSize={26} cursor={"pointer"} />
            <p className="text-lg font-medium">List your hotel</p>
          </div>
        </div>
        {loggedIn ? (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-lg text-white bg-[#1D293B] cursor-pointer"
            onClick={() => navigate("/myProfile")}
          >
            {getInitials(user.data.fullname)}
          </div>
        ) : (
          <Button btnName={"Login"} btnClick={() => navigate("/login")} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
