// controllers/mintController.js
const { mintNFTOnBlockchain } = require("../services/blockchain"); // Import blockchain minting logic
const { registerIPAsset } = require("../services/storyProtocolService");

// Controller function for minting an NFT
exports.mintNFT = async (req, res) => {
  const { userWalletAddress, metadataURI, tokenName, tokenLabel } = req.body;

  try {
    // Step 1: Mint the NFT on the blockchain
    console.log("Minting NFT on blockchain...");
    const { transactionHash, tokenId } = await mintNFTOnBlockchain(
      userWalletAddress,
      metadataURI,
      tokenName,
      tokenLabel
    );

    if (!transactionHash || !tokenId) {
      console.error("Failed to get transaction hash or tokenId from minting.");
      return res.status(500).json({
        success: false,
        error: "NFT minting failed, no transaction hash or tokenId returned.",
      });
    }
    console.log("NFT successfully minted. Transaction hash:", transactionHash);
    console.log("Minted token ID:", tokenId);

    // Step 2: Register the minted NFT as an IP asset on Story Protocol
    console.log("Registering IP asset on Story Protocol...");
    const storyResponse = await registerIPAsset(tokenId, metadataURI);

    if (!storyResponse) {
      console.error("Failed to get response from Story Protocol registration.");
      return res.status(500).json({
        success: false,
        error: "Story Protocol registration failed, no response returned.",
      });
    }
    console.log("Story Protocol registration response:", storyResponse);

    // Respond with success if both minting and registration succeeded
    res.json({
      success: true,
      transactionHash,
      storyResponse,
    });
  } catch (error) {
    // Detailed error logging for different failure points
    console.error(
      "Error during minting or registration process:",
      error.message
    );

    // Differentiate between minting and Story Protocol registration failures
    if (error.message.includes("mint")) {
      res.status(500).json({
        success: false,
        error: "NFT minting failed: " + error.message,
      });
    } else if (error.message.includes("Story Protocol")) {
      res.status(500).json({
        success: false,
        error: "Story Protocol registration failed: " + error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Unexpected error: " + error.message,
      });
    }
  }
};
