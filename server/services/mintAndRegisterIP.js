const { ethers } = require("ethers");
const { toHex } = require("viem");
const {
  AddressZero,
  IpMetadata,
  PIL_TYPE,
  RegisterIpAndAttachPilTermsResponse,
  StoryClient,
  StoryConfig,
} = require("@story-protocol/core-sdk");
const { http } = require("viem");
const { createHash } = require("crypto");
const { uploadJSONToIPFS } = require("../utils/uploadToIPFS.js");

const storyProviderUrl = process.env.STORY_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const NFTContractAddress = process.env.NFT_CONTRACT_ADDRESS;

// Function to register an existing NFT as IP on Story Protocol
const mintAndRegisterIP = async (contentToRegister) => {
  console.log("content to register", contentToRegister);
  try {
    const provider = new ethers.JsonRpcProvider(storyProviderUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const client = new StoryClient({
      wallet,
      transport: http(storyProviderUrl),
      chainId: "iliad",
    });

    const removeCircular = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    //schema example
    const ipMetadata = client.ipAsset.generateIpMetadata(
      contentToRegister
      //{
      //   title: "My IP Asset",
      //   description: "This is a test IP asset",
      //   attributes: [
      //     {
      //       key: "Rarity",
      //       value: "Legendary",
      //     },
      //   ],
      //}
    );

    const nftMetadata = {
      name: "NFT representing ownership of IP Asset",
      description: "This NFT represents ownership of an IP Asset",
    };

    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
    const ipHash = createHash("sha256")
      .update(JSON.stringify(ipMetadata))
      .digest("hex");
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
    const nftHash = createHash("sha256")
      .update(JSON.stringify(nftMetadata))
      .digest("hex");

    const response = await client.assets.register({
      nftContract: NFTContractAddress,
      tokenId: tokenId,
      pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
      mintingFee: 0, // empty - doesn't apply
      currency: AddressZero, // empty - doesn't apply
      ipMetadata: {
        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        nftMetadataHash: `0x${nftHash}`,
      },
      txOptions: { waitForTransaction: true },
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
  mintAndRegisterIP,
};
