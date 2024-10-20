import React, { useState } from "react";
import RegisterIP from "./RegisterIP";
import DefineLicense from "./DefineLicense";
import DefineRoyalties from "./DefineRoyalties";
import { Box, Heading } from "@chakra-ui/react";
import theme from "../theme";

const RegisterParentPage: React.FC = () => {
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [NFTAddress, setNFTAddress] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>("");
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const [isLicenseDefined, setIsLicenseDefined] = useState<boolean>(false);

  const handleMintSuccess = (
    mintedIpfsHash: string,
    nftAddress: string,
    text: string
  ) => {
    setIpfsHash(mintedIpfsHash);
    setNFTAddress(nftAddress);
    setRawText(text);
    setIsMinted(true); // Trigger the transition to DefineLicense
  };

  const handleLicenseSubmit = () => {
    setIsLicenseDefined(true); // Trigger the transition to DefineRoyalties
  };

  const handleBypass = () => {
    setIsMinted(true); // Skip the minting step and move to DefineLicense
    setRawText("Bypassed text");
    setNFTAddress("0xBypassAddress");
  };

  return (
    <Box
      p={6}
      width={theme.views.expandedView.width} // Matching original dimensions
      height={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={6}
      pb={4}
    >
      <Heading mb={6} textAlign="center">
        Intellectual Property Registration
      </Heading>

      {!isMinted ? (
        <RegisterIP onMintSuccess={handleMintSuccess} onBypass={handleBypass} />
      ) : !isLicenseDefined ? (
        <DefineLicense
          ipid={NFTAddress || "0xBypassAddress"}
          rawText={rawText || "Bypassed text"}
          onSubmit={handleLicenseSubmit}
        />
      ) : (
        <DefineRoyalties />
      )}
    </Box>
  );
};

export default RegisterParentPage;
