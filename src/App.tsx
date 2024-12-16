import AuctionCard from "@/components/auction/AuctionCard";
import HistoryCard from "@/components/history/HistoryCard";
import PointsCard from "@/components/racepoints/PointsCard";
import shuffleArrayNoSameIndex from "@/helpers/shuffleArray";
import { type AuctionHistory, type Race, type RaceColor } from "@/types";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const tauren: RaceColor = {
  name: "Tauren",
  color: "#6a3633",
};

const orc: RaceColor = {
  name: "Orc",
  color: "#3b9d34",
};

const undead: RaceColor = {
  name: "Undead",
  color: "#6f349d",
};

const troll: RaceColor = {
  name: "Troll",
  color: "#34709d",
};

const races = [orc, troll, tauren, undead];
const staticGroupedRaces = [
  [orc, troll],
  [tauren, undead],
];

function App() {
  const [points, setPoints] = useState({
    orc: 0,
    undead: 0,
    troll: 0,
    tauren: 0,
  });
  const [bids, setBids] = useState({
    orc: 0,
    troll: 0,
    tauren: 0,
    undead: 0,
  });
  const [showEdit, setShowEdit] = useState(true);
  const [isFirstTimePointsSet, setIsFirstTimePointsSet] = useState(false);
  const [auctionNumber, setAuctionNumber] = useState(1);
  const [currentItem, setCurrentItem] = useState("");
  const [auctionHistory, setAuctionHistory] = useState<AuctionHistory[]>([]);
  const [randomizedGroupedRaces, setRandomizedGroupedRaces] =
    useState<RaceColor[][]>(staticGroupedRaces);
  const [lastStartRace, setLastStartRace] = useState<Race | null>(null);

  const currentAuctionFirstRaceIsSet = useRef(false);
  const tempStartRace = useRef<Race | null>();
  const multipleWinners = useRef<Race[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const randomizeAndGroupRaces = () => {
    const randomizeRaces = shuffleArrayNoSameIndex(races);

    const groupedRaces = [];
    for (let i = 0; i < randomizeRaces.length; i += 2) {
      groupedRaces.push(randomizeRaces.slice(i, i + 2));
    }
    setRandomizedGroupedRaces(groupedRaces);
    setBids({
      orc: 0,
      troll: 0,
      tauren: 0,
      undead: 0,
    });
  };

  const savePoints = () => {
    setShowEdit(!showEdit);
    if (!isFirstTimePointsSet) {
      setIsFirstTimePointsSet(true);
    }
  };

  const setRacePoints = (changePoints: number, race: Race) => {
    const newPoints = { ...points };
    newPoints[race] = changePoints;
    setPoints(newPoints);
  };

  const setBidPoints = (bid: number, race: Race) => {
    const newBids = { ...bids };
    newBids[race] = bid;

    if (!currentAuctionFirstRaceIsSet.current) {
      currentAuctionFirstRaceIsSet.current = true;
      tempStartRace.current = race;
    }

    setBids(newBids);
  };

  const handleMultipleWinnerModal = (winner: Race) => {
    const newBids = { ...bids };
    for (let i = 0; i < multipleWinners.current.length; i++) {
      if (winner !== multipleWinners.current[i]) {
        newBids[multipleWinners.current[i]] = 0;
      }
    }
    setBids(newBids);
  };

  const nextAuction = useCallback(() => {
    type Accumulator = [string | null, number, string[]];

    const [currentWinningRace, currentWinningPoints, possibleWinners] =
      Object.entries(bids).reduce<Accumulator>(
        (acc, current) => {
          if (current[1] > acc[1]) {
            return [current[0], current[1], [current[0]]];
          }

          if (current[1] === acc[1] && current[1] > 0) {
            acc[2].push(current[0]);
          }

          return acc;
        },
        [null, -Infinity, []],
      );

    if (possibleWinners.length > 1) {
      multipleWinners.current = possibleWinners as Race[];
      onOpen();
      return;
    }

    multipleWinners.current = [];

    setAuctionHistory([
      ...auctionHistory,
      {
        auction: auctionNumber,
        item: currentItem,
        winner:
          currentWinningPoints > 0
            ? currentWinningRace
              ? currentWinningRace
              : "Something went wrong"
            : "Nobody",
        points: currentWinningPoints,
      },
    ]);

    setAuctionNumber((current) => current + 1);
    setCurrentItem("");
    const newPoints = { ...points };

    if (
      currentWinningRace === "tauren" ||
      currentWinningRace === "orc" ||
      currentWinningRace === "undead" ||
      currentWinningRace === "troll"
    ) {
      newPoints[currentWinningRace] -= currentWinningPoints;
    }

    currentAuctionFirstRaceIsSet.current = false;

    if (tempStartRace.current) {
      setLastStartRace(tempStartRace.current);
    }

    tempStartRace.current = null;

    setPoints(newPoints);

    setBids({
      tauren: 0,
      orc: 0,
      undead: 0,
      troll: 0,
    });
  }, [auctionHistory, auctionNumber, bids, currentItem, onOpen, points]);

  // useEffect(() => {
  //   randomizeAndGroupRaces();
  // }, []);

  useEffect(() => {
    if (multipleWinners.current.length > 0) {
      nextAuction();
    }
  }, [bids, nextAuction]);

  return (
    <>
      <Box
        w={"90%"}
        marginInline={"auto"}
        marginTop={5}
        padding={5}
        backgroundColor={"#181818"}
        border={"0px solid #cecece"}
        borderRadius={"10px"}
        boxShadow={"3px 2px 10px -1px #000000"}
      >
        <Text
          color={"#cecece"}
          fontWeight={"bold"}
          fontSize={"lg"}
          marginBottom={4}
        >
          {"Points"}
        </Text>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
        >
          {randomizedGroupedRaces.map((groupedRace, i) => (
            <Flex
              key={i}
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={"center"}
              alignItems={"center"}
              w={{ base: "100%", lg: "80%", "2xl": "fit-content" }}
              gap={5}
            >
              {groupedRace.map((race, j) => (
                <Box
                  as={motion.div}
                  key={j}
                  width={{ base: "100%", lg: "60%", "2xl": "320px" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <PointsCard
                      key={j}
                      race={race}
                      showEdit={showEdit}
                      points={points[race.name.toLowerCase() as Race]}
                      setPoints={setRacePoints}
                    />
                  </motion.div>
                </Box>
              ))}
            </Flex>
          ))}
        </Flex>
        <Box textAlign={"center"} marginTop={30}>
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
            onClick={() => savePoints()}
            leftIcon={showEdit ? <LockIcon /> : <UnlockIcon />}
          >
            {showEdit ? "Lock" : "Edit"}
          </Button>
        </Box>
      </Box>
      {isFirstTimePointsSet ? (
        <>
          <Box>
            <AuctionCard
              auctionNumber={auctionNumber}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              nextAuction={nextAuction}
              totalPoints={points}
              bids={bids}
              setBidPoints={setBidPoints}
              groupedRaces={randomizedGroupedRaces}
              randomizeAndGroupRaces={randomizeAndGroupRaces}
              lastStartRace={lastStartRace}
            />
          </Box>
          <HistoryCard auctionHistory={auctionHistory} />
        </>
      ) : (
        ""
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        autoFocus={false}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg={"#171717"} height={"300px"}>
          <ModalHeader fontSize={"xl"} color={"orange"}>
            {"Multiple potential winners"}
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            fontSize={"lg"}
            textAlign={"center"}
          >
            <Text>{`There is multiple races with the same bid.`}</Text>
            <Text>{`Who should win?`}</Text>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            {multipleWinners.current.map((winner) => (
              <Button
                key={winner}
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
                  handleMultipleWinnerModal(winner);
                  onClose();
                }}
                textTransform={"capitalize"}
              >
                {winner}
              </Button>
            ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
