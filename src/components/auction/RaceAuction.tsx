import CustomBidModal from "@/components/auction/CustomBidModal";
import OverBidModal from "@/components/auction/OverBidModal";
import { type Race, type RaceColor } from "@/types";
import { ArrowBackIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
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
        position={"relative"}
        display={"flex"}
        backgroundColor={"#181818"}
        borderColor={race.color}
        borderWidth={"2px"}
        borderStyle={"solid"}
        borderRadius={"10px"}
        boxShadow={"3px 2px 10px -1px #000000"}
      >
        {isPass ? (
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"absolute"}
            h={"100%"}
            w={"100%"}
            borderRadius={"10px"}
            top={0}
            left={0}
            zIndex={1}
            backgroundColor={"#101010e3"}
            paddingInline={"15%"}
            paddingTop={"25px"}
          >
            <Button
              color={"#000"}
              size={"sm"}
              bg={"#cecece"}
              _hover={{ bg: "#eaeaea" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#848484",
              }}
              fontSize={{
                base: 15,
                lg: "clamp(0.75rem, -0.1875rem + 1.6667vw, 0.9375rem)",
              }}
              marginBlock={2}
              leftIcon={<ArrowBackIcon />}
              onClick={() => setIsPass(false)}
            >
              {"Cancel pass"}
            </Button>
          </Flex>
        ) : (
          null
        )}
        <CardBody>
          <Text
            color={"#cecece"}
            textAlign={"center"}
            borderBottom={"2px solid #cecece"}
            marginBottom={2}
            paddingBottom={8}
            fontSize={30}
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
                flex={1}
              >
                {currentBid}
              </Text>
            </Flex>
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
              leftIcon={<CheckIcon />}
              fontSize={{
                base: 15,
                lg: "clamp(0.75rem, -0.1875rem + 1.6667vw, 0.9375rem)",
              }}
              marginBlock={2}
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
              size={"sm"}
              bg={"#cecece"}
              _hover={{ bg: "#eaeaea" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#848484",
              }}
              fontSize={{
                base: 15,
                lg: "clamp(0.75rem, -0.1875rem + 1.6667vw, 0.9375rem)",
              }}
              marginBlock={2}
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
