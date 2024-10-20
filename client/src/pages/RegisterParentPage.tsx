import React, { useState } from "react";
import RegisterIP from "./RegisterIP";
import DefineLicense from "./DefineLicense";
import { Box, Heading } from "@chakra-ui/react";
import theme from "../theme";

const RegisterParentPage: React.FC = () => {
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [NFTAddress, setNFTAddress] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>("");
  const [isMinted, setIsMinted] = useState<boolean>(false);

  const handleMintSuccess = (
    mintedIpfsHash: string,
    nftAddress: string,
    text: string
  ) => {
    setIpfsHash(mintedIpfsHash);
    setNFTAddress(nftAddress);
    setRawText(text);
    setIsMinted(true);
  };

  const handleBypass = () => {
    setIsMinted(true); // Just trigger the transition without minting
  };

  return (
    <Box
      p={6}
      width={theme.views.expandedView.width} // Matching the original dimensions
      height={theme.views.expandedView.height} // Matching the original dimensions
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={6}
      pb={4}
    >
      {/* Heading */}
      <Heading mb={6} textAlign="center">
        Intellectual Property Registration
      </Heading>

      {/* Conditional rendering: RegisterIP first, then DefineLicense after minting */}
      {!isMinted ? (
        <RegisterIP onMintSuccess={handleMintSuccess} onBypass={handleBypass} />
      ) : (
        ipfsHash &&
        NFTAddress && <DefineLicense ipid={NFTAddress} rawText={rawText} />
      )}
    </Box>
  );
};

export default RegisterParentPage;
