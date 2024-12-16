import RaceAuction from "@/components/auction/RaceAuction";
import TextInput from "@/components/ui/TextInput";
import { type Race, type RaceColor } from "@/types";
import { ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
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
import { motion } from "motion/react";
import { useEffect, useState } from "react";

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
      border={"0px solid #cecece"}
      borderRadius={"10px"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <CardBody>
        <Flex flexDirection={"column"}>
          <Text
            color={"#cecece"}
            fontSize={"lg"}
            fontWeight={"bold"}
          >{`Auction #${auctionNumber}`}</Text>
          <Box marginTop={2}>
            <FormControl marginTop={3}>
              <FormLabel color={"#cecece"} fontSize={"md"}>
                {"Container:"}
              </FormLabel>
              <TextInput
                width={{ base: "100%", md: "150px" }}
                value={currentItem}
                onChange={(e) => setCurrentItem(e.target.value)}
              />
            </FormControl>
          </Box>
          <Button
            display={"none"}
            size={"sm"}
            color={"#000"}
            bg={"#cecece"}
            _hover={{ bg: "#eaeaea" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
              borderColor: "#848484",
            }}
            leftIcon={<RepeatIcon />}
            onClick={() => randomizeAndGroupRaces()}
            marginInline={"auto"}
            marginTop={"4"}
            disabled={currentWinningPoints > 0}
            fontSize={16}
          >
            {"Randomize order"}
          </Button>
          <Flex
            marginTop={5}
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
                        currentWinningRace={currentWinningRace}
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
              size={"sm"}
              color={"#000"}
              bg={"#cecece"}
              _hover={{ bg: "#eaeaea" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#848484",
              }}
              leftIcon={<ArrowForwardIcon />}
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
