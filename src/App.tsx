import { useState } from "react";
import PointsCard from "./components/racepoints/PointsCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MdOutlineSave, MdOutlineModeEdit } from "react-icons/md";
import { type AuctionHistory, type RaceColor, type Race } from "./types";
import AuctionCard from "./components/auction/AuctionCard";
import HistoryCard from "./components/history/HistoryCard";
import { motion } from "motion/react";
import shuffleArray from "./helpers/shuffleArray";

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

const races = [tauren, orc, undead, troll];
const staticGroupedRaces = [
  [tauren, orc],
  [undead, troll],
];

function App() {
  const [points, setPoints] = useState({
    tauren: 0,
    orc: 0,
    undead: 0,
    troll: 0,
  });
  const [bids, setBids] = useState({
    tauren: 0,
    orc: 0,
    undead: 0,
    troll: 0,
  });
  const [showEdit, setShowEdit] = useState(true);
  const [isFirstTimePointsSet, setIsFirstTimePointsSet] = useState(false);
  const [auctionNumber, setAuctionNumber] = useState(1);
  const [currentItem, setCurrentItem] = useState("");
  const [auctionHistory, setAuctionHistory] = useState<AuctionHistory[]>([]);
  const [randomizedGroupedRaces, setRandomizedGroupedRaces] =
    useState<RaceColor[][]>(staticGroupedRaces);

  const randomizeAndGroupRaces = () => {
    const randomizeRaces = shuffleArray(races);

    const groupedRaces = [];
    for (let i = 0; i < randomizeRaces.length; i += 2) {
      groupedRaces.push(randomizeRaces.slice(i, i + 2));
    }
    setRandomizedGroupedRaces(groupedRaces);
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
    setBids(newBids);
  };

  const nextAuction = () => {
    const [currentWinningRace, currentWinningPoints] = Object.entries(
      bids,
    ).reduce((max, current) => {
      return current[1] > max[1] ? current : max;
    });

    setAuctionHistory([
      ...auctionHistory,
      {
        auction: auctionNumber,
        item: currentItem,
        winner: currentWinningPoints > 0 ? currentWinningRace : "Nobody",
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

    setPoints(newPoints);

    setBids({
      tauren: 0,
      orc: 0,
      undead: 0,
      troll: 0,
    });
  };

  return (
    <>
      <Box
        w={"90%"}
        marginInline={"auto"}
        marginTop={5}
        padding={5}
        backgroundColor={"#181818"}
        border={"2px solid #cecece"}
        borderRadius={"10px"}
      >
        <Text
          color={"#cecece"}
          fontWeight={"bold"}
          fontSize={"xl"}
          marginBottom={10}
        >
          {"Points"}
        </Text>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
        >
          {staticGroupedRaces.map((groupedRace, i) => (
            <Flex
              key={i}
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={"center"}
              alignItems={"center"}
              w={{ base: "100%", lg: "80%", "2xl": "fit-content" }}
              gap={5}
            >
              {groupedRace.map((race, raceIndex) => (
                <PointsCard
                  key={raceIndex}
                  race={race}
                  showEdit={showEdit}
                  points={points[race.name.toLowerCase() as Race]}
                  setPoints={setRacePoints}
                />
              ))}
            </Flex>
          ))}
        </Flex>
        <Box textAlign={"center"} marginTop={30}>
          <Button size={"lg"} variant={"surface"} onClick={() => savePoints()}>
            {showEdit ? (
              <>
                <MdOutlineSave />
                {"Save"}
              </>
            ) : (
              <>
                <MdOutlineModeEdit />
                {"Edit"}
              </>
            )}
          </Button>
        </Box>
      </Box>
      {isFirstTimePointsSet ? (
        <>
          <Box>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
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
              />
            </motion.div>
          </Box>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <HistoryCard auctionHistory={auctionHistory} />
          </motion.div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
