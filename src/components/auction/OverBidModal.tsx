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
import { Text } from "@chakra-ui/react";

function OverBidModal({
  open,
  setOpen,
  race,
  totalPoints,
  customBidInput,
  handleForceCloseModal,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  race: string;
  totalPoints: number;
  customBidInput: string;
  handleForceCloseModal: () => void;
}) {
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
          <DialogTitle fontSize={"xl"}>Not enough points</DialogTitle>
        </DialogHeader>
        <DialogBody fontSize={"lg"}>
          <Text>{`${race} has ${totalPoints} points left.`}</Text>
          <Text>{`They want to bid ${customBidInput} points.`}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="surface">Cancel</Button>
          </DialogActionTrigger>
          <Button
            variant={"solid"}
            colorPalette={"cyan"}
            onClick={() => {
              handleForceCloseModal();
              setOpen(false);
            }}
          >
            {"Force bid"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default OverBidModal;
