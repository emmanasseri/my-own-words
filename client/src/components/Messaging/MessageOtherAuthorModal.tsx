import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface MessageOtherAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void; // This will handle the logic when the user clicks "Yes"
}

const MessageOtherAuthorModal: React.FC<MessageOtherAuthorModalProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Message the Other Author</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            With your approval, the wizard will share the results of its
            confidence score with the other author. This will be fully anonymous.
            Would you like to proceed with the message?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onProceed}>
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageOtherAuthorModal;
