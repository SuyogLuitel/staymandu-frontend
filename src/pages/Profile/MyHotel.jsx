import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useHotelDataByUserId } from "../../hooks/useQueryData";
import HotelCard from "../../components/HotelCard";
import loader from "../../assets/loader.gif";

const MyHotel = () => {
  const { user } = useAuthStore();
  const { data } = useHotelDataByUserId(user.data._id);

  return (
    <>
      {data?.data?.length >= 1 ? (
        <div>
          <h2 className="text-xl font-bold">My Hotels</h2>
          <div className="grid grid-cols-4 gap-8 mt-8">
            {data?.data?.map((item, index) => (
              <HotelCard data={item} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center mt-20">
          <img src={loader} alt="loader" />
          Your hotels will appear here...
        </div>
      )}
    </>
  );
};

export default MyHotel;
