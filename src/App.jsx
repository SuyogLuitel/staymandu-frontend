import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Hotel from "./pages/Hotel/Hotel";
import HotelDetail from "./pages/Hotel/HotelDetail";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { loggedIn } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          {loggedIn && (
            <>
              <Route path="/myProfile" element={<Profile />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
