import React from "react";
import Hero from "./Hero";
import BrowseByType from "./BrowseByType";
import PopularDeals from "./PopularDeals";
import PopularDestination from "./PopularDestination";
import Newsletter from "../../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrowseByType />
      <PopularDeals />
      <PopularDestination />
      <Newsletter />
    </div>
  );
};

export default Home;
