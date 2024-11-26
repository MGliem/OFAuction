import { Field } from "@/components/ui/field";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

function EditPoints({
  setPoints,
}: {
  setPoints: (points: number) => void;
}) {
  const [input, setInput] = useState("0");

  const validatePoints = (points: string) => {
    const numericPoints = +points;
    if (Number.isInteger(numericPoints) && numericPoints >= 0) {
      setInput(points);
      setPoints(numericPoints);
    }
  };

  return (
    <Box marginBlock={15} width={"80%"} marginInline={"auto"}>
      <Field label={"Points: "} color={"#cecece"}>
        <TextInput
          fontSize={16}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            validatePoints(e.target.value)
          }
        />
      </Field>
    </Box>
  );
}

export default EditPoints;
