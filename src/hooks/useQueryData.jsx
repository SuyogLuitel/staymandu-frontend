import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useQueryData = (key, path, params = "", enabled = true) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: params,
      }).then((res) => res?.data && res?.data),
    enabled,
  });
};

export const useHotelData = (page, sortBy) =>
  useQueryData(
    ["hotel", page, sortBy],
    `api/v1/hotel/list?page=${page}&sortBy=${sortBy}`,
    ""
  );

export const useNearestHotelData = (longitude, latitude, page, sortBy) =>
  useQueryData(
    ["nearest-hotel", longitude, latitude, page, sortBy],
    `api/v1/hotel/nearest?longitude=${longitude}&latitude=${latitude}&page=${page}&sortBy=${sortBy}`,
    "",
    longitude !== null && latitude !== null
  );

export const useSpecificHotelData = (id) =>
  useQueryData(["hotelById", id], `api/v1/hotel/${id}`, "");

export const useHotelDataByUserId = (id) =>
  useQueryData(["hotelByUserId", id], `api/v1/hotel/list/${id}`, "");

export const useBookingDataByUserId = (id) =>
  useQueryData(["bookingByUserId", id], `api/v1/hotel/booking/${id}`, "");
