const { StoryClient } = require("@story-protocol/core-sdk");

// Initialize Story Protocol client (ensure you have the right environment setup)
const client = StoryClient.newClient({
  transport: http(process.env.STORY_RPC_URL),
  account: new ethers.Wallet(process.env.PRIVATE_KEY),
  chainId: 80002, // Ensure you're on the right testnet
});

// Function to register the IP asset on Story Protocol
exports.registerIPAsset = async (tokenId, metadataURI) => {
  try {
    const result = await client.assets.register({
      tokenId: tokenId,
      metadataURI: metadataURI,
    });
    return result; // Return the Story Protocol response
  } catch (error) {
    console.error("Error registering IP asset on Story Protocol:", error);
    throw new Error("Failed to register asset on Story Protocol");
  }
};
