import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext"; // Import the loading hook
import { uploadToIPFS, mintText } from "../components/Register/Mint";
import theme from "../theme";

const Register: React.FC = () => {
  const [selectedText, setSelectedText] = useState(""); // State to track selected text
  const [buttonEnabled, setButtonEnabled] = useState(false); // State to track button enable/disable
  const { setIsLoading } = useLoading(); // Hook to trigger loading
  const navigate = useNavigate(); // Hook for navigation


  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) {
    saveBtn.onclick = async () => {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      let result = "";
      try {
        [{result = ""}] = await chrome.scripting.executeScript({
          target: {tabId: tab.id!},
          func: () => {
            const selection = getSelection();
            return selection ? selection.toString() : "";
          },
        });
      } catch (e) {
        return; // ignoring an unsupported page like chrome://extensions
      }
      document.body.append('Selection: ' + result);
    };
  }



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

  // Function to handle the minting process when button is clicked
  const handleMint = () => {
    if (selectedText) {
      setIsLoading(true); // Start loading
      uploadToIPFS(selectedText); 
      // Call the mint function (without hooks inside Mint.tsx)
      mintText(selectedText);

      // Simulate a 1-second delay, then navigate to home
      setTimeout(() => {
        setIsLoading(false); // Stop loading
        navigate("/home"); // Navigate to home page
      }, 1000);
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
      <button id="save-btn">SAVE SELECTION</button>
      <script src="index.js"></script>

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
