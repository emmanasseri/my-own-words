const { isAddress, ethers } = require("ethers");
const { toHex } = require("viem");
const { Account, privateKeyToAccount, Address } = require("viem/accounts");
const {
  AddressZero,
  PIL_TYPE,
  StoryClient,
} = require("@story-protocol/core-sdk");
const { http } = require("viem");
const { mintNFTOnBlockchain } = require("./blockchain.js");
const { createHash } = require("crypto");
const { uploadJSONToIPFS } = require("../utils/uploadToIPFS.js");

const storyProviderUrl = process.env.STORY_RPC_URL;
const NFTContractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

if (
  !storyPrivateKey ||
  !storyPrivateKey.startsWith("0x") ||
  storyPrivateKey.length !== 66
) {
  throw new Error(
    'Invalid private key format. Ensure it starts with "0x" and is 66 characters long.'
  );
}
const storyPrivateKey = `0x${process.env.STORY_PRIVATE_KEY}`;
const account = privateKeyToAccount(storyPrivateKey);
if (!isAddress(account.address)) {
  throw new Error("Invalid account address generated.");
}

// Function to register an existing NFT as IP on Story Protocol
const mintAndRegisterIP = async (contentToRegister) => {
  try {
    // Set up ethers provider and wallet
    const provider = new ethers.JsonRpcProvider(storyProviderUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Initialize StoryClient with wallet (directly)
    const client = new StoryClient({
      wallet, // Use wallet directly
      transport: http(storyProviderUrl),
      chainId: "iliad", // Story's testnet chain ID
    });

    // Prepare the IP metadata and NFT metadata
    const ipMetadata = client.ipAsset.generateIpMetadata({
      title: "My IP Asset",
      description: "This is a test IP asset",
      attributes: [
        {
          key: "Rarity",
          value: "Legendary",
        },
      ],
    });

    const nftMetadata = {
      name: "NFT representing ownership of IP Asset",
      description: "This NFT represents ownership of an IP Asset",
    };

    // Upload metadata to IPFS
    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
    const ipHash = createHash("sha256")
      .update(JSON.stringify(ipMetadata))
      .digest("hex");

    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
    const nftHash = createHash("sha256")
      .update(JSON.stringify(nftMetadata))
      .digest("hex");

    // Mint the NFT on blockchain
    const data = await mintNFTOnBlockchain(
      wallet,
      ipIpfsHash,
      " ",
      nftMetadata.description
    );
    const tokenId = data.tokenId.toString();

    // Register the IP asset with Story Protocol
    const response = await client.ipAsset.register({
      nftContract: NFTContractAddress,
      tokenId: tokenId,
      pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
      mintingFee: 0, // No fee
      currency: AddressZero, // No currency
      ipMetadata: {
        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        nftMetadataHash: `0x${nftHash}`,
      },
      txOptions: {
        gasLimit: ethers.utils.hexlify(21000), // Set gas limit
        gasPrice: ethers.utils.parseUnits("50", "gwei"), // Set gas price
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
  mintAndRegisterIP,
};
