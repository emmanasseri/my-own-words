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
