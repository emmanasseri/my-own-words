const { ethers } = require("ethers");
const { StoryClient, http } = require("@story-protocol/core-sdk");
const { toHex } = require("viem");

const storyProviderUrl = process.env.STORY_RPC_URL; // Ensure this is set in your .env
const privateKey = process.env.PRIVATE_KEY; // Ensure private key is stored here

// Function to register an existing NFT as IP on Story Protocol
const registerIpAssetOnStory = async (
  nftContract,
  tokenId,
  ipMetadataURI,
  ipMetadataHash,
  nftMetadataHash,
  nftMetadataURI
) => {
  try {
    const provider = new ethers.JsonRpcProvider(storyProviderUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const client = new StoryClient({
      wallet,
      transport: http(storyProviderUrl),
      chainId: "iliad",
    });

    const response = await client.assets.register({
      nftContract,
      tokenId,
      ipMetadata: {
        ipMetadataURI,
        ipMetadataHash: toHex(ipMetadataHash, { size: 32 }),
        nftMetadataHash: toHex(nftMetadataHash, { size: 32 }),
        nftMetadataURI,
      },
      txOptions: {
        waitForTransaction: true,
      },
    });

    console.log(
      `IP asset registered. TX Hash: ${response.txHash}, IP ID: ${response.ipId}`
    );
    return { txHash: response.txHash, ipId: response.ipId };
  } catch (error) {
    console.error("Error registering IP asset on Story Protocol:", error);
    throw new Error("Failed to register IP on Story Protocol");
  }
};

module.exports = {
  registerIpAssetOnStory,
};
