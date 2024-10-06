// pages/DueToday.jsx
import { Box } from "@mantine/core";
import React from "react";
import { TableScrollArea } from "../table/TableScrollArea";
import { FloatingButtonForm } from "../FloatingForm/FloatingButtonForm";

const AllQuestions = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box style={{ textAlign: "center" }}>
        <h1>All Questions</h1>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "50px",
        }}
      >
        <TableScrollArea />
      </Box>
      <FloatingButtonForm />
    </Box>
  );
};

export default AllQuestions;
