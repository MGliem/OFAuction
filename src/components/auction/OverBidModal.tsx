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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  race: string;
}) {
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      closeOnInteractOutside={false}
      closeOnEscape={false}
    >
      <DialogContent bg={"#171717"}>
        <DialogHeader>
          <DialogTitle fontSize={"xl"}>Not enough points</DialogTitle>
        </DialogHeader>
        <DialogBody fontSize={"lg"}>
          <Text>{`${race} has only 5 points left.`}</Text>
          <Text>{"They want to bid 10 points"}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default OverBidModal;
