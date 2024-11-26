import { Flex, Text } from "@chakra-ui/react";

function ShowPoints({
  points
}: {
    points: number;
}) {
  return (
    <Flex direction={"column-reverse"} width={"100%"} color={"#cecece"} flexGrow={1}>
      <Text textAlign={"center"} fontSize={30}  paddingInline={15}>{points}</Text>
    </Flex>
  );
}

export default ShowPoints;
