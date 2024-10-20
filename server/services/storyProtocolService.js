// server/services/storyProtocolService.js
const axios = require("axios");

const STORY_API_URL = "https://api.storyprotocol.net";
const STORY_CHAIN_ID = "story-testnet";
const API_KEY = process.env.STORY_API_KEY; // Store API key in environment variable

// Function to register an IP asset on Story Protocol via the API
const registerIPAssetOnStory = async (tokenId, metadataURI) => {
  try {
    const response = await axios.post(
      `${STORY_API_URL}/assets/register`,
      { tokenId, metadataURI },
      {
        headers: {
          "X-CHAIN": STORY_CHAIN_ID,
          "X-API-Key": API_KEY,
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

// const { StoryClient } = require("@story-protocol/core-sdk");
// const { http } = require("viem");
// const { ethers } = require("ethers");
// const { iliad } = require("@story-protocol/core-sdk");

// // const iliad = {
// //   id: 1513,
// //   name: "Story Network Testnet",
// //   nativeCurrency: {
// //     name: "Testnet IP",
// //     symbol: "IP",
// //     decimals: 18,
// //   },
// //   rpcUrls: {
// //     default: { http: ["https://testnet.storyrpc.io"] }, // Correct RPC URL
// //   },
// //   blockExplorers: {
// //     default: { name: "Storyscan", url: "https://testnet.storyscan.xyz" },
// //   },
// //   testnet: true,
// // };

// // Manually pass chainId if SDK doesn't support it
// const client = StoryClient.newClient({
//   transport: http(iliad.rpcUrls.default.http[0]),
//   account: new ethers.Wallet(process.env.PRIVATE_KEY),
//   chainId: iliad.id, // Manually force chainId: 1513
// });

// // Function to register the IP asset on Story Protocol
// exports.registerIPAsset = async (tokenId, metadataURI) => {
//   try {
//     const result = await client.assets.register({
//       tokenId: tokenId,
//       metadataURI: metadataURI,
//     });
//     return result; // Return the Story Protocol response
//   } catch (error) {
//     console.error("Error registering IP asset on Story Protocol:", error);
//     throw new Error("Failed to register asset on Story Protocol");
//   }
// };
