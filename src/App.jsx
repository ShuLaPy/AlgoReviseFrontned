import { Box } from "@mantine/core";
import "./App.css";
import { HeaderMegaMenu } from "./components/header/HeaderMegaMenu";
import { TableScrollArea } from "./components/table/TableScrollArea";

function App() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <HeaderMegaMenu />
      <TableScrollArea />
    </Box>
  );
}

export default App;
