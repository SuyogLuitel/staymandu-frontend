import React from "react";
import loader from "../../assets/loader.gif";
import { useAuthStore } from "../../store/useAuthStore";
import HotelCard from "../../components/HotelCard";

const Favorites = () => {
  const { favorites } = useAuthStore();
  return (
    <>
      {favorites?.length === 0 ? (
        <div className="flex flex-col gap-3 items-center justify-center mt-20">
          <img src={loader} alt="loader" />
          Your favorites will appear here...
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Favorites</h2>
          <div className="grid grid-cols-4 gap-4">
            {favorites?.map((item, index) => (
              <HotelCard data={item} index={index} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
