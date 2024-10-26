import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { truncateText } from "../utils/truncateText";

const HotelCard = ({ data, index }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fullStars = Math.floor(data?.ratings?.averageRating);
  const hasHalfStar = data?.ratings?.averageRating % 1 >= 0.5;

  const isAdmin = location.pathname === "/myProfile" ? { admin: "true" } : {};

  return (
    <div
      className="flex flex-col border rounded cursor-pointer hover:mt-1"
      onClick={() => navigate(`/hotel/${data?._id}`, { state: isAdmin })}
      key={index}
    >
      <div className="h-1/2">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${data.image}`}
          alt="hotel"
          className="rounded w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold">{data?.title}</h2>
        <p className="text-sm">{truncateText(data?.description)}</p>
        <div className="flex items-center gap-1 text-sm">
          <IoLocationOutline />
          <p>{`${data?.streetname}, ${data?.city}`}</p>
        </div>
        <div className="text-lg font-semibold">
          Rs {data?.rooms[0]?.roomPrice}
        </div>
        <div className="flex flex-col gap-1">
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
            ({data?.ratings?.averageRating})
          </div>
          <p>
            ( {data?.ratings?.totalRating}{" "}
            {data?.ratings?.totalRating > 1 ? "ratings" : "rating"} )
          </p>
        </div>
        {location.pathname === "/myProfile" && (
          <div className="flex items-center gap-2 mt-4">
            <button
              className="py-2 px-3 text-white text-sm bg-[#1D293B] hover:bg-[#2c3b52] rounded"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/hotel/add", { state: edit });
              }}
            >
              Update
            </button>
            <button
              className="py-2 px-3 text-white text-sm bg-[#1D293B] hover:bg-[#2c3b52] rounded"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/hotel/room/add", {
                  state: { id: data?._id, name: data?.title },
                });
              }}
            >
              Add Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
