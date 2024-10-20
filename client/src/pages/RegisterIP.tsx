import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import theme from "../theme";
import axios from "axios";
import HighlightedText from "../components/Register/HighlightedText";
import ClickableCard from "../components/ClickableCard";

interface RegisterIPProps {
  onMintSuccess: (ipfsHash: string, nftAddress: string, text: string) => void;
  onBypass: () => void; // Add onBypass prop to handle bypass logic
}

const RegisterIP: React.FC<RegisterIPProps> = ({ onMintSuccess, onBypass }) => {
  const [selectedText, setSelectedText] = useState(""); // State to track selected text
  const [buttonEnabled, setButtonEnabled] = useState(false); // State to track button enable/disable
  const { setIsLoading } = useLoading(); // Hook to trigger loading
  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

  // Function to handle text selection in the browser
  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString() || "";
    setSelectedText(selectedText);
    setButtonEnabled(selectedText.length > 0); // Enable button if text is selected
  };

  // Listen for text selection in the window
  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  // const uploadToIPFS = async (text: string): Promise<string | null> => {
  //   const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //   const data = { text };

  //   try {
  //     // Start loading
  //     setIsLoading(true);

  //     const response = await axios.post(url, data, {
  //       headers: {
  //         Authorization: `Bearer ${PINATA_JWT}`, // Ensure the JWT is passed correctly
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       const ipfsHash = response.data.IpfsHash;
  //       console.log("Uploaded to IPFS: ", ipfsHash);

  //       // Call the minting function after uploading to IPFS
  //       await mintOnServer(ipfsHash);

  //       // Stop loading
  //       setIsLoading(false);

  //       return ipfsHash; // Return the content ID (CID)
  //     } else {
  //       console.error("Failed to upload to IPFS: ", response.status);
  //       setIsLoading(false); // Stop loading on error
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error uploading to IPFS:", error);
  //     setIsLoading(false); // Stop loading on error
  //     return null;
  //   }
  // };

  // const mintOnServer = async (ipfsHash: string) => {
  //   try {
  //     // Start loading
  //     setIsLoading(true);

  //     const response = await fetch("http://localhost:3000/api/mint", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userWalletAddress: process.env.REACT_APP_USER_PUBLIC_KEY,
  //         metadataURI: ipfsHash,
  //         tokenName: "hardcoded",
  //         tokenLabel: "hardcoded",
  //       }),
  //     });

  //     const result = await response.json();
  //     console.log("Minting result:", result);

  //     // Stop loading after the operation is complete
  //     setIsLoading(false);

  //     // On successful minting, call onMintSuccess
  //     onMintSuccess(ipfsHash, "0xYourNFTAddress", selectedText); // Simulating NFT Address for now
  //   } catch (error) {
  //     console.error("Error minting NFT on server:", error);
  //     setIsLoading(false); // Stop loading on error
  //   }
  // };

  return (
    <Box
      overflow="visible"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      {/* Heading */}
      <Text fontSize="1xl" fontWeight="bold">
        Highlight text to register it as IP
      </Text>

      {/* Popup for highlighted text */}
      <HighlightedText />

      {/* Mint button (grayed out until text is selected) */}
      <Box m={2} width="100%">
        <ClickableCard
          cardText="Register this text as IP"
          infoText="Register this text as IP"
          onClickAction={onBypass}
        />
        {/* Bypass Button */}
        <Button mt={4} bg="gray.300" color="black" size="md" onClick={onBypass}>
          Bypass Registration
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterIP;
