import { Input, type InputProps } from "@chakra-ui/react";
import { useState } from "react";

function TextInput({ ...props }: InputProps) {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <Input
      backgroundColor={"#454545"}
      border={`2px solid ${hasFocus ? "#cecece" : "#5a778e"}`}
      borderRadius={"5px"}
      color={"white"}
      {...props}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    />
  );
}

export default TextInput;
