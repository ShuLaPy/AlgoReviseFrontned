// pages/DueToday.jsx
import { Box } from "@mantine/core";
import React from "react";
import { TableScrollArea } from "../table/TableScrollArea";

const DueToday = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box style={{ textAlign: "center" }}>
        <h1>Due Today</h1>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "50px",
        }}
      >
        <TableScrollArea status="due" />
      </Box>
    </Box>
  );
};

export default DueToday;
