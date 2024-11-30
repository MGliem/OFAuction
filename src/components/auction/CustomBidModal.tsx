import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/TextInput";
import isStringPositiveNumber from "@/helpers/isStringPositiveNumber";

function CustomBidModal({
  open,
  setOpen,
  customBid,
  setCustomBidInput,
  handleCloseModal,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  customBid: string;
  setCustomBidInput: (input: string) => void;
  handleCloseModal: () => void;
}) {
  const validateCustomBid = (bid: string) => {
    if (isStringPositiveNumber(bid)) {
      setCustomBidInput(String(+bid));
    }
  };

  const handleCustomKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleCloseModal();
      setOpen(false);
    }
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
      }}
      placement={"center"}
      closeOnInteractOutside={false}
      closeOnEscape={false}
    >
      <DialogContent bg={"#171717"}>
        <DialogHeader>
          <DialogTitle fontSize={"xl"}>Custom amount</DialogTitle>
        </DialogHeader>
        <DialogBody fontSize={"lg"}>
          <TextInput
            value={customBid}
            onChange={(e) => validateCustomBid(e.target.value)}
            onKeyUp={(e) => handleCustomKeyUp(e)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant={"surface"}
              onClick={() => {
                setCustomBidInput("");
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            variant={"solid"}
            colorPalette={"cyan"}
            width={"150px"}
            onClick={() => {
              handleCloseModal();
              setOpen(false);
            }}
          >
            {"Set"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default CustomBidModal;
