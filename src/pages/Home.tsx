import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ClickableCard from "../components/ClickableCard";
import theme from "../theme";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Define actions for each card
  const openDispute = () => {
    navigate("/dispute");
  };

  const openHistory = () => {
    navigate("/history");
  };

  const openRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      position="relative" // Needed for positioning the images
      p={6}
      width={theme.views.smallView.width}
      height={theme.views.smallView.height}
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center" // Center the content vertically
      alignItems="center" // Center the content horizontally
      gap={4}
    >
      {/* Top-right Image */}
      <Image
        src="/images/saturn-and-stars.png" // Replace with the correct image path
        alt="Top Right Image"
        position="absolute"
        top={0}
        right={0}
        width="40px"
        height="40px"
        zIndex={0} // Ensures it's behind the content
      />

      {/* Bottom-left Image */}
      <Image
        src="/images/city-scape.png" // Replace with the correct image path
        alt="Bottom Left Image"
        position="absolute"
        bottom={0}
        left={0}
        width="40px"
        height="40px"
        zIndex={0} // Ensures it's behind the content
      />

      {/* Big Title at the Top */}
      <Text fontSize="xl" fontWeight="bold" mb={4} zIndex={1}>
        What would you like to do?
      </Text>

      {/* Register Card */}
      <ClickableCard
        cardText="Register text as IP"
        infoText="Use this option to register your details."
        onClickAction={openRegister} // Action triggered on card click
      />

      {/* View History Card */}
      <ClickableCard
        cardText="View History"
        infoText="View your transaction history here."
        onClickAction={openHistory} // Action triggered on card click
      />

      {/* Dispute Card */}
      <ClickableCard
        cardText="Raise a Dispute"
        infoText="Raise a dispute here."
        onClickAction={openDispute} // Action triggered on card click
      />
    </Box>
  );
};

export default Home;
