import { Flex, Text } from "@chakra-ui/react";
import { motion } from "motion/react";

function ShowPoints({ points }: { points: number }) {
  return (
    <Flex direction={"column-reverse"} width={"100%"} flexGrow={1}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key={points}>
        <Text
          textAlign={"center"}
          fontSize={30}
          paddingInline={15}
          color={"#ebe53c"}
        >
          {points}
        </Text>
      </motion.div>
    </Flex>
  );
}

export default ShowPoints;
