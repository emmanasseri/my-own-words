// services/blockchain.js
require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
  process.env.POLYGON_RPC_PROVIDER_URL,
  80002
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("../abi/TokenContractABI.json");
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

    // Log the receipt for debugging purposes
    console.log("Transaction receipt:", JSON.stringify(receipt, null, 2));

    const address = receipt.logs[0].address;
    const tokenIdHex = receipt.logs[0].topics[3];
    //const tokenId = ethers.BigNumber.from(tokenIdHex).toString();
    console.log("Token ID (decimal):", tokenIdHex);
    const tokenId = BigInt(tokenIdHex).toString();

    // console.log(
    //   "Minting successful, transaction hash:",
    //   receipt.transactionHash
    // );
    console.log("Minted token ID:", tokenId);

    // Return both transaction hash and token ID
    return { transactionHash: receipt.transactionHash, tokenId };
  } catch (error) {
    console.error("Error minting NFT on blockchain:", error.message);
    throw new Error("Minting failed on the blockchain.");
  }
};
