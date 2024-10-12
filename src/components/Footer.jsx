import React from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { PiPinterestLogo } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotel", path: "/hotel" },
    { name: "My Hotel", path: "/" },
    { name: "My Bookings", path: "/" },
  ];

  return (
    <div className="bg-[#1D293B] px-20">
      <div className="flex items-center gap-5 pt-10 pb-5 justify-center">
        <FaFacebook color="white" fontSize={22} cursor={"pointer"} />
        <BsInstagram color="white" fontSize={22} cursor={"pointer"} />
        <BsTwitter color="white" fontSize={22} cursor={"pointer"} />
        <PiPinterestLogo color="white" fontSize={22} cursor={"pointer"} />
      </div>
      <div className="flex items-center gap-10 pb-10 justify-center">
        {navLinks.map((item, index) => (
          <p
            className={`text-base text-white hover:font-semibold font-normal cursor-pointer`}
            key={index}
            onClick={() => navigate(item.path)}
          >
            {item?.name}
          </p>
        ))}
      </div>
      <hr />
      <div className="py-10 flex justify-between">
        <p className="text-base text-white font-normal ">
          © 2024 exemple.com. All rights reserved.
        </p>
        <div className="flex gap-5">
          <p className="text-base text-white font-normal cursor-pointer hover:font-semibold">
            Terms & Conditions
          </p>
          <p className="text-base text-white font-normal cursor-pointer hover:font-semibold">
            Privacy Notice
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
