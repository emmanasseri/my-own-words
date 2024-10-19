import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";

const Tutorial = () => {
    const navigate = useNavigate();

    return (
        <Box
        bg="white" // Background is all white
        width={theme.views.pageView.width} // Set the width to the pageView width
        height={theme.views.pageView.height} // Set the height to the pageView height
        display="flex"
        flexDirection="column"
        justifyContent="space-between" // Space between the GIF, text, and button
        alignItems="center"
        p={4}
        >
    
        {/* Middle: Explanation Text */}
        <Text fontSize="sm" color="black" textAlign="center" mb={4}>
            Connect your wallet below to start registering your work as Intellectual
            Property.

            HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOO
        </Text>
        </Box>
    );
};

export default Tutorial;