import React, { useState } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import InitialDisputeDescription from "../components/Disputes/InitialDisputeDescription";
import AdditionalDisputeDetails from "../components/Disputes/AdditionalDisputeDetails";
import ConfidenceScore from "../components/Disputes/ConfidenceScore";

const Dispute = () => {
  const [step, setStep] = useState(1); // Step 1 = InitialDisputeDescription, Step 2 = AdditionalDisputeDetails
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={6}
    >
      {/* Image at the top */}
      {step === 1 && <Image src="/images/wizard.gif" alt="Dispute" maxH="30%" maxW="85%" mb={1} />}
      {step === 2 && <Image src="/images/wizard.gif" alt="Dispute" maxH="30%" maxW="85%" mb={1} />}
      {step === 3 && <Image src="/images/confident-wizard.gif" alt="AI Analysis" maxH="30%" maxW="85%" mb={1} />}

      {/* Title below the image */}
      <Text fontSize="2xl" fontWeight="bold" mb={1}>
        {step === 1 && "Describe Your Dispute"}
        {step === 2 && "Enter IP Asset IDs"}
        {step === 3 && "Confidence Score"}
      </Text>

      {/* Conditionally Render Components Based on the Step */}
      {step === 1 && <InitialDisputeDescription onNext={() => setStep(2)} />}
      {step === 2 && <AdditionalDisputeDetails onNext={() => setStep(3)} />}
      {step === 3 && <ConfidenceScore />}
    </Box>
  );
};

export default Dispute;
