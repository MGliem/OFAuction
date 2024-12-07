import TextInput from "@/components/ui/TextInput";
import isStringNumber from "@/helpers/isStringNumber";
import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

function EditPoints({
  points,
  setPoints,
}: {
  points: number;
  setPoints: (points: number) => void;
}) {
  const [input, setInput] = useState(points.toString());

  const validatePoints = (points: string) => {
    if (points === "") {
      setInput("");
      setPoints(0);
    } else if (points === "-") {
      setInput("-");
      setPoints(0);
    } else if (isStringNumber(points)) {
      setInput(String(points));
      setPoints(parseInt(points, 10));
    }
  };

  return (
    <Box marginBlock={"auto"} width={"80%"} marginInline={"auto"}>
      <FormControl>
        <FormLabel color={"#cecece"} fontSize={"md"}>
          {"Points:"}
        </FormLabel>
        <TextInput
          fontSize={16}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            validatePoints(e.target.value)
          }
        />
      </FormControl>
    </Box>
  );
}

export default EditPoints;
