import React from "react";
import Hero from "./Hero";
import BrowseByType from "./BrowseByType";
import PopularDeals from "./PopularDeals";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrowseByType />
      <PopularDeals />
    </div>
  );
};

export default Home;
