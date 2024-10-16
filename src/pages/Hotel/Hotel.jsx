import React from "react";
import HotelCard from "../../components/HotelCard";
import SelectField from "../../ui/SelectField";
import LoginInput from "../../ui/LoginInput";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { useHotelData } from "../../hooks/useQueryData";
import loading from "../../assets/loading.svg";

const Hotel = () => {
  const { register } = useForm();
  const { data, isLoading } = useHotelData();

  const typeOptions = [
    { label: "Hotel", value: "Hotel" },
    { label: "Appartment", value: "Appartment" },
    { label: "Resort", value: "Resort" },
    { label: "Villa", value: "Villa" },
  ];

  const viewOptions = [
    { label: "City View", value: "cityView" },
    { label: "Ocean View", value: "oceanView" },
    { label: "Forest View", value: "forestView" },
    { label: "Mountain View", value: "mountainView" },
  ];

  const amnetiesOption = [
    { label: "Gym", value: "gym" },
    { label: "Bar", value: "bar" },
    { label: "Laundry", value: "laundry" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Shopping", value: "shopping" },
    { label: "Free Parking", value: "freeParking" },
    { label: "Bike Rental", value: "bikeRental" },
    { label: "Free wifi", value: "freewifi" },
    { label: "Movie Night", value: "movieNight" },
    { label: "Swimming Pool", value: "swimmingPool" },
    { label: "Coffee Shop", value: "coffeeShop" },
  ];

  const ratingList = [
    {
      id: 1,
      label: (
        <div className="flex gap-1 items-center font-normal">
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />( 5 stars )
        </div>
      ),
      value: 5,
    },
    {
      id: 2,
      label: (
        <div className="flex gap-1 items-center font-normal">
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />( 4 stars )
        </div>
      ),
      value: 4,
    },
    {
      id: 3,
      label: (
        <div className="flex gap-1 items-center font-normal">
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />( 3 stars )
        </div>
      ),
      value: 3,
    },
    {
      id: 4,
      label: (
        <div className="flex gap-1 items-center font-normal">
          <FaStar color="#FBC20B" />
          <FaStar color="#FBC20B" />( 2 stars )
        </div>
      ),
      value: 2,
    },
    {
      id: 5,
      label: (
        <div className="flex gap-1 items-center font-normal">
          <FaStar color="#FBC20B" />( 1 stars )
        </div>
      ),
      value: 1,
    },
  ];

  return (
    <div className="py-10 px-20 flex flex-col gap-8 bg-secondary">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Hotels</h2>
        <LoginInput
          register={register}
          name={"search"}
          labelName={"Search For Property"}
          placeholder={"Enter property name"}
          icon={
            <HiMagnifyingGlass fontSize={28} className="text-[#8E8E93] pr-2" />
          }
        />
      </div>
      <div className="flex">
        <div className="w-[30%] pr-10 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#343434]">
              Filter by property type
            </h2>
            <SelectField
              options={typeOptions}
              placeholder={"Select property type"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#343434]">Filter by view</h2>
            <SelectField options={viewOptions} placeholder={"Select view"} />
          </div>
          <div className="flex flex-col gap-2 rounded">
            <h2 className="text-xl font-bold text-[#343434]">
              Filter by amneties
            </h2>
            {amnetiesOption.map((item, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id={item.value}
                  name={item.value}
                  value={item.value}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <label
                  htmlFor={item.value}
                  className="text-base font-medium text-[#343434] cursor-pointer"
                >
                  {" "}
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded">
            <h2 className="text-xl font-bold text-[#343434]">
              Filter by rating
            </h2>
            {ratingList.map((item, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id={item.value}
                  name={item.value}
                  value={item.value}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <label
                  htmlFor={item.value}
                  className="text-base font-medium text-[#343434] cursor-pointer"
                >
                  {" "}
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[70%] flex flex-col gap-10 justify-between">
          <div className="grid grid-cols-3 gap-8">
            {data?.data?.map((item, index) => (
              <HotelCard data={item} index={index} />
            ))}
          </div>
          <div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
