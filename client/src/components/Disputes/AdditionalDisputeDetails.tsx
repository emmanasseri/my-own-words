import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Use navigate to go to the next page

interface InitialDisputeDescriptionProps {
  onNext: () => void; // Callback to switch to the next step
}

const AdditionalDisputeDetails: React.FC<InitialDisputeDescriptionProps> = ({onNext}) => {
  const [ipAssetId1, setIpAssetId1] = useState("");
  const [ipAssetId2, setIpAssetId2] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const isNextEnabled = ipAssetId1 && ipAssetId2; // Enable the button if both inputs are filled

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap={4}
    >
      {/* First IP Asset ID Input */}
      <Input
        placeholder="Enter IP Asset ID 1"
        value={ipAssetId1}
        onChange={(e) => setIpAssetId1(e.target.value)}
        size="md"
        width="100%"
      />

      {/* Second IP Asset ID Input */}
      <Input
        placeholder="Enter IP Asset ID 2"
        value={ipAssetId2}
        onChange={(e) => setIpAssetId2(e.target.value)}
        size="md"
        width="100%"
      />

      {/* Next button: gray and disabled when both inputs are not filled */}
      <Button
        bg={isNextEnabled ? "blue.500" : "gray.400"} // Turns blue when both inputs are filled
        color="white"
        _hover={isNextEnabled ? { bg: "blue.600" } : {}}
        disabled={!isNextEnabled} // Button is disabled when inputs are empty
        width="100%"
        onClick={onNext} // Navigate
      >
        Next
      </Button>
    </Box>
  );
};

export default AdditionalDisputeDetails;