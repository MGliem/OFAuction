import TextInput from "@/components/ui/TextInput";
import isStringPositiveNumber from "@/helpers/isStringPositiveNumber";
import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function CustomBidModal({
  customBid,
  setCustomBidInput,
  handleCloseModal,
}: {
  customBid: string;
  setCustomBidInput: (input: string) => void;
  handleCloseModal: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const validateCustomBid = (bid: string) => {
    if (isStringPositiveNumber(bid)) {
      setCustomBidInput(String(+bid));
    }
  };

  const handleCustomKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleCloseModal();
      onClose();
    }
  };

  return (
    <>
      <Button
        size={"sm"}
        color={"#000"}
        bg={"#cecece"}
        _hover={{ bg: "#eaeaea" }}
        _active={{
          bg: "#dddfe2",
          transform: "scale(0.98)",
          borderColor: "#848484",
        }}
        fontSize={{base: 15, lg: "clamp(0.75rem, -0.1875rem + 1.6667vw, 0.9375rem)"}}
        style={{ textWrap: "wrap" }}
        leftIcon={<EditIcon />}
        onClick={onOpen}
      >
        {"Custom amount"}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onEsc={() => setCustomBidInput("")}
        onOverlayClick={() => setCustomBidInput("")}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={"#171717"}>
          <ModalHeader fontSize={"xl"}>Custom amount</ModalHeader>
          <ModalBody fontSize={"lg"}>
            <TextInput
              value={customBid}
              onChange={(e) => validateCustomBid(e.target.value)}
              onKeyUp={(e) => handleCustomKeyUp(e)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color={"#000"}
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
              colorScheme={"cyan"}
              width={"150px"}
              onClick={() => {
                handleCloseModal();
                onClose();
              }}
            >
              {"Set"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomBidModal;
