import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useBookingDataByUserId } from "../../hooks/useQueryData";
import loader from "../../assets/loader.gif";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed, FaUsers } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";

const BookingHistory = () => {
  const { user } = useAuthStore();

  const { data } = useBookingDataByUserId(user?.data?._id);

  const calculateDays = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays + 1;
  };

  return (
    <div>
      {data?.data?.length >= 1 ? (
        <div>
          <h2 className="text-xl font-bold">Booking History</h2>

          <div className="grid grid-cols-3 gap-4 my-5">
            {data?.data?.map((item, index) => (
              <div
                className="flex flex-col border rounded cursor-pointer"
                key={index}
              >
                <div className="h-60">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/${item.image}`}
                    alt="hotel"
                    className="rounded w-full h-full"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-xl font-bold">{item?.title}</h2>
                  <div className="flex items-center gap-1 text-sm">
                    <IoLocationOutline />
                    <p>{`${item?.city}, ${item?.country}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${
                        item?.bookedRooms[0].image
                      }`}
                      alt="hotel"
                      className="rounded w-1/2 h-full"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-base font-bold">
                        {item?.bookedRooms[0]?.title}
                      </h2>
                      <div className="flex text-sm justify-between items-center">
                        <p className="flex items-center gap-1">
                          <FaBed />
                          Bed: {item?.bookedRooms[0]?.bedCount}
                        </p>
                        <p className="flex items-center gap-1">
                          <FaUsers />
                          Guest: {item?.bookedRooms[0]?.guestCount}
                        </p>
                      </div>
                      <p>
                        Total Price:{" "}
                        <span className="font-semibold">
                          Rs {item.bookedRooms[0]?.totalPrice}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-3 items-center justify-between">
                    <div className="text-base font-bold">
                      From:{" "}
                      <span className="font-normal">
                        {formatDate(item?.bookedRooms[0]?.startDate)}
                      </span>
                    </div>
                    <div className="text-base font-bold">
                      To:{" "}
                      <span className="font-normal">
                        {formatDate(item?.bookedRooms[0]?.endDate)}
                      </span>
                    </div>
                  </div>
                  <button
                    className={` w-32 text-sm mt-4 py-2 font-bold rounded-md  bg-green-200 text-green-900 `}
                  >
                    Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center mt-20">
          <img src={loader} alt="loader" />
          Your booking history will appear here...
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
