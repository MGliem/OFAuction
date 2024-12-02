import { Box, Card } from "@chakra-ui/react";
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
    <Box width={{ base: "100%", lg: "60%", "2xl": "320px" }}>
        <Card.Root
          height={"200px"}
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
            {showEdit ? (
              <EditPoints points={points} setPoints={changePoints} />
            ) : (
              <ShowPoints points={points} />
            )}
          </Card.Body>
        </Card.Root>
    </Box>
  );
}

export default PointsCard;
