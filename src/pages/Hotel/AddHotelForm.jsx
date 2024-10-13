import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LoginInput from "../../ui/LoginInput";
import { BiHotel, BiLocationPlus } from "react-icons/bi";
import SelectField from "../../ui/SelectField";
import Button from "../../ui/Button";

const hotelSchema = Yup.object().shape({
  title: Yup.string().required("Hotel name is required"),
  city: Yup.string().required("City is required"),
});

const AddHotelForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(hotelSchema),
  });

  const options = [{ label: "abc", value: "abc" }];

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

  const onSubmit = () => {};

  return (
    <div className="pt-12 px-20 flex flex-col gap-8 bg-secondary">
      <h2 className="text-2xl font-bold">Describe your hotel</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <LoginInput
                labelName={"Hotel Name"}
                name={"title"}
                placeholder={"Enter your hotel name"}
                register={register}
                icon={<BiHotel fontSize={24} className="text-[#8E8E93] pr-2" />}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.title?.message}
              </p>
            </div>
            <SelectField
              label={"Select Hotel Type"}
              options={options}
              placeholder={"Select hotel type"}
              className="w-full"
            />
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px]">Hotel Description</label>
              <textarea
                className="px-2 py-3 border h-20 border-[#8E8E93] outline-none resize-none hover:border-gray-800 focus-within:border-gray-800 rounded"
                placeholder="Enter hotel description"
              ></textarea>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px] mb-1">Select Amneties</label>
              <div className="grid grid-cols-2 gap-5">
                {amnetiesOption.map((item, index) => (
                  <div
                    className="flex gap-1 items-center border border-[#8E8E93] p-3 rounded"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      id={item?.value}
                      name={item?.value}
                      value="Bike"
                      className="w-4 h-4"
                    />
                    <label for={item?.value} className="cursor-pointer">
                      {item?.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <SelectField
                label={"Select country"}
                options={options}
                placeholder={"Select country"}
                className="w-full"
              />
              <SelectField
                label={"Select Province"}
                options={options}
                placeholder={"Select province"}
                className="w-full"
              />
            </div>
            <div>
              <LoginInput
                labelName={"City"}
                name={"city"}
                placeholder={"e.g. Kathmandu"}
                register={register}
                icon={
                  <BiLocationPlus
                    fontSize={24}
                    className="text-[#8E8E93] pr-2"
                  />
                }
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.city?.message}
              </p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px]">Hotel Location Description</label>
              <textarea
                className="px-2 py-3 border h-20 border-[#8E8E93] outline-none resize-none hover:border-gray-800 focus-within:border-gray-800 rounded"
                placeholder="Enter hotel location description"
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
              <Button btnName={"Add Hotel"} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotelForm;
