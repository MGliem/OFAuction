import { Box, Text } from "@chakra-ui/react";
import { motion } from "motion/react";

function ShowPoints({ points }: { points: number }) {
  return (
    <Box
      as={motion.div}
      marginBlock={"auto"}
      width={"100%"}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      key={points}
    >
      <Text
        textAlign={"center"}
        fontSize={30}
        paddingInline={15}
        color={"#ebe53c"}
      >
        {points}
      </Text>
    </Box>
  );
}

export default ShowPoints;
