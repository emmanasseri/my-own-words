// routes/mint.js
const express = require("express");
const { mintNFT } = require("../controllers/mintController"); // Import the controller function
const router = express.Router();

// POST route to mint an NFT
router.post("/mint", mintNFT);

module.exports = router;
