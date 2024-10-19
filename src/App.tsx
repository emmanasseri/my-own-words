import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Your landing page component
import Home from "./pages/Home"; // Your home component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Define the route for Home */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
