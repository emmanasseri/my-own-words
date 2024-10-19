import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"; // Your landing page component
import Home from "./pages/Home";
import Dispute from "./pages/Dispute";
import History from "./pages/History";
import { LoadingProvider } from "./contexts/LoadingContext";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <LoadingComponent />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dispute" element={<Dispute />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
