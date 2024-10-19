import axios from "axios";
import { useState } from "react";

const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

// Function to upload the text to IPFS
export const uploadToIPFS = async (text: string): Promise<string | null> => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const data = { text };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`, // Ensure the JWT is passed correctly
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const ipfsHash = response.data.IpfsHash;
      console.log("Uploaded to IPFS: ", ipfsHash);
      return ipfsHash; // Return the content ID (CID)
    } else {
      console.error("Failed to upload to IPFS: ", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return null;
  }
};
