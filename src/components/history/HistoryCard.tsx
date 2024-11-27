import { Box, Card, Table } from "@chakra-ui/react";

const tempDataAuctions = [
  { auction: 1, item: "test", winner: "testCategory", points: 500 },
];
function HistoryCard() {
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
                    color={"#cecece"}
                    fontWeight="bold"
                    fontSize={"lg"}
                  >
                    {"Auction"}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={"#cecece"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                  >
                    {"Item(s)"}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={"#cecece"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                  >
                    {"Winner"}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    textAlign={"end"}
                    color={"#cecece"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                  >
                    {"Points"}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tempDataAuctions.map((item, i) => (
                  <Table.Row key={i} bg={"#3d3d3d"}>
                    <Table.Cell color={"#cecece"} fontSize={"md"}>
                      {item.auction}
                    </Table.Cell>
                    <Table.Cell color={"#cecece"} fontSize={"md"}>
                      {item.item}
                    </Table.Cell>
                    <Table.Cell color={"#cecece"} fontSize={"md"}>
                      {item.winner}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"end"}
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
