import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Example component for DefineLicense page
const DefineLicense: React.FC<{ ipid: string; rawText: string }> = ({
  ipid,
  rawText,
}) => {
  const [licenseFlavor, setLicenseFlavor] = useState("recommended");
  const [creationDate, setCreationDate] = useState("");
  const [commercialUse, setCommercialUse] = useState(false);
  const [commercialAttribution, setCommercialAttribution] = useState(false);
  const [derivativesAllowed, setDerivativesAllowed] = useState(false);
  const [derivativesAttribution, setDerivativesAttribution] = useState(false);

  const navigate = useNavigate();

  // Generate creation date on component load (immutable)
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    setCreationDate(currentDate);
  }, []);

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
    // Perform API call or save to state, etc.

    navigate("/nextPage"); // Redirect after submission
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
