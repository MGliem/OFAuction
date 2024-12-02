import { Box, Card, Flex, Text } from "@chakra-ui/react";
import TextInput from "@/components/ui/TextInput";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { type Race, type RaceColor } from "@/types";
import RaceAuction from "./RaceAuction";
import { useEffect, useState } from "react";

function AuctionCard({
  races,
  auctionNumber,
  currentItem,
  nextAuction,
  setCurrentItem,
  totalPoints,
  bids,
  setBidPoints,
}: {
  races: RaceColor[];
  auctionNumber: number;
  currentItem: string;
  nextAuction: () => void;
  setCurrentItem: (item: string) => void;
  totalPoints: { tauren: number; orc: number; undead: number; troll: number };
  bids: { tauren: number; orc: number; undead: number; troll: number };
  setBidPoints: (bid: number, race: Race) => void;
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
        >{`Auction #${auctionNumber}`}</Card.Title>
        <Box margin={8}>
          <Field label="Item(s):" color={"#cecece"} fontSize={"md"}>
            <TextInput
              width={{ base: "100%", md: "420px" }}
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
        <Text
          color={"#cecece"}
          w={"100%"}
          textAlign={"center"}
          marginBottom={2}
          fontSize={25}
        >
          {currentWinningPoints > 0
            ? `Current winner: ${currentWinningRace.charAt(0).toUpperCase() + String(currentWinningRace).slice(1)} with ${currentWinningPoints}`
            : ""}
        </Text>
        <Flex
          gap={5}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Flex
            gap={5}
            flexDirection={{ base: "column", md: "row" }}
            w={"100%"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <RaceAuction
              race={races[0]}
              auctionNumber={auctionNumber}
              totalPoints={
                totalPoints[
                  races[0].name.toLowerCase() as keyof typeof totalPoints
                ]
              }
              animeDelay={0.2}
              setBidPoints={setBidPoints}
            />
            <RaceAuction
              race={races[1]}
              auctionNumber={auctionNumber}
              totalPoints={
                totalPoints[
                  races[1].name.toLowerCase() as keyof typeof totalPoints
                ]
              }
              animeDelay={0.3}
              setBidPoints={setBidPoints}
            />
          </Flex>
          <Flex
            gap={5}
            flexDirection={{ base: "column", md: "row" }}
            w={"100%"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <RaceAuction
              race={races[2]}
              auctionNumber={auctionNumber}
              totalPoints={
                totalPoints[
                  races[2].name.toLowerCase() as keyof typeof totalPoints
                ]
              }
              animeDelay={0.4}
              setBidPoints={setBidPoints}
            />
            <RaceAuction
              race={races[3]}
              auctionNumber={auctionNumber}
              totalPoints={
                totalPoints[
                  races[3].name.toLowerCase() as keyof typeof totalPoints
                ]
              }
              animeDelay={0.5}
              setBidPoints={setBidPoints}
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
