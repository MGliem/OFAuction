import { Race } from "@/types";
import { Card, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import { Field } from "@/components/ui/field";
import isStringPositiveNumber from "@/helpers/isStringPositiveNumber";

function RaceAuction({
  race,
  checkCurrentWinner,
  auctionNumber,
}: {
  race: Race;
  checkCurrentWinner: (race: string, points: number) => void;
  auctionNumber: number;
}) {
  const [currentBid, setCurrentBid] = useState(0);
  const [isCurrentBidEdit, setIsCurrentBidEdit] = useState(false);
  const [currentBidInput, setCurrentBidInput] = useState("0");
  const [customBidInput, setCustomBidInput] = useState("");

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

  const validateCustomBid = (bid: string) => {
    if (isStringPositiveNumber(bid)) {
      setCustomBidInput(String(+bid));
    }
  };

  const handleBidKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (isStringPositiveNumber(currentBidInput)) {
        setCurrentBid(+currentBidInput);
        setIsCurrentBidEdit(false);
      }
    }
  };

  const handleCustomKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      console.log(e);
    }
  };

  return (
    <Card.Root
      width={"320px"}
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
          margin={0}
          paddingBottom={10}
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
              <TextInput
                value={currentBidInput}
                onChange={(e) => validateEditBid(e.target.value)}
                onKeyUp={(e) => handleBidKeyUp(e)}
              />
            ) : (
              <Text
                textAlign={"center"}
                color={"#cecece"}
                fontSize={20}
                paddingBottom={"10px"}
                flex={1}
              >
                {currentBid}
              </Text>
            )}
          </Flex>
          <Button
            variant={"surface"}
            colorPalette={"accent"}
            size={"xs"}
            fontSize={15}
            marginBlock={4}
            onClick={() => {
              setCurrentBid((current) => current + 50);
              setCurrentBidInput((current) => String(+current + 50));
              setIsCurrentBidEdit(false);
            }}
          >
            {"+50"}
          </Button>
          <Field label={"Custom:"} color={"#cecece"}>
            <TextInput
              value={customBidInput}
              onChange={(e) => validateCustomBid(e.target.value)}
              onKeyUp={(e) => handleCustomKeyUp(e)}
            />
          </Field>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default RaceAuction;
