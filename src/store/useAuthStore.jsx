import { create } from "zustand";
import Cookies from "universal-cookie";
import { decryptedData, encryptData } from "../utils/crypto";
import toast from "react-hot-toast";

const cookies = new Cookies();

const authStore = (set) => ({
  loggedIn: decryptedData(cookies.get("user"))?.token ? true : false,
  user: decryptedData(cookies.get("user")) || null,
  favorites: decryptedData(cookies.get("favorites")) || [],

  setUser: (user) => {
    set(() => {
      cookies.set("user", encryptData(user));
      return { user: user, loggedIn: true };
    });
  },

  logout: () => {
    set(() => {
      cookies.remove("user");
      return {
        loggedIn: false,
        user: null,
      };
    });
    toast.success("Logout successfully");
  },

  addFavorite: (hotel) =>
    set((state) => {
      if (!state.favorites.some((fav) => fav?._id === hotel?._id)) {
        const newFavorites = [...state.favorites, hotel];
        cookies.set("favorites", encryptData(newFavorites));
        toast.success(`Hotel added to favorites!`);
        return { favorites: newFavorites };
      }
    }),

  removeFavorite: (hotelId) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (hotel) => hotel?._id !== hotelId
      );
      cookies.set("favorites", encryptData(updatedFavorites));
      toast.success("Removed from favorites!");
      return { favorites: updatedFavorites };
    }),
});

export const useAuthStore = create(authStore);
