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
import Contact from "../Components/Contact";
import ViewBlog from "../Components/ViewBlog";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Public user routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/share-with-us" element={<JoinUs />} />
      <Route path="/voices" element={<Voices />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/videos/:region" element={<Videos />} />
      <Route path="/view-blog/:name" element={<ViewBlog />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default UserRoutes;
