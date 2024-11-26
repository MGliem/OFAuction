import { useState } from "react";
import PointsCard from "./components/racepoints/PointsCard";
import { Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MdOutlineSave, MdOutlineModeEdit } from "react-icons/md";
import { type Race } from "./Types";

const tauren: Race = {
  name: "Tauren",
  color: "#6a3633",
};

const orc: Race = {
  name: "Orc",
  color: "#3b9d34",
};

const undead: Race = {
  name: "Undead",
  color: "#6f349d",
};

const troll: Race = {
  name: "Troll",
  color: "#34709d",
};

function App() {
  const [points, setPoints] = useState({
    tauren: 0,
    orc: 0,
    undead: 0,
    troll: 0,
  });
  const [showEdit, setShowEdit] = useState(true);

  const setTaurenPoints = (taurenPoints: number) => {
    setPoints({ ...points, tauren: taurenPoints });
  };

  const setOrcPoints = (orcPoints: number) => {
    setPoints({ ...points, orc: orcPoints });
  };

  const setUndeadPoints = (undeadPoints: number) => {
    setPoints({ ...points, undead: undeadPoints });
  };

  const setTrollPoints = (trollPoints: number) => {
    setPoints({ ...points, troll: trollPoints });
  };

  return (
    <Box paddingTop={5} paddingBottom={30} borderBottom={"2px solid #cecece"}>
      <Box display="flex" justifyContent="center" paddingInline={5} gap={5}>
        <PointsCard
          race={tauren}
          showEdit={showEdit}
          points={points.tauren}
          setPoints={setTaurenPoints}
        />
        <PointsCard
          race={orc}
          showEdit={showEdit}
          points={points.orc}
          setPoints={setOrcPoints}
        />
        <PointsCard
          race={undead}
          showEdit={showEdit}
          points={points.undead}
          setPoints={setUndeadPoints}
        />
        <PointsCard
          race={troll}
          showEdit={showEdit}
          points={points.troll}
          setPoints={setTrollPoints}
        />
      </Box>
      <Box textAlign={"center"} marginTop={30}>
        <Button size={"lg"} variant={"surface"} onClick={() => setShowEdit(!showEdit)}>{showEdit ? <><MdOutlineSave />{"Save"}</> : <><MdOutlineModeEdit />{"Edit"}</>}</Button>
      </Box>
    </Box>
  );
}

export default App;
