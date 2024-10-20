// server/services/storyProtocolService.js
const axios = require("axios");

const STORY_API_URL = "https://api.storyprotocol.net";
const STORY_CHAIN_ID = "story-testnet";
const STORY_API_KEY = process.env.STORY_API_KEY; // Store API key in environment variable

// Function to register an IP asset on Story Protocol via the API
const registerIPAssetOnStory = async (tokenId, metadataURI) => {
  try {
    const response = await axios.post(
      `${STORY_API_URL}/assets/register`,
      { tokenId, metadataURI },
      {
        headers: {
          "X-CHAIN": STORY_CHAIN_ID,
          "X-API-Key": STORY_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error registering IP asset:",
      error.response?.data || error.message
    );
    throw new Error("Failed to register IP asset on Story Protocol API");
  }
};

module.exports = { registerIPAssetOnStory };
