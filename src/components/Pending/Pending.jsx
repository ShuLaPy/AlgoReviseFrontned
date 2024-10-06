// pages/DueToday.jsx
import { Box } from "@mantine/core";
import React from "react";
import { TableScrollArea } from "../table/TableScrollArea";

const Pending = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box style={{ textAlign: "center" }}>
        <h1>Pending Questions</h1>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "50px",
        }}
      >
        <TableScrollArea status="pending" />
      </Box>
    </Box>
  );
};

export default Pending;
