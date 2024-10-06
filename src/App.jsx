import { Box } from "@mantine/core";
import "./App.css";
import { HeaderMegaMenu } from "./components/header/HeaderMegaMenu";
import { TableScrollArea } from "./components/table/TableScrollArea";
import { useState } from "react";
import { FloatingButtonForm } from "./components/FloatingForm/FloatingButtonForm";

function App() {
  const [records, setRecords] = useState([]);

  const handleRecordAdded = (newRecord) => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

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
      <TableScrollArea records={records} />
      <FloatingButtonForm onRecordAdded={handleRecordAdded} />
    </Box>
  );
}

export default App;
