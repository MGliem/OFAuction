import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { type Race, type RaceColor } from "@/types";
import EditPoints from "./EditPoints";
import ShowPoints from "./ShowPoints";

function PointsCard({
  race,
  showEdit,
  points,
  setPoints,
}: {
  race: RaceColor;
  showEdit: boolean;
  points: number;
  setPoints: (points: number, race: Race) => void;
}) {
  const changePoints = (points: number) => {
    setPoints(points, race.name.toLowerCase() as Race);
  };

  return (
    <Card
      height={"200px"}
      backgroundColor={"#181818"}
      borderColor={race.color}
      borderWidth={"2px"}
      borderStyle={"solid"}
      borderRadius={"10px"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <CardBody>
        <Flex h={"100%"} flexDirection={"column"}>
        <Text
          color={"#cecece"}
          textAlign={"center"}
          borderBottom={"2px solid #cecece"}
          margin={0}
          paddingBottom={6}
          fontSize={30}
          style={{ textWrap: "nowrap" }}
        >
          {race.name}
        </Text>
        {showEdit ? (
          <EditPoints points={points} setPoints={changePoints} />
        ) : (
          <ShowPoints points={points} />
        )}
        </Flex>
      </CardBody>
    </Card>
  );
}

export default PointsCard;
