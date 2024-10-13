import React from "react";
import Hero from "./Hero";
import BrowseByType from "./BrowseByType";
import PopularDeals from "./PopularDeals";
import PopularDestination from "./PopularDestination";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrowseByType />
      <PopularDeals />
      <PopularDestination />
    </div>
  );
};

export default Home;
