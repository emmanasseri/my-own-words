import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import theme from "./theme";

const LandingPage = () => {
  const openTutorial = () => {
    // Open the tutorial page
    chrome.windows.create({
      url: 'https://www.google.com',  // Replace this URL with the content you want in the pop-out window
      type: 'popup',
      width: 565,
      height: 993,
    });
  };

  return (
    <Box
      bg="white"
      width={theme.views.smallView.width} // Width and height are 322p
      height={theme.views.smallView.height} // Width and height are 253px
      display="flex"
      flexDirection="column"
      justifyContent="space-between" // Space between the GIF, text, and button
      alignItems="center"
      p={4}
    >
      <Image
        src="/images/my-own-words-typing-animation.gif"
        alt="Intro GIF"
        maxW="70%" // Make sure it scales within the box
        mb={4} // Add some margin below the GIF
      />

      {/* Middle: Explanation Text */}
      <Text fontSize="sm" color="black" textAlign="center" mb={4}>
        Connect your wallet below to start registering your work as Intellectual
        Property.
      </Text>

      {/* Bottom: Connect Wallet Button */}
      <Button
        bg="black" // Black background
        color="white" // White text
        _hover={{ bg: "gray.700" }} // Slightly lighter black when hovered
        padding={3}
        size="lg" // Medium button size
        width="30%"
        onClick={openTutorial}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

export default LandingPage;
