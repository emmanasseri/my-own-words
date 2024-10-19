import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext"; // Import the loading hook
import { uploadToIPFS } from "../components/Register/Mint";
import { useWallet } from "../contexts/WalletContext"; // Use wallet context for minting
import theme from "../theme";

const Register: React.FC = () => {
  const [selectedText, setSelectedText] = useState(""); // State to track selected text
  const [buttonEnabled, setButtonEnabled] = useState(false); // State to track button enable/disable
  const { setIsLoading } = useLoading(); // Hook to trigger loading
  const { mintNFT } = useWallet(); // Get the mintNFT function from WalletContext
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle text selection in the browser
  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString() || "";
    setSelectedText(selectedText);
    setButtonEnabled(selectedText.length > 0); // Enable button if text is selected
  };

  // Listen for text selection in the window
  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  const handleMint = async () => {
    if (selectedText) {
      setIsLoading(true); // Start loading

      try {
        // Step 1: Upload the selected text to IPFS
        const contentID = await uploadToIPFS(selectedText);

        if (contentID) {
          console.log("IPFS content ID:", contentID);

          const userWalletAddress = "0xYourRecipientWalletAddress"; // Replace with recipient wallet address
          await mintNFT(userWalletAddress, contentID, "hardcoded"); // Pass four arguments

          console.log(`NFT minted with content ID: ${contentID}`);
        }
      } catch (error) {
        console.error("Error minting NFT or uploading to IPFS:", error);
      } finally {
        setIsLoading(false); // Stop loading
        navigate("/home"); // Navigate to home page
      }
    }
  };

  return (
    <Box
      p={6}
      width={theme.views.expandedView.width}
      height={theme.views.expandedView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={6}
    >
      {/* Heading */}
      <Text fontSize="2xl" fontWeight="bold">
        Highlight text to register it as IP
      </Text>

      {/* Image */}
      <Image
        src="/images/register-ip.png" // Replace with the actual image path
        alt="Register IP"
        maxW="100%"
        mb={4}
      />

      {/* Block of text to highlight */}
      <Text fontSize="md" textAlign="left" width="100%">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </Text>

      {/* Mint button (grayed out until text is selected) */}
      <Button
        bg={buttonEnabled ? "blue.500" : "gray.400"}
        color="white"
        _hover={buttonEnabled ? { bg: "blue.600" } : {}}
        disabled={!buttonEnabled} // Disable button if no text is selected
        width="100%"
        onClick={handleMint}
      >
        Mint Selected Text
      </Button>
    </Box>
  );
};

export default Register;
