// Home.js
import React from "react";
import Banner from "../components/Banner.jsx";
import FavoriteBooks from "../home/FavoriteBooks.jsx"

const Home = () => {
  return (
    <div>
      <Banner />
      <FavoriteBooks/>
    </div>
  );
};

export default Home;
