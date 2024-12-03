import { type Race, type RaceColor } from "@/types";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OverBidModal from "./OverBidModal";
import CustomBidModal from "./CustomBidModal";
import { motion } from "motion/react";

function RaceAuction({
  race,
  auctionNumber,
  totalPoints,
  setBidPoints,
  currentWinningPoints,
}: {
  race: RaceColor;
  auctionNumber: number;
  totalPoints: number;
  setBidPoints: (bid: number, race: Race) => void;
  currentWinningPoints: number;
}) {
  const [currentBid, setCurrentBid] = useState(0);
  const [customBidInput, setCustomBidInput] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setCurrentBid(0);
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

  return (
    <>
      <Card
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
                color={"#cf0eb8"}
                fontWeight={"bold"}
                fontSize={25}
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
              fontSize={15}
              marginBlock={4}
              disabled={totalPoints - (currentWinningPoints + 50) < 0}
              onClick={() => {
                setBidPoints(
                  currentWinningPoints + 50,
                  race.name.toLowerCase() as Race,
                );
                setCurrentBid(currentWinningPoints + 50);
              }}
            >
              {totalPoints - (currentWinningPoints + 50) < 0 ? (
                "Not enough points"
              ) : (
                <>{`${currentWinningPoints + 50}`}</>
              )}
            </Button>
            <CustomBidModal
              customBid={customBidInput}
              setCustomBidInput={setCustomBidInput}
              handleCloseModal={handleCustomCloseModal}
            />
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
