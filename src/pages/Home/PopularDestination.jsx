import React from "react";
import kathmandu from "../../assets/kathmandu.jpg";
import pokhara from "../../assets/pokhara.jpg";
import nagarkot from "../../assets/nagarkot.jpg";
import chitwan from "../../assets/chitwan.png";
import ilam from "../../assets/ilam.jpg";

const PopularDestination = () => {
  return (
    <div className="pt-20 px-20 flex flex-col gap-8 bg-secondary">
      <h2 className="text-2xl font-bold">Popular Destination</h2>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="relative h-[350px] rounded-2xl shadow-xl cursor-pointer group">
          <img
            src={kathmandu}
            alt="ktm"
            className="w-full h-full rounded-2xl shadow object-cover"
          />
          <div className="group-hover:absolute group-hover:inset-0 group-hover:bg-black group-hover:bg-opacity-40 group-hover:rounded-2xl"></div>
          <h2 className="text-white font-semibold text-2xl absolute top-5 left-5 hidden group-hover:block">
            Kathmandu
          </h2>
        </div>
        <div className="relative h-[350px] rounded-2xl shadow-xl cursor-pointer group">
          <img
            src={pokhara}
            alt="pokhara"
            className="w-full h-full rounded-2xl shadow object-cover"
          />
          <div className="group-hover:absolute group-hover:inset-0 group-hover:bg-black group-hover:bg-opacity-40 group-hover:rounded-2xl"></div>
          <h2 className="text-white font-semibold text-2xl absolute top-5 left-5 hidden group-hover:block">
            Pokhara
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="relative h-[250px] rounded-2xl shadow-xl cursor-pointer group">
          <img
            src={nagarkot}
            alt="nagarkot"
            className="w-full h-full rounded-2xl shadow object-cover"
          />
          <div className="group-hover:absolute group-hover:inset-0 group-hover:bg-black group-hover:bg-opacity-40 group-hover:rounded-2xl"></div>
          <h2 className="text-white font-semibold text-2xl absolute top-5 left-5 hidden group-hover:block">
            Nagarkot
          </h2>
        </div>
        <div className="relative h-[250px] rounded-2xl shadow-xl cursor-pointer group">
          <img
            src={chitwan}
            alt="chitwan"
            className="w-full h-full rounded-2xl shadow object-cover"
          />
          <div className="group-hover:absolute group-hover:inset-0 group-hover:bg-black group-hover:bg-opacity-40 group-hover:rounded-2xl"></div>
          <h2 className="text-white font-semibold text-2xl absolute top-5 left-5 hidden group-hover:block">
            Chitwan
          </h2>
        </div>
        <div className="relative h-[250px] rounded-2xl shadow-xl cursor-pointer group">
          <img
            src={ilam}
            alt="ilam"
            className="w-full h-full rounded-2xl shadow object-cover"
          />
          <div className="group-hover:absolute group-hover:inset-0 group-hover:bg-black group-hover:bg-opacity-40 group-hover:rounded-2xl"></div>
          <h2 className="text-white font-semibold text-2xl absolute top-5 left-5 hidden group-hover:block">
            Ilam
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PopularDestination;
