import axios from "axios";
import { useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";

const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

const MintComponent = () => {
  const { setIsLoading } = useLoading(); // Move useLoading to the component

  const uploadToIPFS = async (text: string): Promise<string | null> => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const data = { text };

    try {
      // Start loading
      setIsLoading(true);

      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`, // Ensure the JWT is passed correctly
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const ipfsHash = response.data.IpfsHash;
        console.log("Uploaded to IPFS: ", ipfsHash);

        // Call the minting function after uploading to IPFS
        await mintOnServer(ipfsHash);

        // Stop loading
        setIsLoading(false);

        return ipfsHash; // Return the content ID (CID)
      } else {
        console.error("Failed to upload to IPFS: ", response.status);
        setIsLoading(false); // Stop loading on error
        return null;
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      setIsLoading(false); // Stop loading on error
      return null;
    }
  };

  const mintOnServer = async (ipfsHash: string) => {
    try {
      // Start loading
      setIsLoading(true);

      const response = await fetch("http://localhost:3000/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: process.env.REACT_APP_USER_PUBLIC_KEY,
          metadataURI: ipfsHash,
          tokenName: "hardcoded",
          tokenLabel: "hardcoded",
        }),
      });

      const result = await response.json();
      console.log("Minting and Story Protocol registration result:", result);

      // Stop loading after the operation is complete
      setIsLoading(false);
    } catch (error) {
      console.error("Error minting NFT on server:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div>
      {/* Call uploadToIPFS or mintOnServer here based on user interaction */}
    </div>
  );
};

export default MintComponent;
