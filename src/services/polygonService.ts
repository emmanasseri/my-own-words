import { ethers } from "ethers";

// Load environment variables (private key and RPC URL)
const privateKey = process.env.REACT_APP_WALLET_PRIVATE_KEY;
const rpcUrl = process.env.REACT_APP_POLYGON_RPC_URL;
const userWalletAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Hardcoded address for now

declare global {
  interface Window {
    ethereum?: any;
  }
}
export const mintNFT = async (
  recipient: string,
  metadataURI: string,
  tokenName: string,
  tokenLabel: string
) => {
  try {
    // Check if the browser has injected the Ethereum provider (like MetaMask)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Use `await` to get the resolved signer
      const signer = await provider.getSigner();

      const nftAbi = [
        "function mintNFT(address recipient, string memory metadataURI, string memory tokenName, string memory tokenLabel) public returns (uint256)",
      ];
      const contractAddress = "0xYourNFTContractAddress"; // Replace with your contract's address

      const nftContract = new ethers.Contract(contractAddress, nftAbi, signer);

      // Call mintNFT with four arguments
      const transaction = await nftContract.mintNFT(
        recipient,
        metadataURI,
        tokenName,
        tokenLabel
      );
      const receipt = await transaction.wait();
      console.log(`NFT minted! Transaction hash: ${receipt.transactionHash}`);
    } else {
      throw new Error("Ethereum provider not found. Please install MetaMask.");
    }
  } catch (error) {
    console.error("Error minting NFT:", error);
  }
};
