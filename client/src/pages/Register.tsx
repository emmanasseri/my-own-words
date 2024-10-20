import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import theme from "../theme";
import axios from "axios";

const Register: React.FC = () => {
  const [selectedText, setSelectedText] = useState(""); // Track selected text
  const [buttonEnabled, setButtonEnabled] = useState(false); // Enable button based on selection
  const { setIsLoading } = useLoading(); // Trigger loading animation
  const navigate = useNavigate(); // Navigation hook
  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Pinata JWT for IPFS

  // Function to handle text selection in the browser
  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString() || "";
    setSelectedText(selectedText);
    setButtonEnabled(selectedText.length > 0); // Enable button if text is selected
  };

  // Listen for text selection
  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  // Upload the selected text to IPFS using Pinata
  const uploadToIPFS = async (text: string): Promise<string | null> => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const data = { text };

    try {
      // Start loading
      setIsLoading(true);

      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`, // Pass JWT token
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const ipfsHash = response.data.IpfsHash;
        console.log("Uploaded to IPFS: ", ipfsHash);

        // Call server to mint NFT and register IP asset
        await mintNFT(ipfsHash);

        setIsLoading(false); // Stop loading
        return ipfsHash; // Return IPFS hash
      } else {
        console.error("Failed to upload to IPFS:", response.status);
        setIsLoading(false); // Stop loading on error
        return null;
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      setIsLoading(false); // Stop loading on error
      return null;
    }
  };

  // Function to call the server and mint the NFT, register on Story Protocol
  const mintNFT = async (ipfsHash: string) => {
    try {
      // Start loading
      setIsLoading(true);

      // Send request to server to mint NFT and register on Story Protocol
      const response = await fetch("http://localhost:3000/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: process.env.REACT_APP_USER_PUBLIC_KEY,
          metadataURI: ipfsHash,
          tokenName: "hardcoded", // Replace with actual token name if needed
          tokenLabel: "hardcoded", // Replace with actual token label if needed
        }),
      });

      const result = await response.json();
      console.log("Minting and IP registration result:", result);

      if (result.success) {
        console.log("Minting successful. result:", result);
        registerNFTasIP(result.transactionHash);
      } else {
        console.error("Minting or registration failed:", result.error);
      }

      // Stop loading after the operation is complete
      setIsLoading(false);
    } catch (error) {
      console.error("Error minting NFT or registering IP on server:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  // Function to handle the button click
  const uploadAndMint = async () => {
    if (selectedText) {
      // Upload selected text to IPFS and mint NFT on server
      await uploadToIPFS(selectedText);
    }
  };

  const registerNFTasIP = async (transactionHash: string) => {
    try {
      // Start loading
      setIsLoading(true);

      // Send request to server to mint NFT and register on Story Protocol
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenID: 1,
          metadataURI: transactionHash,
        }),
      });

      const result = await response.json();
      console.log("IP registration result:", result);

      if (result.success) {
        console.log("Registration successful. result:", result);
        registerNFTasIP(result.transactionHash);
      } else {
        console.error("Minting or registration failed:", result.error);
      }

      // Stop loading after the operation is complete
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering IP on server:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <Box
      p={6}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={6}
    >
      {/* Heading */}
      <Text fontSize="2xl" fontWeight="bold">
        Highlight text to register it as IP
      </Text>

      {/* Image */}
      <Image
        src="/images/stars-and-lines.png"
        alt="Register IP"
        maxW="50%"
        mb={4}
      />

      {/* Block of text to highlight */}
      <Text fontSize="md" textAlign="left" width="100%">
        Highlight text from anywhere on your browser window, whether you're in
        Google Docs, Notion, Word online, or any other text editor. Once you've
        highlighted the text, click the button below to register it as an IP
        asset on Story Protocol. This may take a couple of minutes!
      </Text>

      {/* Mint button */}
      <Button
        bg={buttonEnabled ? "blue.500" : "gray.400"}
        color="white"
        _hover={buttonEnabled ? { bg: "blue.600" } : {}}
        p={1}
        disabled={!buttonEnabled}
        onClick={uploadAndMint}
      >
        Mint Selected Text
      </Button>
    </Box>
  );
};

export default Register;
