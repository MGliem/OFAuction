import { type Race, type RaceColor } from "@/types";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CustomBidModal from "./CustomBidModal";
import OverBidModal from "./OverBidModal";

function RaceAuction({
  race,
  auctionNumber,
  totalPoints,
  setBidPoints,
  currentWinningRace,
  currentWinningPoints,
}: {
  race: RaceColor;
  auctionNumber: number;
  totalPoints: number;
  setBidPoints: (bid: number, race: Race) => void;
  currentWinningRace: string;
  currentWinningPoints: number;
}) {
  const [customBidInput, setCustomBidInput] = useState("");
  const [currentBid, setCurrentBid] = useState(0);
  const [isPass, setIsPass] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setCurrentBid(0);
    setIsPass(false);
  }, [auctionNumber]);

  const handleCustomCloseModal = () => {
    if (totalPoints - +customBidInput < 0) {
      onOpen();
    } else {
      setCurrentBid(+customBidInput);
      setBidPoints(+customBidInput, race.name.toLowerCase() as Race);
      setCustomBidInput("");
    }
  };

  const handleForceCloseModal = () => {
    setCustomBidInput("");
    setCurrentBid(+customBidInput);
    setBidPoints(+customBidInput, race.name.toLowerCase() as Race);
    setCustomBidInput("");
  };

  const incrementByFiftyMultiple = () => {
    return Math.ceil(currentWinningPoints / 50) * 50 + 50;
  };

  return (
    <>
      <Card
        display={isPass ? "none" : "flex"}
        backgroundColor={"#181818"}
        borderColor={race.color}
        borderWidth={"2px"}
        borderStyle={"solid"}
        borderRadius={"10px"}
        boxShadow={"3px 2px 10px -1px #000000"}
      >
        <CardBody>
          <Text
            color={"#cecece"}
            textAlign={"center"}
            borderBottom={"2px solid #cecece"}
            marginBottom={2}
            paddingBottom={8}
            fontSize={40}
            style={{ textWrap: "nowrap" }}
          >
            {race.name}
          </Text>
          <Flex
            width={"80%"}
            flexDirection={"column"}
            marginInline={"auto"}
            marginBlock={2}
          >
            <Flex
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={currentBid}
              justifyContent={"center"}
            >
              <Text
                textAlign={"center"}
                color={
                  currentWinningRace === race.name.toLowerCase() &&
                  currentWinningPoints > 0
                    ? "#3bbf36"
                    : "#cf0eb8"
                }
                fontWeight={"bold"}
                fontSize={
                  currentWinningRace === race.name.toLowerCase() &&
                  currentWinningPoints > 0
                    ? 40
                    : 25
                }
                paddingBottom={"10px"}
                flex={1}
              >
                {currentBid}
              </Text>
            </Flex>
            <Button
              color={"#000"}
              bg={"#cecece"}
              _hover={{ bg: "#eaeaea" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#848484",
              }}
              leftIcon={<CheckIcon />}
              fontSize={15}
              marginBlock={4}
              disabled={totalPoints - incrementByFiftyMultiple() < 0}
              style={{ textWrap: "wrap" }}
              onClick={() => {
                setBidPoints(
                  incrementByFiftyMultiple(),
                  race.name.toLowerCase() as Race,
                );
                setCurrentBid(incrementByFiftyMultiple());
              }}
            >
              {totalPoints - incrementByFiftyMultiple() < 0 ? (
                "Not enough points"
              ) : (
                <>{`${incrementByFiftyMultiple()}`}</>
              )}
            </Button>
            <CustomBidModal
              customBid={customBidInput}
              setCustomBidInput={setCustomBidInput}
              handleCloseModal={handleCustomCloseModal}
            />
            <Button
              color={"#000"}
              bg={"#cecece"}
              _hover={{ bg: "#eaeaea" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#848484",
              }}
              fontSize={15}
              marginBlock={4}
              leftIcon={<CloseIcon />}
              onClick={() => setIsPass(true)}
            >
              {"Pass"}
            </Button>
          </Flex>
        </CardBody>
      </Card>
      <OverBidModal
        isOpen={isOpen}
        onClose={onClose}
        race={race.name}
        totalPoints={totalPoints}
        customBidInput={customBidInput}
        setCustomBidInput={setCustomBidInput}
        handleForceCloseModal={handleForceCloseModal}
      />
    </>
  );
}

export default RaceAuction;
