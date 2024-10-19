import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import { createRoot } from "react-dom/client";
import Tutorial from "./Tutorial";
import { useLoading } from "../contexts/LoadingContext";

const Landing = () => {
  const { setIsLoading } = useLoading();
  const openPopup = (): void => {
    const popupWindow = window.open("", "_blank", "width=400,height=400");

    if (popupWindow) {
      popupWindow.document.write('<div id="tutorial-root"></div>');

      const root = createRoot(
        popupWindow.document.getElementById("tutorial-root")!
      );
      root.render(<Tutorial />);
    }
  };

  const navigate = useNavigate();
  const handleConnectWallet = async () => {
  
    // Navigate to the Home screen
    navigate("/home");
  };

  const goHome = async () => {
    // Start the loading animation
    setIsLoading(true);

    // Simulate a 5-second delay for the wallet connection process
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Stop the loading animation
    setIsLoading(false);
    navigate("/home");
  };
  return (
    <Box
      bg="white" // Background is all white
      width={theme.views.smallView.width} // Set the width to the pageView width
      height={theme.views.smallView.height} // Set the height to the pageView height
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
        bg="black"
        color="white"
        _hover={{ bg: "gray.700" }}
        size="md"
        width="30%"
        //onClick={handleConnectWallet} // Trigger navigation when button is clicked
        onClick={openPopup}
      >
        Connect Wallet
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{ bg: "gray.700" }}
        size="md"
        width="30%"
        //onClick={handleConnectWallet} // Trigger navigation when button is clicked
        onClick={goHome}
      >
        Go to Home
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{ bg: "gray.700" }}
        size="md"
        width="30%"
        //onClick={handleConnectWallet} // Trigger navigation when button is clicked
        onClick={openPopup}
      >
        Open pop-up
      </Button>
    </Box>
  );
};

export default Landing;
