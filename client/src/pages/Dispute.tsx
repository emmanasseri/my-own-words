import React, { useState } from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import InitialDisputeDescription from "../components/Disputes/InitialDisputeDescription";
import AdditionalDisputeDetails from "../components/Disputes/AdditionalDisputeDetails";

const Dispute = () => {
  const [step, setStep] = useState(1); // Step 1 = InitialDisputeDescription, Step 2 = AdditionalDisputeDetails
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      maxHeight={theme.views.expandedView.height}
      overflow="hidden"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      {/* Image at the top */}
      <Image src="/images/wizard.gif" alt="Dispute" maxH="30%" maxW="85%" mb={1} />

      {/* Title below the image */}
      <Text fontSize="2xl" fontWeight="bold" mb={1}>
        {step === 1 ? "Describe Your Dispute" : "Enter IP Asset IDs"}
      </Text>

      {/* Conditionally Render Components Based on the Step */}
      {step === 1 && <InitialDisputeDescription onNext={() => setStep(2)} />}
      {step === 2 && <AdditionalDisputeDetails />}
    </Box>
  );
};

export default Dispute;
