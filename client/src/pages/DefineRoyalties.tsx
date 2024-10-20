import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";

const DefineRoyalties: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home"); // Replace with your home route
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="1xl" fontWeight="bold">
        Define Royalties
      </Text>

      <Text fontSize="md" textAlign="center" width="100%">
        You can configure royalties for your IP assets here in the future.
      </Text>

      <Button
        mt={4}
        bg="blue.500"
        color="white"
        size="lg"
        _hover={{ bg: "blue.600" }}
        onClick={handleBackToHome}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default DefineRoyalties;
