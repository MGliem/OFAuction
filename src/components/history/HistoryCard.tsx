import { AuctionHistory } from "@/types";
import { Box, Card, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function HistoryCard({ auctionHistory }: { auctionHistory: AuctionHistory[] }) {
  const [sortedHistory, setSortedHistory] =
    useState<AuctionHistory[]>(auctionHistory);

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

    setSortedHistory(newSortedHistory);
  };

  return (
    <Card.Root
      width={"80%"}
      marginInline={"auto"}
      marginBlock={20}
      backgroundColor={"#181818"}
      border={"2px solid #cecece"}
      boxShadow={"3px 2px 10px -1px #000000"}
    >
      <Card.Body>
        <Card.Title color={"#cecece"} fontSize={"xl"}>
          {"History"}
        </Card.Title>
        <Box>
          <Table.ScrollArea
            marginTop={10}
            borderWidth={"1px"}
            rounded={"md"}
            height={"280px"}
            boxShadow={"3px 2px 10px -1px #000000"}
          >
            <Table.Root size={"sm"} stickyHeader>
              <Table.Header>
                <Table.Row bg={"#2a2a2a"}>
                  <Table.ColumnHeader
                    paddingLeft={5}
                    color={"#cecece"}
                    fontWeight="bold"
                    fontSize={"lg"}
                    onClick={() => sortHistory("auction", true)}
                    cursor={"pointer"}
                  >
                    {"Auction"}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={"#cecece"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                    onClick={() => sortHistory("item", false)}
                    cursor={"pointer"}
                  >
                    {"Item(s)"}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={"#cecece"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                    onClick={() => sortHistory("winner", false)}
                    cursor={"pointer"}
                  >
                    {"Winner"}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    textAlign={"end"}
                    paddingRight={5}
                    color={"#cecece"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                    onClick={() => sortHistory("points", true)}
                    cursor={"pointer"}
                  >
                    {"Points"}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sortedHistory.map((item, i) => (
                  <Table.Row key={i} bg={"#3d3d3d"}>
                    <Table.Cell
                      color={"#cecece"}
                      fontSize={"md"}
                      paddingLeft={5}
                    >
                      {item.auction}
                    </Table.Cell>
                    <Table.Cell color={"#cecece"} fontSize={"md"}>
                      {item.item}
                    </Table.Cell>
                    <Table.Cell
                      color={"#cecece"}
                      fontSize={"md"}
                      textTransform={"capitalize"}
                    >
                      {item.winner}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"end"}
                      paddingRight={5}
                      color={"#cecece"}
                      fontSize={"md"}
                    >
                      {item.points}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}

export default HistoryCard;
