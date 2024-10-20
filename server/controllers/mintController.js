// controllers/mintController.js
const { ethers } = require("ethers");
const { StoryClient } = require("@story-protocol/core-sdk");
const { mintNFTOnBlockchain } = require("../services/blockchain"); // Import blockchain minting logic
const { registerIPAsset } = require("../services/storyProtocolService");

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

    console.log("Transaction hash:", txHash);
    const storyResponse = await registerIPAsset(tokenId, metadataURI);
    console.log("Story Protocol registration response:", storyResponse);

    // Respond with success if both minting and registration succeeded
    res.json({ success: true, transactionHash: txHash, storyResponse });
    // Respond with success if the transaction was successful
    res.json({ success: true, transactionHash: txHash });
  } catch (error) {
    console.error("Error minting NFT or registering on Story Protocol:", error);
    res.status(500).json({
      success: false,
      error: "Failed to mint NFT or register on Story Protocol",
    });
  }
};
