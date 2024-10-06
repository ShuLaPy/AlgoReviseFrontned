import { Box } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderMegaMenu } from "./components/header/HeaderMegaMenu";
import { TableScrollArea } from "./components/table/TableScrollArea";
import { useState } from "react";
import { FloatingButtonForm } from "./components/FloatingForm/FloatingButtonForm";
import DueToday from "./components/DueToday/DueToday";
import AllQuestions from "./components/AllQuestions/AllQuestions";
import Pending from "./components/Pending/Pending";

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
      <Router>
        <HeaderMegaMenu />
        <Routes>
          <Route path="/" element={<AllQuestions />} />
          <Route path="/due-today" element={<DueToday />} />
          <Route path="/pending" element={<Pending />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
