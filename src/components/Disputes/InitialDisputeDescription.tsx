import React, { useState } from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";

interface InitialDisputeDescriptionProps {
  onNext: () => void; // Callback to switch to the next step
}

const InitialDisputeDescription: React.FC<InitialDisputeDescriptionProps> = ({
  onNext,
}) => {
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
        onClick={onNext} // Trigger next step
      >
        Next
      </Button>
    </Box>
  );
};

export default InitialDisputeDescription;
