import React from "react";
import hotel from "../../assets/hotels.jpeg";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { BiDrink, BiSolidCameraMovie } from "react-icons/bi";
import {
  MdDirectionsBike,
  MdLocalParking,
  MdOutlineLocalLaundryService,
  MdOutlineSignalWifiStatusbar4Bar,
  MdShoppingCart,
} from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";
import { FaPersonSwimming } from "react-icons/fa6";
import { PiCoffeeFill } from "react-icons/pi";
import Button from "../../ui/Button";

const HotelDetail = () => {
  const amnetiesOption = [
    { label: "Gym", value: "gym", icons: <CgGym /> },
    { label: "Bar", value: "bar", icons: <BiDrink /> },
    {
      label: "Laundry",
      value: "laundry",
      icons: <MdOutlineLocalLaundryService />,
    },
    { label: "Restaurant", value: "restaurant", icons: <IoMdRestaurant /> },
    { label: "Shopping", value: "shopping", icons: <MdShoppingCart /> },
    { label: "Free Parking", value: "freeParking", icons: <MdLocalParking /> },
    { label: "Bike Rental", value: "bikeRental", icons: <MdDirectionsBike /> },
    {
      label: "Free wifi",
      value: "freewifi",
      icons: <MdOutlineSignalWifiStatusbar4Bar />,
    },
    {
      label: "Movie Night",
      value: "movieNight",
      icons: <BiSolidCameraMovie />,
    },
    {
      label: "Swimming Pool",
      value: "swimmingPool",
      icons: <FaPersonSwimming />,
    },
    { label: "Coffee Shop", value: "coffeeShop", icons: <PiCoffeeFill /> },
  ];
  return (
    <div className="pt-6 px-20 flex flex-col gap-4 bg-secondary">
      <img src={hotel} alt="hotel" className="w-full h-[60vh]" />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Beach Hotel</h2>
        <div className="flex items-center gap-1 text-sm">
          <IoLocationOutline />
          <p>Kathmandu, Nepal</p>
        </div>
        <div className="flex gap-1 items-center">
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />( 20 reviews )
        </div>
        <p className="text-base font-medium">Location Details</p>
        <p className="text-sm">
          Beach hotel is a new hotel next to the oceans.
        </p>
        <p className="text-base font-medium">About this hotel</p>
        <p className="text-sm">
          Beach hotel is a new hotel next to the oceans.
        </p>
        <p className="text-base font-medium">Popular Amneties</p>
        <div className="grid grid-cols-3 gap-5">
          {amnetiesOption.map((item, index) => (
            <div className="flex gap-1 items-center rounded" key={index}>
              {item.icons}
              <label for={item?.value} className="cursor-pointer">
                {item?.label}
              </label>
            </div>
          ))}
        </div>
        <p className="text-base font-medium mt-6">Room Available:</p>
        <div className="flex gap-4 mt-3">
          <div className="border border-[#dcdcdd] p-3 rounded w-1/3 flex flex-col gap-3">
            <h2 className="text-xl font-bold">Beach Hotel</h2>
            <img src={hotel} alt="hotel" className="w-full h-[40vh]" />
            <div className="grid grid-cols-2 gap-5">
              {amnetiesOption.map((item, index) => (
                <div className="flex gap-1 items-center rounded" key={index}>
                  {item.icons}
                  <label for={item?.value} className="cursor-pointer">
                    {item?.label}
                  </label>
                </div>
              ))}
            </div>
            <hr />
            <p>
              Room Price: <span className="font-semibold">Rs 250 </span>/24hrs
            </p>
            <hr />
            <p>Select date that you will spend in this room</p>
            <p>
              Total Price: <span className="font-semibold">Rs 250 </span> for
              <span className="font-semibold"> 1 days</span>
            </p>
            <div className="w-[70%]">
              <Button btnName={"Book Now"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
