import React from "react";
import loader from "../../assets/loader.gif";

const Favorites = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-20">
      <img src={loader} alt="loader" />
      Your favorites will appear here...
    </div>
  );
};

export default Favorites;
