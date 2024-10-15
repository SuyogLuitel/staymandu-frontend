import React, { useState } from "react";
import hotel from "../../assets/hotels.jpeg";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
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
import { useSpecificHotelData } from "../../hooks/useQueryData";
import { useParams } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
import { useAuthStore } from "../../store/useAuthStore";
import Rating from "react-rating-stars-component";
import { useReviewMutation } from "../../hooks/useMutateData";
import toast from "react-hot-toast";
import { timeAgo } from "../../utils/timeAgo";

const HotelDetail = () => {
  const { id } = useParams();
  const { user, loggedIn } = useAuthStore();
  const { data } = useSpecificHotelData(id);
  const [displayReview, setDisplayReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [key, setKey] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amnetiesOption = [
    { label: "Gym", value: "gym", icons: <CgGym />, exist: data?.data?.gym },
    { label: "Bar", value: "bar", icons: <BiDrink />, exist: data?.data?.bar },
    {
      label: "Laundry",
      value: "laundry",
      icons: <MdOutlineLocalLaundryService />,
      exist: data?.data?.laundry,
    },
    {
      label: "Restaurant",
      value: "restaurant",
      icons: <IoMdRestaurant />,
      exist: data?.data?.restaurant,
    },
    {
      label: "Shopping",
      value: "shopping",
      icons: <MdShoppingCart />,
      exist: data?.data?.shopping,
    },
    {
      label: "Free Parking",
      value: "freeParking",
      icons: <MdLocalParking />,
      exist: data?.data?.freeParking,
    },
    {
      label: "Bike Rental",
      value: "bikeRental",
      icons: <MdDirectionsBike />,
      exist: data?.data?.bikeRental,
    },
    {
      label: "Free wifi",
      value: "freewifi",
      icons: <MdOutlineSignalWifiStatusbar4Bar />,
      exist: data?.data?.freewifi,
    },
    {
      label: "Movie Night",
      value: "movieNight",
      icons: <BiSolidCameraMovie />,
      exist: data?.data?.movieNight,
    },
    {
      label: "Swimming Pool",
      value: "swimmingPool",
      icons: <FaPersonSwimming />,
      exist: data?.data?.swimmingPool,
    },
    {
      label: "Coffee Shop",
      value: "coffeeShop",
      icons: <PiCoffeeFill />,
      exist: data?.data?.coffeeShop,
    },
  ];

  const fullStars = Math.floor(data?.data?.ratings?.averageRating);
  const hasHalfStar = data?.data?.ratings?.averageRating % 1 >= 0.5;

  const reviewMutation = useReviewMutation();

  const addReview = () => {
    setIsSubmitting(true);
    const postData = {
      hotelId: data?.data?._id,
      userId: user?.data?._id,
      score: rating,
      comment: reviewText,
    };
    reviewMutation.mutateAsync(["post", ``, postData], {
      onSuccess: (response) => {
        toast.success("Review added successfully");
        setRating(0);
        setKey(key + 1);
        setReviewText("");
        setIsSubmitting(false);
      },
      onError: (error) => {
        toast.error("Review adding failed");
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="pt-6 px-20 flex flex-col gap-4 bg-secondary">
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}/${data?.data?.image}`}
        alt="hotel"
        className="w-full h-[70vh]"
      />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{data?.data?.title}</h2>
        <div className="flex items-center gap-1 text-sm">
          <IoLocationOutline />
          <p>{`${data?.data?.city}, ${data?.data?.country}`}</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: fullStars }, (_, index) => (
            <FaStar key={index} fontSize={20} color="#FBC20B" />
          ))}
          {hasHalfStar && <FaStarHalfAlt fontSize={20} color="#FBC20B" />}
          {Array.from(
            { length: 5 - fullStars - (hasHalfStar ? 1 : 0) },
            (_, index) => (
              <FaRegStar
                key={index + fullStars + (hasHalfStar ? 1 : 0)}
                fontSize={20}
                color="#FBC20B"
              />
            )
          )}
          ( {data?.data?.ratings?.totalRating} rating )
        </div>
        <p className="text-base font-medium">Location Details</p>
        <p className="text-sm">{data?.data?.locationDescription}</p>
        <p className="text-base font-medium">About this hotel</p>
        <p className="text-sm">{data?.data?.description}</p>
        <p className="text-base font-medium">Popular Amneties</p>
        <div className="grid grid-cols-3 gap-5">
          {amnetiesOption.map(
            (item, index) =>
              item.exist && (
                <div className="flex gap-1 items-center rounded" key={index}>
                  {item.icons}
                  <label htmlFor={item?.value} className="cursor-pointer">
                    {item?.label}
                  </label>
                </div>
              )
          )}
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

        {/* Reviews */}
        <div className="my-10">
          <h2 className="text-xl font-bold">Customer reviews</h2>
          <div className="flex">
            {/* total review */}
            <div className="flex flex-col gap-1 mt-4 w-1/3">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: fullStars }, (_, index) => (
                    <FaStar key={index} fontSize={20} color="#FBC20B" />
                  ))}
                  {hasHalfStar && (
                    <FaStarHalfAlt fontSize={20} color="#FBC20B" />
                  )}
                  {Array.from(
                    { length: 5 - fullStars - (hasHalfStar ? 1 : 0) },
                    (_, index) => (
                      <FaRegStar
                        key={index + fullStars + (hasHalfStar ? 1 : 0)}
                        fontSize={20}
                        color="#FBC20B"
                      />
                    )
                  )}
                </div>
                <span className="text-xl font-medium text-[#343434]">
                  {parseFloat(data?.data?.ratings?.averageRating?.toFixed(1))}{" "}
                  out of 5
                </span>
              </div>
              <span className="text-lg cursor-pointer hover:underline font-normal tracking-tighter text-[#002D62]">
                {data?.data?.ratings?.totalRating} rating
              </span>
            </div>

            <div className="w-2/3">
              {/* Write your review */}
              <div className="flex flex-col gap-2">
                {loggedIn ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-lg text-white bg-[#1D293B] cursor-pointer"
                        onClick={() => navigate("/myProfile")}
                      >
                        {getInitials(user?.data?.fullname)}
                      </div>
                      <h2 className="text-xl font-medium">
                        {user?.data?.fullname}
                      </h2>
                    </div>
                    <h2
                      className="text-sm font-normal hover:underline cursor-pointer ml-14"
                      onClick={() => setDisplayReview(!displayReview)}
                    >
                      Write your review
                    </h2>
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-red-300 text-red-800 rounded-full text-sm py-2 w-1/3">
                    Login to add your reviews
                  </div>
                )}
                {displayReview && (
                  <div className="ml-14 flex flex-col gap-4">
                    <Rating
                      count={5}
                      key={key}
                      value={rating}
                      onChange={(newRating) => setRating(newRating)}
                      size={32}
                      activeColor="#FBC20B"
                    />
                    <textarea
                      className="resize-none w-full h-28 border border-[#8E8E93] rounded p-2 focus:border-gray-300"
                      placeholder="Write your review here"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    <div className="w-1/3">
                      <Button
                        btnName={
                          isSubmitting ? "Adding Review..." : "Add Review"
                        }
                        btnClick={addReview}
                        disabled={!rating || !reviewText.trim()}
                      />
                    </div>
                  </div>
                )}
              </div>

              <hr className="my-10" />

              {/* listed all reviews */}
              <div className="mt-10">
                {data?.data?.ratings?.individualRatings?.map((item, index) => {
                  const full = Math.floor(item?.score || 0);
                  const half = (item?.score || 0) % 1 >= 0.5;
                  return (
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            key={index}
                            className="w-11 h-11 rounded-full flex items-center justify-center text-lg text-white bg-[#1D293B] cursor-pointer"
                            onClick={() => navigate("/myProfile")}
                          >
                            {getInitials(item?.fullname)}
                          </div>
                          <h2 className="text-xl font-medium">
                            {item?.fullname}
                          </h2>
                        </div>
                        <div className="flex gap-1 ml-12">
                          {Array.from({ length: full }, (_, index) => (
                            <FaStar key={index} fontSize={20} color="#FBC20B" />
                          ))}
                          {hasHalfStar && (
                            <FaStarHalfAlt fontSize={20} color="#FBC20B" />
                          )}
                          {Array.from(
                            { length: 5 - full - (half ? 1 : 0) },
                            (_, index) => (
                              <FaRegStar
                                key={index + full + (half ? 1 : 0)}
                                fontSize={20}
                                color="#FBC20B"
                              />
                            )
                          )}
                        </div>
                        <div className="ml-12">{item?.comment}</div>
                      </div>
                      <div className="text-sm font-normal text-gray-800">
                        {timeAgo(item?.createdAt)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
