import React from "react";
import { Box } from "@chakra-ui/react";
import ClickableCard from "../components/ClickableCard";
import theme from "../theme";

const Home: React.FC = () => {
  return (
    <Box
      p={6}
      width={theme.views.smallView.width} // Set the width to the pageView width
      height={theme.views.smallView.height}
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
