import React from "react";
import { Box } from "@chakra-ui/react";
import ClickableCard from "../components/ClickableCard";

const Home: React.FC = () => {
  return (
    <Box
      p={6}
      maxW="md"
      mx="auto"
      mt={6}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <ClickableCard
        cardText="Register"
        infoText="Use this option to register your details."
      />
      <ClickableCard
        cardText="View History"
        infoText="View your transaction history here."
      />
      <ClickableCard cardText="Dispute" infoText="Raise a dispute here." />
    </Box>
  );
};

export default Home;
