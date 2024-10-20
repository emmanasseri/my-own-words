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

interface DefineLicenseProps {
  ipid: string;
  rawText: string;
  onSubmit: () => void; // Function to trigger when form is submitted
}

const DefineLicense: React.FC<DefineLicenseProps> = ({
  ipid,
  rawText,
  onSubmit,
}) => {
  const [licenseFlavor, setLicenseFlavor] = useState(
    "Non-Commercial Social Remixing"
  );
  const [commercialUse, setCommercialUse] = useState(false);
  const [commercialAttribution, setCommercialAttribution] = useState(false);
  const [derivativesAllowed, setDerivativesAllowed] = useState(true);
  const [derivativesAttribution, setDerivativesAttribution] = useState(true);

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

      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit License
      </Button>
    </Box>
  );
};

export default DefineLicense;
