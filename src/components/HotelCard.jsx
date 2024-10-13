import React from "react";
import hotel from "../assets/hotels.jpeg";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const HotelCard = () => {
  return (
    <div className="flex flex-col border rounded cursor-pointer hover:mt-1">
      <div>
        <img src={hotel} alt="hotel" className="rounded w-full" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold">Beach Hotel</h2>
        <p className="text-sm">
          Beach hotel is a new hotel next to the oceans.
        </p>
        <div className="flex items-center gap-1 text-sm">
          <IoLocationOutline />
          <p>Kathmandu, Nepal</p>
        </div>
        <div className="text-base font-semibold">Rs 1400</div>
        <div className="flex gap-1">
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
