// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mintRoutes = require("./routes/mint"); // Import mint routes
//const registerRoutes = require("./routes/register"); // Import register routes

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

app.use(cors());

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Define the routes for minting and registering NFTs
app.use("/api", mintRoutes);
//app.use("/api/register", registerRoutes);

// Default route for health check (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Set the port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
