import React, { useState } from "react";
import { Box, Text, Button, Textarea, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";

// Component for the initial dispute description with a textbox and a button
const InitialDisputeDescription = () => {
  const [input, setInput] = useState(""); // State to track user input

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap={4}
    >
      {/* Textarea for user input */}
      <Textarea
        placeholder="Describe the issue here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="md"
        width="100%"
      />

      {/* Next button: gray and disabled when no input */}
      <Button
        bg={input ? "blue.500" : "gray.400"} // Turns blue when input is present
        color="white"
        _hover={input ? { bg: "blue.600" } : {}}
        disabled={!input} // Button is disabled when input is empty
        width="100%"
      >
        Next
      </Button>
    </Box>
  );
};

const Dispute = () => {
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center" // Center the content horizontally
      gap={6}
    >
      {/* Image at the top */}
      <Image
        src="/images/wizard.png" // Replace with your actual image path
        alt="Dispute"
        maxW="70%"
        mb={4}
      />

      {/* Title below the image */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Describe Your Dispute
      </Text>

      {/* InitialDisputeDescription component with textbox and button */}
      <InitialDisputeDescription />
    </Box>
  );
};

export default Dispute;
