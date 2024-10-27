import React, { useState } from "react";
import HotelCard from "../../components/HotelCard";
import SelectField from "../../ui/SelectField";
import LoginInput from "../../ui/LoginInput";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegStar, FaStar } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { useHotelData, useNearestHotelData } from "../../hooks/useQueryData";
import Newsletter from "../../components/Newsletter";
import loader from "../../assets/loader.gif";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Tooltip from "../../components/Tooltip";

const Hotel = () => {
  // State for search input, rating filter, and selected amenities
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState({});
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [isNearest, setIsNearest] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const { register } = useForm();
  const { data } = isNearest
    ? useNearestHotelData(location.longitude, location.latitude, page, sortBy)
    : useHotelData(page, sortBy);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error("Geolocation error:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error("Permission denied.");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Position unavailable.");
              break;
            case error.TIMEOUT:
              toast.error("Request timeout.");
              break;
            default:
              toast.error("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

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

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAmenities((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const filteredHotels = data?.data?.filter((hotel) => {
    const matchesSearchTerm =
      hotel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.streetname.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType !== null ? hotel.type === selectedType : true;

    const matchesRating =
      selectedRating !== null
        ? Math.floor(hotel.ratings.averageRating) === selectedRating
        : true;

    const matchesAmenities = Object.keys(selectedAmenities).length
      ? Object.entries(selectedAmenities).every(([key, value]) =>
          value ? hotel[key] === true : true
        )
      : true;

    return (
      matchesSearchTerm && matchesType && matchesRating && matchesAmenities
    );
  });

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsNearest(isChecked);

    if (isChecked) {
      getLocation();
    } else {
      setLocation({ latitude: null, longitude: null });
    }
  };

  return (
    <>
      <div className="py-10 px-20 flex flex-col gap-8 bg-secondary">
        <div className="flex mb-4">
          <h2 className="text-2xl font-bold w-[30%]">All Hotels</h2>
          <div className="flex items-center justify-between w-[70%]">
            <div className="flex flex-col gap-1">
              <label htmlFor="sortBy">Sort by</label>
              <select
                id="sortBy"
                className="border p-1 border-[#8E8E93] rounded cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="latest">Latest</option>
                <option value="maxPrice">Max Price</option>
                <option value="minPrice">Min Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
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
        </div>
        <div className="flex">
          <div className="w-[30%] pr-10 flex flex-col gap-5">
            {/* Property Type Filter */}
            <div className="flex flex-col gap-2">
              <Tooltip text="Hotel under 5000 meters will be displayed">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded cursor-pointer"
                    name="geo"
                    id="geo"
                    checked={isNearest}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="geo"
                    className="font-medium text-[#465E95] text-lg cursor-pointer hover:underline"
                  >
                    Hotels nearest to me
                  </label>
                </div>
              </Tooltip>
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
                  setSortBy("default");
                }}
              />
            </div>
          </div>

          {/* Hotel List */}
          <div className="w-[70%] flex flex-col gap-10 justify-between">
            {filteredHotels?.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {filteredHotels?.map((item, index) => (
                  <HotelCard data={item} index={index} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center justify-center mt-20">
                <img src={loader} alt="loader" />
                No hotel to show...
              </div>
            )}
            <Pagination
              totalPage={data?.totalPages}
              currentPage={data?.currentPage}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default Hotel;
