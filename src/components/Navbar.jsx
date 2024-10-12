import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Button from "../ui/Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-20 py-4 flex justify-between border border-b-gray-50">
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
          <div className="flex items-center cursor-pointer hover:text-[#1D293B]">
            <MdAdd fontSize={26} cursor={"pointer"} />
            <p className="text-lg font-medium">List your hotel</p>
          </div>
        </div>
        <Button btnName={"Login"} btnClick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export default Navbar;
