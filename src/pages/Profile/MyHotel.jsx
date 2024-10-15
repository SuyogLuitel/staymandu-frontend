import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useHotelDataByUserId } from "../../hooks/useQueryData";
import HotelCard from "../../components/HotelCard";

const MyHotel = () => {
  const { user } = useAuthStore();
  const { data } = useHotelDataByUserId(user.data._id);
  return (
    <div>
      <h2 className="text-xl font-bold">My Hotels</h2>
      <div className="grid grid-cols-4 gap-8 mt-8">
        {data?.data?.map((item, index) => (
          <HotelCard data={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
