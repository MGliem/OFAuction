import { Card } from "@chakra-ui/react";
import { motion } from "motion/react";
import { type Race } from "@/types";
import EditPoints from "./EditPoints";
import ShowPoints from "./ShowPoints";

function PointsCard({
  race,
  showEdit,
  points,
  setPoints,
  animeDelay,
}: {
  race: RaceColor;
  showEdit: boolean;
  points: number;
  setPoints: (points: number, race: Race) => void;
  animeDelay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: animeDelay }}
    >
      <Card.Root
        width={{ base: "90%", md: "60%", xl: "320px" }}
        height={"200px"}
        backgroundColor={"#181818"}
        borderColor={race.color}
        borderWidth={"2px"}
        borderStyle={"solid"}
        borderRadius={"10px"}
        boxShadow={"3px 2px 10px -1px #000000"}
        animationDuration={"slow"}
        animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }}
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
    </motion.div>
  );
}

export default PointsCard;
