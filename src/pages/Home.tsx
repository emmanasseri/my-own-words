import React from "react";
import { Box } from "@chakra-ui/react";
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
      p={6}
      width={theme.views.smallView.width}
      height={theme.views.smallView.height}
      mx="auto"
      mt={6}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {/* Register Card */}
      <ClickableCard
        cardText="Register"
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
        cardText="Dispute"
        infoText="Raise a dispute here."
        onClickAction={openDispute} // Action triggered on card click
      />
    </Box>
  );
};

export default Home;
