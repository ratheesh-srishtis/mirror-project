// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/About";
import JoinUs from "../Components/JoinUs";
import Voices from "../Components/Voices";
import Blogs from "../Components/Blogs";
import Home from "../Components/Home";
import Videos from "../Components/Videos";
import FAQ from "../Components/FAQ";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Public user routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/join-us" element={<JoinUs />} />
      <Route path="/voices" element={<Voices />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/videos/:region" element={<Videos />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
};

export default UserRoutes;
