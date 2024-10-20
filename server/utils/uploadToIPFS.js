const axios = require("axios");

const PINATA_JWT = process.env.PINATA_JWT; // Ensure the JWT is correctly stored in your environment variables

// Function to upload JSON to IPFS using Pinata's API
const uploadJSONToIPFS = async (jsonData) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try {
    const response = await axios.post(url, jsonData, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`, // Pass the JWT in the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const ipfsHash = response.data.IpfsHash;
      console.log("Uploaded JSON to IPFS: ", ipfsHash);
      return ipfsHash; // Return the IPFS hash
    } else {
      console.error("Failed to upload to IPFS: ", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error.message);
    return null;
  }
};

// Function to upload a file (e.g., audio or any binary file) to IPFS using Pinata's API
const uploadFileToIPFS = async (filePath) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  const file = fs.createReadStream(filePath); // Read the file as a stream

  formData.append("file", file);

  const options = {
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`, // Pass the JWT
      ...formData.getHeaders(), // Important: Add the headers from FormData
    },
  };

  try {
    const response = await axios.post(url, formData, options);

    if (response.status === 200) {
      const ipfsHash = response.data.IpfsHash;
      console.log("Uploaded file to IPFS: ", ipfsHash);
      return ipfsHash;
    } else {
      console.error("Failed to upload file to IPFS: ", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.message);
    return null;
  }
};

module.exports = { uploadJSONToIPFS, uploadFileToIPFS };
