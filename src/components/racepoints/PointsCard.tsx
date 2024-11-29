import { Card } from "@chakra-ui/react";
import { type Race } from "@/types";
import EditPoints from "./EditPoints";
import ShowPoints from "./ShowPoints";

function PointsCard({
  race,
  showEdit,
  points,
  setPoints,
}: {
  race: Race;
  showEdit: boolean;
  points: number;
  setPoints: (p: number) => void;
}) {
  return (
    <Card.Root
      width={{ base:"90%", md: "60%", xl: "320px"}}
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
          <EditPoints points={points} setPoints={setPoints} />
        ) : (
          <ShowPoints points={points} />
        )}
      </Card.Body>
    </Card.Root>
  );
}

export default PointsCard;
