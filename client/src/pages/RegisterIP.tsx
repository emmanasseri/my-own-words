import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import HighlightedText from "../components/Register/HighlightedText";
import ClickableCard from "../components/ClickableCard";

interface RegisterIPProps {
  onMintSuccess: (ipfsHash: string, nftAddress: string, text: string) => void;
  onBypass: () => void; // New prop for the bypass button
}

const RegisterIP: React.FC<RegisterIPProps> = ({ onMintSuccess, onBypass }) => {
  const [selectedText, setSelectedText] = useState(""); // State to track selected text
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString() || "";
    setSelectedText(selectedText);
    setButtonEnabled(selectedText.length > 0);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  const uploadAndMint = async () => {
    const ipfsHash = await uploadToIPFS(selectedText);
    if (ipfsHash) {
      await mintOnServer(ipfsHash);
    }
  };

  const uploadToIPFS = async (text: string): Promise<string | null> => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const data = { text };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result.IpfsHash;
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
    return null;
  };

  const mintOnServer = async (ipfsHash: string) => {
    try {
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
      if (result.success) {
        onMintSuccess(ipfsHash, result.transactionHash, selectedText);
      }
    } catch (error) {
      console.error("Error minting NFT on server:", error);
    }
  };

  return (
    <Box
      p={6}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={6}
      pb={4}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Highlight text to register it as IP
      </Text>

      <HighlightedText />
      <Image
        src="/images/stars-and-lines.png"
        alt="Register IP"
        width="60px"
        maxW="70%"
        mb={-4}
      />

      <Box m={2} width="100%">
        <ClickableCard
          cardText="Register this text as IP"
          infoText="Register this text as IP"
          onClickAction={uploadAndMint}
        />
      </Box>

      {/* Bypass button */}
      <Button
        mt={4}
        bg="gray.200"
        color="gray.600"
        size="sm"
        onClick={onBypass}
      >
        Bypass and Define License
      </Button>
    </Box>
  );
};

export default RegisterIP;
