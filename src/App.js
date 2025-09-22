import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import JoinUs from "./Components/JoinUs";
import Voices from "./Components/Voices";
import AddVoices from "./admin/Components/AddVoices";
import AddBlogs from "./admin/Components/AddBlogs";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/voices" element={<Voices />} />
          <Route path="/add-voices" element={<AddVoices />} />
          <Route path="/add-blogs" element={<AddBlogs />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
