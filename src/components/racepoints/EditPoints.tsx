import { Field } from "@/components/ui/field";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import isStringPositiveNumber from "@/helpers/isStringPositiveNumber";

function EditPoints({ setPoints }: { setPoints: (points: number) => void }) {
  const [input, setInput] = useState("0");

  const validatePoints = (points: string) => {
    if (isStringPositiveNumber(points)) {
      setInput(String(+points));
      setPoints(parseInt(points, 10));
    }
  };

  return (
    <Box marginBlock={15} width={"80%"} marginInline={"auto"}>
      <Field label={"Points: "} color={"#cecece"} fontSize={"md"}>
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
