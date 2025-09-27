// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AppRoutes from "./config/routes";
function App() {
  return (
    <Router basename="/mirror-project">
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
