import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"; // Your landing page component
import Home from "./pages/Home"; // Your home component
import { LoadingProvider } from "./contexts/LoadingContext";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <LoadingComponent />
        <Routes>
          {/* Define the route for the LandingPage */}
          <Route path="/" element={<Landing />} />

          {/* Define the route for Home */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
