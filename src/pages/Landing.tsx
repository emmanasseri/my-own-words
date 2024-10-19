import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import { createRoot } from "react-dom/client";
import Tutorial from "./Tutorial";
import { useLoading } from "../contexts/LoadingContext";
import { useWeb3 } from "../contexts/Web3Context";

const Landing = () => {
  const { walletAddress, connectWallet } = useWeb3()!;
  const { setIsLoading } = useLoading();

  const openPopup = (): void => {
    window.open('/index.html#/tutorial', '_blank', 'width=565,height=793');
  };

  const navigate = useNavigate();
  const handleConnectWallet = async () => {
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
      bg="white"
      width={theme.views.smallView.width}
      height={theme.views.smallView.height}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Image
        src="/images/my-own-words-typing-animation.gif"
        alt="Intro GIF"
        maxW="70%"
        mb={4}
      />
      <Image src="/images/two-authors.png" alt="two kids" maxW="70%" mb={4} />

      <Text fontSize="sm" color="black" textAlign="center" mb={4}>
        Connect your wallet below to start registering your work as Intellectual
        Property.
      </Text>

      {/* <Wallet /> */}

      <button id="connectWalletButton">Connect Wallet</button>

      {/* Styled Buttons */}
      {!walletAddress && (
        <Button
          bg="gray.800" // Dark gray background
          color="white"
          _hover={{ bg: "gray.600" }} // Slightly lighter gray on hover
          size="sm" // Smaller text size
          width="40%" // Adjusted button width
          p={4} // Padding inside the button
          mb={2} // Margin below the button for spacing
          onClick={connectWallet}
          //onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      )}

      <Button
        bg="gray.800" // Dark gray background
        color="white"
        _hover={{ bg: "gray.600" }} // Slightly lighter gray on hover
        size="sm" // Smaller text size
        width="40%" // Adjusted button width
        p={4} // Padding inside the button
        mb={2} // Margin below the button for spacing
        onClick={goHome}
      >
        Go to Home
      </Button>

      <Button
        bg="gray.800" // Dark gray background
        color="white"
        _hover={{ bg: "gray.600" }} // Slightly lighter gray on hover
        size="sm" // Smaller text size
        width="40%" // Adjusted button width
        p={4} // Padding inside the button
        mb={2} // Margin below the button for spacing
        onClick={openPopup}
      >
        Open Pop-up
      </Button>
    </Box>
  );
};

export default Landing;
