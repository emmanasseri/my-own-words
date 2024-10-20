const { ethers } = require("ethers");
const { toHex } = require("viem");
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
const privateKey = process.env.PRIVATE_KEY;
const NFTContractAddress = process.env.CONTRACT_ADDRESS;
const userWalletAddress = process.env.WALLET_ADDRESS;

// Function to register an existing NFT as IP on Story Protocol
const mintAndRegisterIP = async (contentToRegister) => {
  try {
    const provider = new ethers.JsonRpcProvider(storyProviderUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Make sure the account is correctly configured
    const account = {
      address: wallet.address,
      signTypedData: async (domain, types, message) =>
        wallet._signTypedData(domain, types, message),
      signTransaction: async (transaction) =>
        wallet.signTransaction(transaction),
      sendTransaction: async (signedTransaction) =>
        provider.sendTransaction(signedTransaction),
    };

    const client = new StoryClient({
      account, // Ensure that account with the signer is attached
      transport: http(storyProviderUrl),
      chainId: "iliad",
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
