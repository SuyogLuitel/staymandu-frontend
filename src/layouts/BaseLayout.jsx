import React from "react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default BaseLayout;
