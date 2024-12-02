import { type Race, type RaceColor } from "@/types";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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
  const [openForceBidModal, setOpenForceBidModal] = useState(false);
  const [openCustomBidModal, setOpenCustomBidModal] = useState(false);

  useEffect(() => {
    setCurrentBid(0);
  }, [auctionNumber]);

  const handleCustomCloseModal = () => {
    if (totalPoints - +customBidInput < 0) {
      setOpenForceBidModal(true);
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
      <Box width={{ base: "100%", lg: "60%", "2xl": "320px" }}>
          <Card.Root
            backgroundColor={"#181818"}
            borderColor={race.color}
            borderWidth={"2px"}
            borderStyle={"solid"}
            borderRadius={"10px"}
            boxShadow={"3px 2px 10px -1px #000000"}
          >
            <Card.Body>
              <Card.Title
                color={"#cecece"}
                textAlign={"center"}
                borderBottom={"2px solid #cecece"}
                marginBottom={2}
                paddingBottom={8}
                fontSize={40}
                textWrap={"noWrap"}
              >
                {race.name}
              </Card.Title>
              <Flex
                width={"80%"}
                flexDirection={"column"}
                marginInline={"auto"}
                marginBlock={2}
              >
                <Flex justifyContent={"center"}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={currentBid}
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
                  </motion.div>
                </Flex>
                <Button
                  variant={"surface"}
                  colorPalette={"accent"}
                  size={"xs"}
                  fontSize={16}
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
                <Button
                  variant={"surface"}
                  size={"xs"}
                  fontSize={16}
                  onClick={() => setOpenCustomBidModal(true)}
                >
                  {"Custom amount"}
                </Button>
              </Flex>
            </Card.Body>
          </Card.Root>
      </Box>
      <OverBidModal
        open={openForceBidModal}
        setOpen={setOpenForceBidModal}
        race={race.name}
        totalPoints={totalPoints}
        customBidInput={customBidInput}
        handleForceCloseModal={handleForceCloseModal}
      />
      <CustomBidModal
        open={openCustomBidModal}
        setOpen={setOpenCustomBidModal}
        customBid={customBidInput}
        setCustomBidInput={setCustomBidInput}
        handleCloseModal={handleCustomCloseModal}
      />
    </>
  );
}

export default RaceAuction;
