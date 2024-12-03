import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

function OverBidModal({
  isOpen,
  onClose,
  race,
  totalPoints,
  customBidInput,
  setCustomBidInput,
  handleForceCloseModal,
}: {
  isOpen: boolean;
  onClose: () => void;
  race: string;
  totalPoints: number;
  customBidInput: string;
  setCustomBidInput: (value: string) => void;
  handleForceCloseModal: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onEsc={() => setCustomBidInput("")}
      onOverlayClick={() => setCustomBidInput("")}
      isCentered
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent bg={"#171717"}>
        <ModalHeader fontSize={"xl"}>Not enough points</ModalHeader>
        <ModalBody fontSize={"lg"}>
          <Text>{`${race} has ${totalPoints} points left.`}</Text>
          <Text>{`They want to bid ${customBidInput} points.`}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={"#cecece"}
            _hover={{ bg: "#eaeaea" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
              borderColor: "#848484",
            }}
            marginRight={2}
            onClick={() => {
              setCustomBidInput("");
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme={"orange"}
            onClick={() => {
              handleForceCloseModal();
              onClose();
            }}
          >
            {"Force bid"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OverBidModal;
