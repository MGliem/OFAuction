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
  customBid,
  setCustomBidInput,
  currentBid,
  setCurrentBid,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  race: string;
  totalPoints: number;
  customBid: string;
  setCustomBidInput: (input: string) => void;
  currentBid: number;
  setCurrentBid: (bid: number) => void;
}) {
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
        setCustomBidInput("");
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
          <Text>{`${race} has only ${totalPoints} points left.`}</Text>
          <Text>{`They want to bid ${customBid} points`}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="surface">Cancel</Button>
          </DialogActionTrigger>
          <Button
            variant={"solid"}
            colorPalette={"cyan"}
            onClick={() => {
              setCurrentBid(+customBid + currentBid);
              setCustomBidInput("");
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
