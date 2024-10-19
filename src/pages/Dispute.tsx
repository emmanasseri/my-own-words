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
    <Flex
      minWidth={theme.views.smallView.width}
      maxHeight={theme.views.smallView.height}
    >
    <Box
      p={4}
      //width={theme.views.expandedView.width}
      //maxHeight={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      {/* Image at the top */}
      <Image src="/images/wizard.gif" alt="Dispute" maxH="50%" maxW="50%" mb={4} />

      {/* Title below the image */}
      <Text fontSize="1xl" fontWeight="bold" mb={4}>
        {step === 1 ? "Describe Your Dispute" : "Enter IP Asset IDs"}
      </Text>

      {/* Conditionally Render Components Based on the Step */}
      {step === 1 && <InitialDisputeDescription onNext={() => setStep(2)} />}
      {step === 2 && <AdditionalDisputeDetails />}
    </Box>
    </Flex>
  );
};

export default Dispute;
