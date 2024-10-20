import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useLoading } from "../contexts/LoadingContext";

interface DefineLicenseProps {
  ipid: string;
  rawText: string;
  onSubmit: () => void; // Function to trigger when form is submitted
  onMintSuccess: (
    ipfsHash: string,
    nftAddress: string,
    ipMetadaga: string,
    ipfsMetadaga: string
  ) => void;
}

const DefineLicense: React.FC<DefineLicenseProps> = ({
  ipid,
  rawText,
  onSubmit,
  onMintSuccess,
}) => {
  const [licenseFlavor, setLicenseFlavor] = useState(
    "Non-Commercial Social Remixing"
  );
  const [commercialUse, setCommercialUse] = useState(false);
  const [commercialAttribution, setCommercialAttribution] = useState(false);
  const [derivativesAllowed, setDerivativesAllowed] = useState(true);
  const [derivativesAttribution, setDerivativesAttribution] = useState(true);
  const { setIsLoading } = useLoading();

  const creationDate = new Date().toISOString(); // Automatically generate creation date

  const handleSubmit = () => {
    const licenseData = {
      IPID: ipid,
      creationDate,
      licenseFlavor,
      commercialUse,
      commercialAttribution,
      derivativesAllowed,
      derivativesAttribution,
      raw_text: rawText,
    };

    console.log("License data submitted:", licenseData);
    onSubmit(); // Call onSubmit to transition to the next page
  };

  const uploadAndMint = async () => {
    const licenseData = {
      IPID: ipid,
      creationDate,
      licenseFlavor,
      commercialUse,
      commercialAttribution,
      derivativesAllowed,
      derivativesAttribution,
      raw_text: rawText,
    };
    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/mint-and-register-IP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userWalletAddress: process.env.REACT_APP_USER_PUBLIC_KEY,
            ipMetadata: rawText,
            tokenName: "test name",
            tokenLabel: "test label",
            userLicenseData: licenseData,
          }),
        }
      );

      const result = await response.json();
      console.log("Minting result:", result);

      // Stop loading after the operation is complete
      setIsLoading(false);

      onMintSuccess(
        result.ipfsHash,
        result.nftAddress,
        result.ipMetadata,
        result.ipfsMetadata
      );
    } catch (error) {
      console.error("Error minting NFT on server:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <Box p={6} maxW="600px" mx="auto" mt={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Define License for Your IP Asset
      </Text>

      <FormControl mb={4}>
        <FormLabel>IPID (Immutable)</FormLabel>
        <Input value={ipid} isReadOnly />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Creation Date (Immutable)</FormLabel>
        <Input value={creationDate} isReadOnly />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>License Flavor</FormLabel>
        <Select
          value={licenseFlavor}
          onChange={(e) => setLicenseFlavor(e.target.value)}
        >
          <option value="Non-Commercial Social Remixing">
            Non-Commercial Social Remixing
          </option>
          <option value="Commercial Remixing">Commercial Remixing</option>
          <option value="No Derivatives">No Derivatives</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <Checkbox
          isChecked={commercialUse}
          onChange={(e) => setCommercialUse(e.target.checked)}
        >
          Allow Commercial Use
        </Checkbox>
      </FormControl>

      <FormControl mb={4}>
        <Checkbox
          isChecked={commercialAttribution}
          onChange={(e) => setCommercialAttribution(e.target.checked)}
        >
          Require Commercial Attribution
        </Checkbox>
      </FormControl>

      <FormControl mb={4}>
        <Checkbox
          isChecked={derivativesAllowed}
          onChange={(e) => setDerivativesAllowed(e.target.checked)}
        >
          Allow Derivatives
        </Checkbox>
      </FormControl>

      <FormControl mb={4}>
        <Checkbox
          isChecked={derivativesAttribution}
          onChange={(e) => setDerivativesAttribution(e.target.checked)}
        >
          Require Derivative Attribution
        </Checkbox>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Original Text (Immutable)</FormLabel>
        <Textarea value={rawText} isReadOnly rows={6} />
      </FormControl>

      <Button colorScheme="blue" onClick={uploadAndMint}>
        Submit License
      </Button>
    </Box>
  );
};

export default DefineLicense;
