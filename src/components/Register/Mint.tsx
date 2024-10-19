import axios from "axios";

const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

export const uploadToIPFS = async (text: string): Promise<string | null> => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const data = {
    text: text, // The text you're uploading
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: process.env.REACT_APP_PINATA_JWT, // Ensure the JWT is correctly passed
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

export const mintText = (text: string) => {
  console.log("Minting the following text as IP:", text);
  // You can keep other minting logic here
};
