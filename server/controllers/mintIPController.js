// server/controllers/mintIPController.js
const { registerIPAssetOnStory } = require("../services/storyProtocolService");

exports.mintIP = async (req, res) => {
  const { tokenId, metadataURI } = req.body;

  try {
    const response = await registerIPAssetOnStory(tokenId, metadataURI);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/mintIPController.js
// const {
//   registerIpAssetOnStory,
// } = require("../services/storyRegistrationService");

// exports.mintIP = async (req, res) => {
//   const {
//     nftContract,
//     tokenId,
//     ipMetadataURI,
//     ipMetadataHash,
//     nftMetadataHash,
//     nftMetadataURI,
//   } = req.body;

//   try {
//     // Step 2: Register the NFT as IP on Story Protocol
//     const storyResponse = await registerIpAssetOnStory(
//       nftContract,
//       tokenId,
//       ipMetadataURI,
//       ipMetadataHash,
//       nftMetadataHash,
//       nftMetadataURI
//     );

//     console.log("Story Protocol registration successful:", storyResponse);

//     // Respond with the Story Protocol registration response
//     res.json({ success: true, storyResponse });
//   } catch (error) {
//     console.error("Error registering IP asset on Story Protocol:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to register IP asset on Story Protocol",
//     });
//   }
// };
