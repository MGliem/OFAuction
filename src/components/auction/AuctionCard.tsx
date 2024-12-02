import { Box, Card, Flex, Text } from "@chakra-ui/react";
import TextInput from "@/components/ui/TextInput";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { type Race, type RaceColor } from "@/types";
import RaceAuction from "./RaceAuction";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

function AuctionCard({
  auctionNumber,
  currentItem,
  nextAuction,
  setCurrentItem,
  totalPoints,
  bids,
  setBidPoints,
  groupedRaces,
  randomizeAndGroupRaces,
}: {
  auctionNumber: number;
  currentItem: string;
  nextAuction: () => void;
  setCurrentItem: (item: string) => void;
  totalPoints: { tauren: number; orc: number; undead: number; troll: number };
  bids: { tauren: number; orc: number; undead: number; troll: number };
  setBidPoints: (bid: number, race: Race) => void;
  groupedRaces: RaceColor[][];
  randomizeAndGroupRaces: () => void;
}) {
  const [currentWinningRace, setCurrentWinningRace] = useState("");
  const [currentWinningPoints, setCurrentWinningPoints] = useState(0);

  useEffect(() => {
    const [currentWinningRace, currentWinningPoints] = Object.entries(
      bids,
    ).reduce((max, current) => {
      return current[1] > max[1] ? current : max;
    });
    setCurrentWinningRace(currentWinningRace);
    setCurrentWinningPoints(currentWinningPoints);
  }, [bids]);

  return (
    <Card.Root
      width={"90%"}
      marginInline={"auto"}
      marginBlock={5}
      backgroundColor={"#181818"}
      border={"2px solid #cecece"}
      borderRadius={"10px"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <Card.Body>
        <Card.Title
          color={"#cecece"}
          fontSize={"xl"}
          marginBottom={currentWinningPoints > 0 ? 0 : "37.5px"}
        >{`Auction #${auctionNumber}`}</Card.Title>
        <Flex
          display={currentWinningPoints > 0 ? "flex" : "none"}
          w={"100%"}
          flexDirection={{ base: "column", sm: "row" }}
          alignItems={"center"}
          justifyContent={"center"}
          color={"#cecece"}
          fontSize={25}
        >
          <Text whiteSpace={"pre-wrap"}>{"Current winner: "}</Text>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={currentWinningRace}
          >
            <Text as={"span"}>
              {currentWinningRace.charAt(0).toUpperCase() +
                String(currentWinningRace).slice(1)}
            </Text>
          </motion.div>
          <Text as={"span"} whiteSpace={"pre-wrap"}>
            {" with "}
          </Text>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={currentWinningPoints}
          >
            <Text as={"span"}>{currentWinningPoints}</Text>
          </motion.div>
        </Flex>
        <Box margin={8}>
          <Field label="Item(s):" color={"#cecece"} fontSize={"md"}>
            <TextInput
              width={{ base: "100%", md: "420px" }}
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              placeholder={"Anything you want. Not required."}
              _placeholder={{ color: "#a3a3a3" }}
            />
          </Field>
        </Box>
        <Text color={"#cecece"} fontSize={18} fontWeight={600} marginBottom={3}>
          {"Bids: "}
        </Text>
        <Button
          variant={"surface"}
          onClick={() => randomizeAndGroupRaces()}
          marginInline={"auto"}
          disabled={currentWinningPoints > 0}
          fontSize={16}
          marginBottom={5}
        >
          {"Randomize order"}
        </Button>
        <Flex
          gap={5}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
        >
          {groupedRaces.map((groupedRace, i) => (
            <Flex
              key={i}
              gap={5}
              flexDirection={{ base: "column", md: "row" }}
              w={{ base: "100%", lg: "80%", "2xl": "fit-content" }}
              justifyContent={"end"}
              alignItems={"center"}
            >
              {groupedRace.map((race, j) => (
                <Box
                  key={j}
                  width={{ base: "100%", lg: "60%", "2xl": "320px" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    key={race.name}
                  >
                    <RaceAuction
                      key={j}
                      race={race}
                      auctionNumber={auctionNumber}
                      totalPoints={
                        totalPoints[
                          race.name.toLowerCase() as keyof typeof totalPoints
                        ]
                      }
                      setBidPoints={setBidPoints}
                      currentWinningPoints={currentWinningPoints}
                    />
                  </motion.div>
                </Box>
              ))}
            </Flex>
          ))}
        </Flex>
        <Box marginInline={"auto"} marginTop={7}>
          <Button
            variant={"surface"}
            onClick={() => nextAuction()}
            fontSize={18}
          >
            {"Done/New Auction"}
          </Button>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}

export default AuctionCard;
