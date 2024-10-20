const express = require("express");
const { mintAndRegisterIP } = require("../services/mintAndRegisterIP");
const router = express.Router();

// POST route to mint and register IP
router.post("/api/mint-and-register-IP", async (req, res) => {
  try {
    const {
      userWalletAddress,
      ipMetadata,
      tokenName,
      tokenLabel,
      userLicenseData,
    } = req.body;

    // Directly calling the service
    const result = await mintAndRegisterIP(
      userWalletAddress,
      ipMetadata,
      tokenName,
      tokenLabel,
      userLicenseData
    );

    res.status(200).json(result); // Send the result back to the client
  } catch (error) {
    console.error("Error in mint-and-register-IP route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
