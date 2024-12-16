import { AuctionHistory } from "@/types";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ColumnName = "auction" | "item" | "winner" | "points";

function HistoryCard({ auctionHistory }: { auctionHistory: AuctionHistory[] }) {
  const [sortedHistory, setSortedHistory] =
    useState<AuctionHistory[]>(auctionHistory);
  const [filterIconColumn, setFilterIconColumn] =
    useState<ColumnName>("auction");

  useEffect(() => {
    setSortedHistory(auctionHistory);
  }, [auctionHistory]);

  const sortHistory = (
    sortBy: "auction" | "item" | "winner" | "points",
    isNumeric: boolean,
  ) => {
    const newSortedHistory = [...sortedHistory];

    if (isNumeric) {
      newSortedHistory.sort((a, b) => {
        return +a[sortBy] - +b[sortBy];
      });
    }

    if (!isNumeric) {
      newSortedHistory.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }

    setFilterIconColumn(sortBy);
    setSortedHistory(newSortedHistory);
  };

  return (
    <Card
      width={"90%"}
      marginInline={"auto"}
      marginBottom={5}
      backgroundColor={"#181818"}
      border={"0px solid #cecece"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <CardBody>
        <Text color={"#cecece"} fontSize={"xl"} fontWeight={"bold"}>
          {"History"}
        </Text>
        <TableContainer
          marginTop={10}
          borderWidth={"1px"}
          rounded={"md"}
          height={"280px"}
          boxShadow={"3px 2px 10px -1px #000000"}
          overflowX="scroll"
          overflowY="scroll"
        >
          <Table size={"sm"} variant="simple">
            <Thead position={"sticky"} top={0} zIndex={"docked"}>
              <Tr bg={"#2a2a2a"} h={"35px"}>
                <Th
                  w={"50px"}
                  paddingLeft={5}
                  color={"#cecece"}
                  fontWeight="bold"
                  fontSize={"lg"}
                  textTransform={"capitalize"}
                  onClick={() => sortHistory("auction", true)}
                  cursor={"pointer"}
                >
                  {"Auction"}
                  <ArrowDownIcon
                    color={
                      filterIconColumn == "auction" ? "#cecece" : "#2a2a2a"
                    }
                  />
                </Th>
                <Th
                  color={"#cecece"}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  textTransform={"capitalize"}
                  onClick={() => sortHistory("item", false)}
                  cursor={"pointer"}
                >
                  {"Container"}
                  <ArrowDownIcon
                    color={filterIconColumn == "item" ? "#cecece" : "#2a2a2a"}
                  />
                </Th>
                <Th
                  color={"#cecece"}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  textTransform={"capitalize"}
                  onClick={() => sortHistory("winner", false)}
                  cursor={"pointer"}
                >
                  {"Winner"}
                  <ArrowDownIcon
                    color={filterIconColumn == "winner" ? "#cecece" : "#2a2a2a"}
                  />
                </Th>
                <Th
                  textAlign={"end"}
                  paddingRight={5}
                  color={"#cecece"}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  textTransform={"capitalize"}
                  onClick={() => sortHistory("points", true)}
                  cursor={"pointer"}
                >
                  {"Points"}
                  <ArrowDownIcon
                    color={filterIconColumn == "points" ? "#cecece" : "#2a2a2a"}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedHistory.map((item, i) => (
                <Tr key={i} bg={"#3d3d3d"}>
                  <Td color={"#cecece"} fontSize={"md"} paddingLeft={8}>
                    {item.auction}
                  </Td>
                  <Td color={"#cecece"} fontSize={"md"} paddingLeft={6}>
                    {item.item}
                  </Td>
                  <Td
                    color={"#cecece"}
                    fontSize={"md"}
                    textTransform={"capitalize"}
                    paddingLeft={6}
                  >
                    {item.winner}
                  </Td>
                  <Td
                    textAlign={"end"}
                    paddingRight={5}
                    color={"#cecece"}
                    fontSize={"md"}
                  >
                    {item.points}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

export default HistoryCard;
