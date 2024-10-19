import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ClickableCard from "../components/ClickableCard";
import ConfidenceScore from "../components/Disputes/ConfidenceScore";
import theme from "../theme";

const AIAnalysisPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      p={6}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      display="flex"
      flexDirection="column"
      gap={6}
      alignItems="center"
    >
      {/* Image at the top half */}
      <Image
        src="/images/ai-analysis-image.png" // Replace with your actual image
        alt="AI Analysis"
        maxW="100%"
        mb={4}
      />

      {/* Circular Progress Bar */}
      <Box width="150px" height="150px">
        <ConfidenceScore />
      </Box>

      {/* Text under the progress bar */}
      <Text fontSize="lg" textAlign="center" mt={4}>
        AI Confidence Score: 42%
      </Text>

      {/* ClickableCards at the bottom */}
      <Box display="flex" flexDirection="column" gap={4} width="100%">
        <ClickableCard
          cardText="Add Additional Details"
          infoText="Add more details to the dispute."
          onClickAction={() => navigate("/add-details")} // Add route as needed
        />
        <ClickableCard
          cardText="Close Dispute Session"
          infoText="Close this dispute session and finalize the results."
          onClickAction={() => navigate("/close-session")} // Add route as needed
        />
        <ClickableCard
          cardText="Message the Other Author"
          infoText="Send a message to the other author regarding this dispute."
          onClickAction={() => navigate("/message-author")} // Add route as needed
        />
      </Box>
    </Box>
  );
};

export default AIAnalysisPage;
