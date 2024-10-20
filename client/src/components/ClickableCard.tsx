import React from "react";
import {
  Box,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

interface ClickableCardProps {
  cardText: string;
  infoText: string;
  onClickAction?: () => void; // Optional action to be triggered when the card is clicked
}

const ClickableCard: React.FC<ClickableCardProps> = ({
  cardText,
  infoText,
  onClickAction,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="gray.100" // Super light gray background
      width="100%"
      p={4}
      border="2px solid black" // Black outlined border
      boxShadow="0px 4px 10px rgba(173, 216, 230, 0.8)" // Light blue shadow (light blue: rgba(173, 216, 230))
      borderRadius="md"
      position="relative"
      cursor="pointer"
      _hover={{
        bg: "gray.200", // Darker gray on hover
        boxShadow: "0px 6px 12px rgba(173, 216, 230, 1)", // Stronger blue shadow on hover
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      onClick={onClickAction} // Trigger action when card is clicked
    >
      {/* Text in the middle of the card */}
      <Text fontSize="md" fontWeight="bold" color="black">
        {cardText}
      </Text>

      {/* Info button in the top-right corner */}
      <IconButton
        icon={<InfoIcon />}
        size="sm"
        aria-label="Info"
        variant="ghost"
        position="absolute"
        top={2}
        right={2}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering onClickAction when info button is clicked
          onOpen();
        }}
      />

      {/* Modal for info */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader>Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{infoText}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClickableCard;
