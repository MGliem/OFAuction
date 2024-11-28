import { Box, Card, Flex, Text } from "@chakra-ui/react";
import TextInput from "@/components/ui/TextInput";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Race } from "@/types";
import RaceAuction from "./RaceAuction";

function AuctionCard({
  races,
  auctionNumber,
  currentItem,
  nextAuction,
  setCurrentItem,
  setCurrentWinningRace,
  currentWinningPoints,
  setCurrentWinningPoints,
}: {
  races: Race[];
  auctionNumber: number;
  currentItem: string;
  nextAuction: () => void;
  setCurrentItem: (item: string) => void;
  setCurrentWinningRace: (race: "tauren" | "orc" | "undead" | "troll") => void;
  currentWinningPoints: number;
  setCurrentWinningPoints: (points: number) => void;
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

  return (
    <Card.Root
      width={"80%"}
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
        <Box margin={10}>
          <Field label="Item(s):" color={"#cecece"} fontSize={"md"}>
            <TextInput
              width={"50%"}
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
        <Flex gap={5}>
          {races.map((race, i) => (
            <RaceAuction
              key={i}
              race={race}
              auctionNumber={auctionNumber}
              checkCurrentWinner={checkCurrentWinner}
            />
          ))}
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
