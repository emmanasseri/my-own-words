// services/blockchain.js
require("dotenv").config();

const { ethers } = require("ethers");

const { JsonRpcProvider } = require("ethers");

// Initialize provider using the RPC URL from environment variables
//const provider = new ethers.JsonRpcProvider(process.env.STORY_RPC_URL);
const provider = new ethers.JsonRpcProvider(
  process.env.POLYGON_RPC_PROVIDER_URL,
  80002
);

provider.getNetwork().then((network) => {
  console.log("Connected to network:", network.name); // Should be "amoy"
  console.log("Chain ID:", network.chainId); // Should be 80002 for Amoy Testnet
});

// If you are hardcoding the wallet address as an env variable (not ideal for private key handling)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Replace this with your deployed smart contract address
const contractAddress = process.env.CONTRACT_ADDRESS;

// ABI for the NFT contract's minting function
const contractABI = require("../abi/TokenContractABI.json"); // Use require to import ABI

// Initialize the contract
const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

// Function to mint the NFT on the blockchain
exports.mintNFTOnBlockchain = async (
  recipient,
  metadataURI,
  tokenName,
  tokenLabel
) => {
  try {
    // Call the mintNFT function on the smart contract
    const tx = await contract.mintNFT(
      recipient,
      metadataURI,
      tokenName,
      tokenLabel
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Return the transaction hash
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error minting NFT on blockchain:", error);
    throw new Error("Minting failed on the blockchain.");
  }
};
