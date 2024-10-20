//import axios from "axios";
// import { useState } from "react";
// import { useLoading } from "../../contexts/LoadingContext";

// const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

const MintComponent = () => {
  //   const { setIsLoading } = useLoading(); // Move useLoading to the component
  //   const uploadToIPFS = async (text: string): Promise<string | null> => {
  //     const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //     const data = { text };
  //     try {
  //       // Start loading
  //       setIsLoading(true);
  //       const response = await axios.post(url, data, {
  //         headers: {
  //           Authorization: `Bearer ${PINATA_JWT}`, // Ensure the JWT is passed correctly
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.status === 200) {
  //         const ipfsHash = response.data.IpfsHash;
  //         console.log("Uploaded to IPFS: ", ipfsHash);
  //         // Call the minting function after uploading to IPFS
  //         await mintNFTOnServer(ipfsHash);
  //         // Stop loading
  //         setIsLoading(false);
  //         return ipfsHash; // Return the content ID (CID)
  //       } else {
  //         console.error("Failed to upload to IPFS: ", response.status);
  //         setIsLoading(false); // Stop loading on error
  //         return null;
  //       }
  //     } catch (error) {
  //       console.error("Error uploading to IPFS:", error);
  //       setIsLoading(false); // Stop loading on error
  //       return null;
  //     }
  //   };
  //   const mintNFTOnServer = async (ipfsHash: string) => {
  //     try {
  //       // Start loading
  //       setIsLoading(true);
  //       // Step 1: Mint the NFT
  //       const mintResponse = await fetch("http://localhost:3000/api/mint", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userWalletAddress: process.env.REACT_APP_USER_PUBLIC_KEY,
  //           metadataURI: ipfsHash,
  //           tokenName: "hardcoded", // Placeholder, replace with actual token name
  //           tokenLabel: "hardcoded", // Placeholder, replace with actual token label
  //         }),
  //       });
  //       const mintResult = await mintResponse.json();
  //       if (mintResult.success) {
  //         console.log("NFT minted successfully:", mintResult.transactionHash);
  //         // Step 2: Register the minted NFT as an IP asset on Story Protocol
  //         const registerIPResponse = await fetch(
  //           "http://localhost:3000/api/register-ip",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               nftContract: process.env.REACT_APP_NFT_CONTRACT_ADDRESS, // Example NFT contract address
  //               tokenId: "12", // Example token ID, replace with actual token ID from minting result
  //               ipMetadataURI: "ipfs://example_ip_metadata_uri",
  //               ipMetadataHash: "0xYourIPMetadataHash", // Example hash, replace with actual
  //               nftMetadataHash: "0xYourNFTMetadataHash", // Example hash, replace with actual
  //               nftMetadataURI: ipfsHash, // The same metadata URI used for minting
  //             }),
  //           }
  //         );
  //         const registerIPResult = await registerIPResponse.json();
  //         if (registerIPResult.success) {
  //           console.log(
  //             "NFT registered as IP successfully:",
  //             registerIPResult.storyResponse
  //           );
  //         } else {
  //           console.error(
  //             "Error registering IP on Story Protocol:",
  //             registerIPResult.error
  //           );
  //         }
  //       } else {
  //         console.error("Error minting NFT:", mintResult.error);
  //       }
  //       // Stop loading after the operation is complete
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error minting NFT or registering IP on server:", error);
  //       setIsLoading(false); // Stop loading on error
  //     }
  //   };
  //   return (
  //     <div>
  //       {/* Call uploadToIPFS or mintOnServer here based on user interaction */}
  //     </div>
  //   );
};

export default MintComponent;
