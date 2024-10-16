import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LoginInput from "../../ui/LoginInput";
import { BiHotel, BiLocationPlus } from "react-icons/bi";
import SelectField from "../../ui/SelectField";
import Button from "../../ui/Button";
import { useHotelMutation } from "../../hooks/useMutateData";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const hotelSchema = Yup.object().shape({
  title: Yup.string().required("Hotel name is required"),
  type: Yup.string().required("Hotel type is required"),
  description: Yup.string().required("Description is required"),
  locationDescription: Yup.string().required(
    "Location Description is required"
  ),
  country: Yup.string().required("Country is required"),
  province: Yup.string().required("Province is required"),
  city: Yup.string().required("City is required"),
  gym: Yup.boolean(),
  spa: Yup.boolean(),
  bar: Yup.boolean(),
  laundry: Yup.boolean(),
  restaurant: Yup.boolean(),
  shopping: Yup.boolean(),
  freeParking: Yup.boolean(),
  bikeRental: Yup.boolean(),
  freeWifi: Yup.boolean(),
  movieNight: Yup.boolean(),
  swimmingPool: Yup.boolean(),
  coffeeShop: Yup.boolean(),
});

const AddHotelForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setselectedImage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [response, setResponse] = useState();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(hotelSchema),
  });

  const typeOptions = [
    { label: "Hotel", value: "Hotel" },
    { label: "Appartment", value: "Appartment" },
    { label: "Resort", value: "Resort" },
    { label: "Villa", value: "Villa" },
  ];

  const countryOptions = [{ label: "Nepal", value: "Nepal" }];

  const provinceOptions = [
    { label: "Koshi", value: "Koshi" },
    { label: "Madhesh", value: "Madhesh" },
    { label: "Bagmati", value: "Bagmati" },
    { label: "Gandaki", value: "Gandaki" },
    { label: "Lumbini", value: "Lumbini" },
    { label: "Karnali", value: "Karnali" },
    { label: "Sudurpashchim", value: "Sudurpashchim" },
  ];

  const amenitiesOptions = [
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setselectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const hotelMutation = useHotelMutation();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("userId", user?.data?._id);
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("image", selectedImage);
    formData.append("description", data.description);
    formData.append("country", data.country);
    formData.append("province", data.province);
    formData.append("city", data.city);
    formData.append("locationDescription", data.locationDescription);

    amenitiesOptions.forEach(({ value }) => {
      formData.append(value, data[value]);
    });

    hotelMutation.mutateAsync(["post", "", formData], {
      onSuccess: (response) => {
        // navigate("/");
        toast.success("Hotel added successfully");
        setResponse(response?.hotel);
        // reset();
        // setselectedImage(null);
        // setImagePreview(null);
        setDisplay(true);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  return (
    <div className="py-12 px-20 flex flex-col gap-8 bg-secondary">
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
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <SelectField
                  required
                  {...field}
                  label={"Select Hotel Type"}
                  options={typeOptions}
                  placeholder={"Select hotel type"}
                  className="w-full"
                  errorMessage={errors?.type?.message}
                />
              )}
            />
            <div>
              <label className="text-[16px] mb-1">Hotel Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-[#8E8E93] rounded"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover"
                />
              )}
              <p className="text-red-600 text-sm mt-1">
                {errors?.image?.message}
              </p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px]">Hotel Description</label>
              <textarea
                {...register("description")}
                className="px-2 py-3 border h-20 border-[#8E8E93] outline-none resize-none hover:border-gray-800 focus-within:border-gray-800 rounded"
                placeholder="Enter hotel description"
              ></textarea>
              <p className="text-red-600">{errors?.description?.message}</p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px] mb-1">Select Amenities</label>
              <div className="grid grid-cols-2 gap-5">
                {amenitiesOptions.map((item) => (
                  <div
                    className="flex gap-1 items-center border border-[#8E8E93] p-3 rounded"
                    key={item.value}
                  >
                    <input
                      type="checkbox"
                      id={item.value}
                      {...register(item.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={item.value} className="cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <SelectField
                    required
                    {...field}
                    label={"Select country"}
                    options={countryOptions}
                    placeholder={"Select country"}
                    className="w-full"
                    errorMessage={errors?.country?.message}
                  />
                )}
              />
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <SelectField
                    required
                    {...field}
                    label={"Select Province"}
                    options={provinceOptions}
                    placeholder={"Select province"}
                    className="w-full"
                    errorMessage={errors?.province?.message}
                  />
                )}
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
                {...register("locationDescription")}
                className="px-2 py-3 border h-20 border-[#8E8E93] outline-none resize-none hover:border-gray-800 focus-within:border-gray-800 rounded"
                placeholder="Enter hotel location description"
              ></textarea>
              <p className="text-red-600">
                {errors?.locationDescription?.message}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button btnName={"Add Hotel"} />
            </div>

            {display && (
              <div className="flex items-center justify-between py-5 bg-blue-200 rounded-md px-5">
                <div className="flex flex-col gap-1">
                  <p>Room added sucessfully.🎉🎉</p>
                  <p>One final thing now!!!</p>
                </div>
                <Button
                  btnName={"Add Room"}
                  type={"button"}
                  btnClick={() =>
                    navigate("/hotel/room/add", {
                      state: { id: response?._id, name: response?.title },
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotelForm;
