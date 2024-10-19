import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useLoading } from "../contexts/LoadingContext";

const LoadingComponent: React.FC = () => {
  const { isLoading } = useLoading(); // Access the global loading state

  if (!isLoading) return null; // Don't render if not loading

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.5)" // Faded background
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column" alignItems="center">
        {/* Loading GIF */}
        <Image
          src="/images/car-loading-component.gif"
          alt="Loading..."
          maxW="150px"
          mb={4} // Margin below the GIF
        />
        <Text color="white" fontSize="lg">
          Loading, please wait...
        </Text>
      </Flex>
    </Box>
  );
};

export default LoadingComponent;
