import { useState } from "react";
import PointsCard from "./components/racepoints/PointsCard";
import { Box, Flex } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MdOutlineSave, MdOutlineModeEdit } from "react-icons/md";
import { AuctionHistory, type Race } from "./types";
import AuctionCard from "./components/auction/AuctionCard";
import HistoryCard from "./components/history/HistoryCard";

const tauren: Race = {
  name: "Tauren",
  color: "#6a3633",
};

const orc: Race = {
  name: "Orc",
  color: "#3b9d34",
};

const undead: Race = {
  name: "Undead",
  color: "#6f349d",
};

const troll: Race = {
  name: "Troll",
  color: "#34709d",
};

const races = [tauren, orc, undead, troll];

function App() {
  const [points, setPoints] = useState({
    tauren: 0,
    orc: 0,
    undead: 0,
    troll: 0,
  });
  const [showEdit, setShowEdit] = useState(true);
  const [isFirstTimePointsSet, setIsFirstTimePointsSet] = useState(false);
  const [auctionNumber, setAuctionNumber] = useState(1);
  const [currentItem, setCurrentItem] = useState("");
  const [currentWinningRace, setCurrentWinningRace] = useState<
    "tauren" | "orc" | "undead" | "troll" | ""
  >("");
  const [currentWinningPoints, setCurrentWinningPoints] = useState(0);
  const [auctionHistory, setAuctionHistory] = useState<AuctionHistory[]>([]);

  const savePoints = () => {
    setShowEdit(!showEdit);
    if (!isFirstTimePointsSet) {
      setIsFirstTimePointsSet(true);
    }
  };

  const setTaurenPoints = (taurenPoints: number) => {
    setPoints({ ...points, tauren: taurenPoints });
  };

  const setOrcPoints = (orcPoints: number) => {
    setPoints({ ...points, orc: orcPoints });
  };

  const setUndeadPoints = (undeadPoints: number) => {
    setPoints({ ...points, undead: undeadPoints });
  };

  const setTrollPoints = (trollPoints: number) => {
    setPoints({ ...points, troll: trollPoints });
  };

  const nextAuction = () => {
    setAuctionHistory([
      ...auctionHistory,
      {
        auction: auctionNumber,
        item: currentItem,
        winner: currentWinningRace,
        points: currentWinningPoints,
      },
    ]);

    setAuctionNumber((current) => current + 1);
    setCurrentItem("");
    const newPoints = { ...points };
    if (currentWinningRace !== "")
      newPoints[currentWinningRace] -= currentWinningPoints;
    setPoints(newPoints);
  };

  return (
    <>
      <Box paddingTop={5} paddingBottom={30} borderBottom={"2px solid #cecece"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          paddingInline={5}
          gap={5}
        >
          <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={"end"} alignItems={"center"} w={"100%"} gap={5}>
            <PointsCard
              race={tauren}
              showEdit={showEdit}
              points={points.tauren}
              setPoints={setTaurenPoints}
            />
            <PointsCard
              race={orc}
              showEdit={showEdit}
              points={points.orc}
              setPoints={setOrcPoints}
            />
          </Flex>
          <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={"start"} alignItems={"center"} w={"100%"} gap={5}>
            <PointsCard
              race={undead}
              showEdit={showEdit}
              points={points.undead}
              setPoints={setUndeadPoints}
            />
            <PointsCard
              race={troll}
              showEdit={showEdit}
              points={points.troll}
              setPoints={setTrollPoints}
            />
          </Flex>
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
          <Box borderBottom={"2px solid #cecece"}>
            <AuctionCard
              races={races}
              auctionNumber={auctionNumber}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              nextAuction={nextAuction}
              setCurrentWinningRace={setCurrentWinningRace}
              currentWinningPoints={currentWinningPoints}
              setCurrentWinningPoints={setCurrentWinningPoints}
              totalPoints={points}
            />
          </Box>
          <HistoryCard auctionHistory={auctionHistory} />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
