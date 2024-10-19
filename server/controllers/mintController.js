// controllers/mintController.js
const { mintNFTOnBlockchain } = require("../services/blockchain"); // Import blockchain minting logic

// Controller function for minting an NFT
exports.mintNFT = async (req, res) => {
  const { userWalletAddress, metadataURI, tokenName, tokenLabel } = req.body;

  try {
    // Call the blockchain service to mint the NFT
    const txHash = await mintNFTOnBlockchain(
      userWalletAddress,
      metadataURI,
      tokenName,
      tokenLabel
    );

    // Respond with success if the transaction was successful
    res.json({ success: true, transactionHash: txHash });
  } catch (error) {
    console.error("Error minting NFT:", error);

    // Respond with an error message if the minting failed
    res.status(500).json({ success: false, error: "Failed to mint NFT" });
  }
};
