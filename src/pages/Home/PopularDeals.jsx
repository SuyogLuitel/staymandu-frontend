import React from "react";
import HotelCard from "../../components/HotelCard";
import { useHotelData } from "../../hooks/useQueryData";

const PopularDeals = () => {
  const { data } = useHotelData();

  return (
    <div className="pt-20 px-20 flex flex-col gap-8 bg-secondary">
      <h2 className="text-2xl font-bold">Popular property deals</h2>
      <div className="grid grid-cols-4 gap-8">
        {data?.data?.map((item, index) => (
          <HotelCard data={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PopularDeals;
