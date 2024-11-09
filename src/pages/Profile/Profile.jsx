import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBookmark, FaHotel, FaRegHeart } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuthStore } from "../../store/useAuthStore";
import ProfileSection from "./ProfileSection";
import Favorites from "./Favorites";
import MyHotel from "./MyHotel";
import BookingHistory from "./BookingHistory";
import { useLocation } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { useFavorite } from "../../hooks/useQueryData";

const Profile = () => {
  const location = useLocation();
  const { activeNum } = location.state || {};
  const { user } = useAuthStore();
  const { data: favData } = useFavorite(user?.data?._id);

  const { logout } = useAuthStore();
  const [active, setActive] = useState(activeNum || 0);

  return (
    <div className="flex">
      <div className="h-screen sticky top-0 bg-gray-50 w-[20%] p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <ul className="space-y-4">
          <li
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded ${
              active === 0 && "bg-gray-200"
            }`}
            onClick={() => setActive(0)}
          >
            <CgProfile fontSize={28} />
            <span>Profile</span>
          </li>
          <li
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded ${
              active === 1 && "bg-gray-200"
            }`}
            onClick={() => setActive(1)}
          >
            <FaRegHeart fontSize={24} />
            <span>Favorites</span>
            <div className="bg-red-200 text-red-700 rounded-full w-7 h-7 flex justify-center text-sm items-center p-2">
              {favData?.data?.length}
            </div>
          </li>
          {/* <li
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded ${
              active === 2 && "bg-gray-200"
            }`}
            onClick={() => setActive(2)}
          >
            <FaHotel fontSize={24} />
            <span>My Hotels</span>
          </li> */}
          <li
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded ${
              active === 3 && "bg-gray-200"
            }`}
            onClick={() => setActive(3)}
          >
            <FaBookmark fontSize={24} />
            <span>Booking History</span>
          </li>
          <li
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded ${
              active === 4 && "bg-gray-200"
            }`}
            onClick={() => setActive(4)}
          >
            <RiLockPasswordFill fontSize={24} />
            <span>Change Password</span>
          </li>
          <li
            className={`flex items-center space-x-2 cursor-pointer text-red-600 hover:bg-gray-200 p-2 rounded ${
              active === 5 && "bg-gray-200"
            }`}
            onClick={() => logout()}
          >
            <LuLogOut fontSize={24} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="w-[80%] p-4">
        {active === 0 ? (
          <ProfileSection />
        ) : active === 1 ? (
          <Favorites />
        ) : // ) : active === 2 ? (
        //   <MyHotel />
        active === 3 ? (
          <BookingHistory />
        ) : active === 4 ? (
          <ChangePassword />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
