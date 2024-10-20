import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Box, HStack, Stack } from "@chakra-ui/react";
import theme from "../../theme";
import "react-circular-progressbar/dist/styles.css";
import ClickableCard from "../ClickableCard";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import MessageOtherAuthorModal from "../Messaging/MessageOtherAuthorModal";


const ConfidenceScore: React.FC = () => {
  const percentage = 42; // Hardcoded for now, will be a variable later
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
      overflow="hidden"
      width="100%"
      display="flex" 
      alignItems="center"
    >
      <HStack
        align="middle"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        width="100%"
      >
        <Box
        width="120px" height="120px"
        >
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#000",
            trailColor: "#d6d6d6",
            backgroundColor: "#f8f9fa",
          })}
        />
        </Box>

        {/* ClickableCards at the bottom */}
        <Box display="flex" flexDirection="column" gap={2} width="100%">
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
          {/* <ClickableCard
            cardText="Message the Other Author"
            infoText="Send a message to the other author regarding this dispute."
            onClickAction={onOpen} // Open the modal when this card is clicked
          /> */}
        </Box>
      </HStack>

      {/* MessageOtherAuthorModal
      <MessageOtherAuthorModal
        isOpen={isOpen}
        onClose={onClose}
        onProceed={handleProceedWithMessage} // Handles the logic when user clicks "Yes"
      /> */}
    </Box>
  );
};

export default ConfidenceScore;
