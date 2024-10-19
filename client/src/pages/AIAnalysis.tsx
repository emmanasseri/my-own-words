import React, { useState } from "react";
import { Box, Text, Image, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ClickableCard from "../components/ClickableCard";
import ConfidenceScore from "../components/Disputes/ConfidenceScore";
import MessageOtherAuthorModal from "../components/Messaging/MessageOtherAuthorModal";
import theme from "../theme";

const AIAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Handle modal open/close

  const handleProceedWithMessage = () => {
    // Logic for proceeding with the message can go here
    // For now, we just close the modal
    onClose();
    console.log("Proceeding with sending the message to the other author.");
  };

  return (
    <Box
      p={6}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      gap={6}
      alignItems="center"
    >
      {/* Image at the top half */}
      <Image
        src="/images/confident-wizard.gif" // Replace with your actual image
        alt="AI Analysis"
        maxW="60%"
        mb={4}
      />

      {/* Circular Progress Bar */}
      <Box width="170px" height="170px">
        <ConfidenceScore />
      </Box>

      {/* Text under the progress bar */}
      <Text fontSize="lg" textAlign="center" mt={4}>
        Confidence Score
      </Text>

      {/* ClickableCards at the bottom */}
      <Box display="flex" flexDirection="column" gap={4} width="100%">
        <ClickableCard
          cardText="Re-evaluate with Additional Details"
          infoText="Add more details to the dispute."
          onClickAction={() => navigate("/dispute")} // Add route as needed
        />
        <ClickableCard
          cardText="Close Dispute Session"
          infoText="Close this dispute session and finalize the results."
          onClickAction={() => navigate("/home")}
        />
        <ClickableCard
          cardText="Message the Other Author"
          infoText="Send a message to the other author regarding this dispute."
          onClickAction={onOpen} // Open the modal when this card is clicked
        />
      </Box>

      {/* MessageOtherAuthorModal */}
      <MessageOtherAuthorModal
        isOpen={isOpen}
        onClose={onClose}
        onProceed={handleProceedWithMessage} // Handles the logic when user clicks "Yes"
      />
    </Box>
  );
};

export default AIAnalysis;
