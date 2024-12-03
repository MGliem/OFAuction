import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import TextInput from "@/components/ui/TextInput";
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
    <Card
      width={"90%"}
      marginInline={"auto"}
      marginBlock={5}
      backgroundColor={"#181818"}
      border={"2px solid #cecece"}
      borderRadius={"10px"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <CardBody>
        <Flex flexDirection={"column"}>
          <Text
            color={"#cecece"}
            fontSize={"xl"}
            fontWeight={"bold"}
            marginBottom={currentWinningPoints > 0 ? 0 : "37.5px"}
          >{`Auction #${auctionNumber}`}</Text>
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
          <Box margin={5}>
            <FormControl>
              <FormLabel color={"#cecece"} fontSize={"md"}>
                {"Item(s):"}
              </FormLabel>
              <TextInput
                width={{ base: "100%", md: "420px" }}
                value={currentItem}
                onChange={(e) => setCurrentItem(e.target.value)}
                placeholder={"Anything you want. Not required."}
                _placeholder={{ color: "#a3a3a3" }}
              />
            </FormControl>
          </Box>
          <Text
            color={"#cecece"}
            fontSize={18}
            marginBlock={3}
          >
            {"Bids: "}
          </Text>
          <Button
            bg={"#cecece"}
            _hover={{ bg: "#eaeaea" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
              borderColor: "#848484",
            }}
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
              bg={"#cecece"}
              _hover={{ bg: "#eaeaea" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#848484",
              }}
              onClick={() => nextAuction()}
              fontSize={16}
            >
              {"Done/New Auction"}
            </Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default AuctionCard;
