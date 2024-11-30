import { Race } from "@/types";
import { Card, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import { MdAdd, MdOutlineModeEdit } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";
import isStringPositiveNumber from "@/helpers/isStringPositiveNumber";
import OverBidModal from "./OverBidModal";
import CustomBidModal from "./CustomBidModal";
import { motion } from "motion/react";

function RaceAuction({
  race,
  checkCurrentWinner,
  auctionNumber,
  totalPoints,
  animeDelay,
}: {
  race: Race;
  checkCurrentWinner: (race: string, points: number) => void;
  auctionNumber: number;
  totalPoints: number;
  animeDelay: number;
}) {
  const [currentBid, setCurrentBid] = useState(0);
  const [isCurrentBidEdit, setIsCurrentBidEdit] = useState(false);
  const [currentBidInput, setCurrentBidInput] = useState("0");
  const [customBidInput, setCustomBidInput] = useState("");
  const [openForceBidModal, setOpenForceBidModal] = useState(false);
  const [openCustomBidModal, setOpenCustomBidModal] = useState(false);

  useEffect(() => {
    checkCurrentWinner(race.name.toLowerCase(), currentBid);
  }, [currentBid, race.name, checkCurrentWinner]);

  useEffect(() => {
    setCurrentBidInput("0");
    setCurrentBid(0);
  }, [auctionNumber]);

  const validateEditBid = (bid: string) => {
    if (isStringPositiveNumber(bid)) {
      setCurrentBidInput(String(+bid));
    }
  };

  const handleBidKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setCurrentBid(+currentBidInput);
      setCurrentBidInput(currentBidInput);
      setIsCurrentBidEdit(false);
    }
  };

  const handleCloseModal = () => {
    if (totalPoints - (+customBidInput + currentBid) < 0) {
      setOpenForceBidModal(true);
    } else {
      const newCurrentBid = currentBid + +customBidInput;
      setCurrentBid(newCurrentBid);
      setCurrentBidInput(String(newCurrentBid));
      setCustomBidInput("");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: animeDelay }}
      >
        <Card.Root
          width={{ base: "100%", lg: "60%", "2xl": "320px" }}
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
              <Flex justifyContent={"center"} gap={2}>
                <Text
                  textAlign={"center"}
                  color={"#cecece"}
                  fontSize={20}
                  marginBottom={1}
                  textWrap={"nowrap"}
                >
                  {"Current bid"}
                </Text>
                {!isCurrentBidEdit ? (
                  <Button
                    variant={"surface"}
                    size={"xs"}
                    onClick={() => setIsCurrentBidEdit(true)}
                  >
                    <MdOutlineModeEdit />
                  </Button>
                ) : (
                  ""
                )}
              </Flex>
              <Flex justifyContent={"center"}>
                {isCurrentBidEdit ? (
                  <Tooltip
                    content="Press Enter key to confirm"
                    showArrow
                    openDelay={100}
                    closeDelay={300}
                  >
                    <TextInput
                      value={currentBidInput}
                      onChange={(e) => validateEditBid(e.target.value)}
                      onKeyUp={(e) => handleBidKeyUp(e)}
                    />
                  </Tooltip>
                ) : (
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
                )}
              </Flex>
              <Button
                variant={"surface"}
                colorPalette={"accent"}
                size={"xs"}
                fontSize={15}
                marginBlock={4}
                disabled={totalPoints - (currentBid + 50) < 0}
                onClick={() => {
                  setCurrentBid((current) => current + 50);
                  setCurrentBidInput((current) => String(+current + 50));
                  setIsCurrentBidEdit(false);
                }}
              >
                {totalPoints - (currentBid + 50) < 0 ? (
                  "Not enough points"
                ) : (
                  <>
                    <MdAdd /> <Text as={"span"}>{"50"}</Text>
                  </>
                )}
              </Button>
              <Button
                variant={"surface"}
                size={"xs"}
                fontSize={15}
                onClick={() => setOpenCustomBidModal(true)}
              >
                <MdAdd /> <Text as={"span"}>{"Custom amount"}</Text>
              </Button>
            </Flex>
          </Card.Body>
        </Card.Root>
      </motion.div>
      <OverBidModal
        open={openForceBidModal}
        setOpen={setOpenForceBidModal}
        race={race.name}
        totalPoints={totalPoints}
        customBid={customBidInput}
        setCurrentBid={setCurrentBid}
        setCurrentBidInput={setCurrentBidInput}
        setCustomBidInput={setCustomBidInput}
        currentBid={currentBid}
      />
      <CustomBidModal
        open={openCustomBidModal}
        setOpen={setOpenCustomBidModal}
        customBid={customBidInput}
        setCustomBidInput={setCustomBidInput}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default RaceAuction;
