import React, { useEffect, useState } from "react";
import { useHighlight } from "../../contexts/HighlightContext";
import { Box } from "@chakra-ui/react";

const HighlightedText = () => {
  const { highlightedText } = useHighlight(); // Get highlighted text from context
  console.log("HighlightedText: ", highlightedText);
  return (
    <Box
        bg="gray.300"
        borderColor="gray.600"
        borderRadius={8}
        display="flex"
        flexDirection="column"
        alignItems="left"
        width="100%"
        p={2}
    >
      <p>{highlightedText || "No text highlighted yet!"}</p>
    </Box>
  );
};

export default HighlightedText;
