import { Box, Card, Flex, Text } from "@chakra-ui/react";
import TextInput from "@/components/ui/TextInput";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Race } from "@/types";
import RaceAuction from "./RaceAuction";
import { useEffect } from "react";

function AuctionCard({
  races,
  auctionNumber,
  currentItem,
  nextAuction,
  setCurrentItem,
  setCurrentWinningRace,
  currentWinningPoints,
  setCurrentWinningPoints,
  totalPoints,
}: {
  races: Race[];
  auctionNumber: number;
  currentItem: string;
  nextAuction: () => void;
  setCurrentItem: (item: string) => void;
  setCurrentWinningRace: (
    race: "tauren" | "orc" | "undead" | "troll" | "",
  ) => void;
  currentWinningPoints: number;
  setCurrentWinningPoints: (points: number) => void;
  totalPoints: { tauren: number; orc: number; undead: number; troll: number };
}) {
  const checkCurrentWinner = (race: string, points: number) => {
    if (points > currentWinningPoints) {
      if (
        race === "tauren" ||
        race === "orc" ||
        race === "undead" ||
        race === "troll"
      ) {
        setCurrentWinningRace(race);
        setCurrentWinningPoints(points);
      }
    }
  };

  useEffect(() => {
    setCurrentWinningRace("");
    setCurrentWinningPoints(0);
  }, [auctionNumber, setCurrentWinningRace, setCurrentWinningPoints]);

  return (
    <Card.Root
      width={"90%"}
      marginInline={"auto"}
      marginBlock={20}
      backgroundColor={"#181818"}
      border={"2px solid #cecece"}
      borderRadius={"10px"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <Card.Body>
        <Card.Title
          color={"#cecece"}
          fontSize={"xl"}
        >{`Auction #${auctionNumber}`}</Card.Title>
        <Box margin={8}>
          <Field label="Item(s):" color={"#cecece"} fontSize={"md"}>
            <TextInput
              width={{base: "100%", md:"420px"}}
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              placeholder={"Example: slot 1,2,3..."}
              _placeholder={{ color: "#a3a3a3" }}
            />
          </Field>
        </Box>
        <Text color={"#cecece"} fontSize={18} fontWeight={600} marginBottom={3}>
          {"Bids: "}
        </Text>
        <Flex gap={5} justifyContent={"center"} alignItems={"center"} flexDirection={{ base: "column", lg: "row" }}>
          <Flex gap={5} flexDirection={{ base: "column", md: "row" }} w={"100%"} justifyContent={"end"} alignItems={"center"}>
          <RaceAuction
            race={races[0]}
            auctionNumber={auctionNumber}
            checkCurrentWinner={checkCurrentWinner}
            totalPoints={
              totalPoints[
                races[0].name.toLowerCase() as keyof typeof totalPoints
              ]
            }
          />
          <RaceAuction
            race={races[1]}
            auctionNumber={auctionNumber}
            checkCurrentWinner={checkCurrentWinner}
            totalPoints={
              totalPoints[
                races[1].name.toLowerCase() as keyof typeof totalPoints
              ]
            }
          />
          </Flex>
          <Flex gap={5} flexDirection={{ base: "column", md: "row" }} w={"100%"} justifyContent={"start"} alignItems={"center"}>
          <RaceAuction
            race={races[2]}
            auctionNumber={auctionNumber}
            checkCurrentWinner={checkCurrentWinner}
            totalPoints={
              totalPoints[
                races[2].name.toLowerCase() as keyof typeof totalPoints
              ]
            }
          />
          <RaceAuction
            race={races[3]}
            auctionNumber={auctionNumber}
            checkCurrentWinner={checkCurrentWinner}
            totalPoints={
              totalPoints[
                races[3].name.toLowerCase() as keyof typeof totalPoints
              ]
            }
          />
          </Flex>
        </Flex>
        <Box marginInline={"auto"} marginTop={7}>
          <Button variant={"surface"} onClick={() => nextAuction()}>
            {"Done/New Auction"}
          </Button>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}

export default AuctionCard;
