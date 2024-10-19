import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box
      bg="white" // Background is all white
      width="small" // Small window size as defined in the theme
      height="small.height"
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
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

export default LandingPage;
