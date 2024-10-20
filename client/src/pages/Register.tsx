import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
//import { useWallet } from "../contexts/WalletContext"; // Use wallet context for minting
import theme from "../theme";
import axios from "axios";

const Register: React.FC = () => {
  const [selectedText, setSelectedText] = useState(""); // State to track selected text
  const [buttonEnabled, setButtonEnabled] = useState(false); // State to track button enable/disable
  const { setIsLoading } = useLoading(); // Hook to trigger loading
  // const { mintNFT } = useWallet(); // Get the mintNFT function from WalletContext
  const navigate = useNavigate(); // Hook for navigation

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

  const uploadAndMint = async () => {
    uploadToIPFS(selectedText);
  };
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
      console.log("Minting result:", result);

      // Stop loading after the operation is complete
      setIsLoading(false);
    } catch (error) {
      console.error("Error minting NFT on server:", error);
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
        src="/images/register-ip.png" // Replace with the actual image path
        alt="Register IP"
        maxW="100%"
        mb={4}
      />

      {/* Block of text to highlight */}
      <Text fontSize="md" textAlign="left" width="100%">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </Text>

      {/* Mint button (grayed out until text is selected) */}
      <Button
        bg={buttonEnabled ? "blue.500" : "gray.400"}
        color="white"
        _hover={buttonEnabled ? { bg: "blue.600" } : {}}
        disabled={!buttonEnabled} // Disable button if no text is selected
        width="100%"
        onClick={uploadAndMint}
      >
        Mint Selected Text
      </Button>
    </Box>
  );
};

export default Register;
