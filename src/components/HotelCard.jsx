import React from "react";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ data, index }) => {
  const navigate = useNavigate();

  const fullStars = Math.floor(data?.ratings?.averageRating);
  const hasHalfStar = data?.ratings?.averageRating % 1 >= 0.5;

  return (
    <div
      className="flex flex-col border rounded cursor-pointer hover:mt-1"
      onClick={() => navigate(`/hotel/${data?._id}`)}
    >
      <div>
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${data.image}`}
          alt="hotel"
          className="rounded w-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold">{data?.title}</h2>
        <p className="text-sm">{data?.description}</p>
        <div className="flex items-center gap-1 text-sm">
          <IoLocationOutline />
          <p>{`${data?.city}, ${data?.country}`}</p>
        </div>
        <div className="text-base font-semibold">Rs 1400</div>
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
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
