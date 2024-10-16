import React, { useState } from "react";
import HotelCard from "../../components/HotelCard";
import SelectField from "../../ui/SelectField";
import LoginInput from "../../ui/LoginInput";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegStar, FaStar } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { useHotelData } from "../../hooks/useQueryData";
import Newsletter from "../../components/Newsletter";
import loader from "../../assets/loader.gif";
import Button from "../../ui/Button";

const Hotel = () => {
  const { register } = useForm();
  const { data } = useHotelData();

  // State for search input, rating filter, and selected amenities
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState({});

  const typeOptions = [
    { label: "Hotel", value: "Hotel" },
    { label: "Appartment", value: "Appartment" },
    { label: "Resort", value: "Resort" },
    { label: "Villa", value: "Villa" },
  ];

  const amenitiesOption = [
    { label: "Gym", value: "gym" },
    { label: "Bar", value: "bar" },
    { label: "Laundry", value: "laundry" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Shopping", value: "shopping" },
    { label: "Free Parking", value: "freeParking" },
    { label: "Bike Rental", value: "bikeRental" },
    { label: "Free Wifi", value: "freeWifi" },
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
          <FaStar color="#FBC20B" />( 1 star )
        </div>
      ),
      value: 1,
    },
    {
      id: 6,
      label: (
        <div className="flex gap-1 items-center font-normal">
          <FaRegStar color="#FBC20B" />( 0 star )
        </div>
      ),
      value: 0,
    },
  ];

  // Filter hotels based on search term, selected rating, type, and amenities
  const filteredData = data?.data
    ?.filter((hotel) => {
      const matchesSearchTerm =
        hotel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating =
        selectedRating !== null
          ? Math.floor(hotel.ratings.averageRating) === selectedRating
          : true;
      const matchesType =
        selectedType !== null ? hotel.type === selectedType : true;
      const matchesAmenities = Object.keys(selectedAmenities).length
        ? Object.entries(selectedAmenities).every(([key, value]) =>
            value ? hotel[key] === true : true
          )
        : true;

      return (
        matchesSearchTerm && matchesRating && matchesType && matchesAmenities
      );
    })
    ?.sort((a, b) => {
      if (b.ratings.averageRating !== a.ratings.averageRating) {
        return b.ratings.averageRating - a.ratings.averageRating;
      }
      return b.ratings.totalRating - a.ratings.totalRating;
    });

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAmenities((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  return (
    <>
      <div className="py-10 px-20 flex flex-col gap-8 bg-secondary">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Hotels</h2>
          <LoginInput
            register={register}
            name={"search"}
            value={searchTerm}
            labelName={"Search for Hotel"}
            placeholder={"Search for property name or location"}
            icon={
              <HiMagnifyingGlass
                fontSize={28}
                className="text-[#8E8E93] pr-2"
              />
            }
            onchange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="w-[30%] pr-10 flex flex-col gap-5">
            {/* Property Type Filter */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-[#343434]">
                Filter by property type
              </h2>
              <SelectField
                options={typeOptions}
                onChange={(e) => setSelectedType(e)}
                placeholder={"Select property type"}
              />
            </div>

            {/* Amenities Filter */}
            <div className="flex flex-col gap-2 rounded">
              <h2 className="text-xl font-bold text-[#343434]">
                Filter by amenities
              </h2>
              {amenitiesOption.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    id={item.value}
                    name={item.value}
                    value={item.value}
                    className="w-4 h-4 rounded cursor-pointer"
                    checked={!!selectedAmenities[item.value]}
                    onChange={handleAmenityChange}
                  />
                  <label
                    htmlFor={item.value}
                    className="text-base font-medium text-[#343434] cursor-pointer"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col gap-2 rounded">
              <h2 className="text-xl font-bold text-[#343434]">
                Filter by rating
              </h2>
              {ratingList.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="radio"
                    id={item.value}
                    name="rating"
                    value={item.value}
                    checked={selectedRating === item.value}
                    className="w-4 h-4 rounded cursor-pointer"
                    onChange={() => setSelectedRating(item.value)}
                  />
                  <label
                    htmlFor={item.value}
                    className="text-base font-medium text-[#343434] cursor-pointer"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Clear Button */}
            <div className="w-40 mt-4">
              <Button
                btnName={"Clear"}
                btnClick={() => {
                  setSearchTerm("");
                  setSelectedRating(null);
                  setSelectedType(null);
                  setSelectedAmenities({});
                }}
              />
            </div>
          </div>

          {/* Hotel List */}
          <div className="w-[70%] flex flex-col gap-10 justify-between">
            {filteredData?.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {filteredData.map((item, index) => (
                  <HotelCard data={item} index={index} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center justify-center mt-20">
                <img src={loader} alt="loader" />
                No hotel to show...
              </div>
            )}
            <Pagination />
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default Hotel;
