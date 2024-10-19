import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"; // Your landing page component
import Home from "./pages/Home";
import Dispute from "./pages/Dispute";
import History from "./pages/History";
import Tutorial from "./pages/Tutorial";
import { LoadingProvider } from "./contexts/LoadingContext";
import { Web3Provider } from "./contexts/Web3Context";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  return (
    <Web3Provider>
    <LoadingProvider>
      <Router>
        <LoadingComponent />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dispute" element={<Dispute />} />
          <Route path="/history" element={<History />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </Router>
    </LoadingProvider>
    </Web3Provider>
  );
}

export default App;
