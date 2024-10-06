import cx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Table,
  ScrollArea,
  Box,
  Anchor,
  Pill,
  Group,
  Badge,
} from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import axios from "axios";

const initialData = []; // Start with an empty array for data
const limit = 25; // Number of items per page
let currentPage = 1; // Start at page 1

export function TableScrollArea({ records }) {
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const viewport = useRef(null);

  const fetchData = async (page) => {
    if (loading || !hasMore) return; // Prevent multiple requests

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/card?limit=${limit}&page=${page}`
      );
      const newData = response.data.results; // Assuming the results come here

      setData((prevData) => [...prevData, ...newData]);

      if (response.data.totalPages !== currentPage) {
        currentPage += 1; // Increment the page for next fetch
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if we're near the bottom of the scroll area
    setScrolled(true);
    if (viewport.current) {
      const { scrollHeight, clientHeight, scrollTop } = viewport.current;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        fetchData(currentPage);
      }
    }
  }, [scrollPosition]);

  const rows = data.map((row, index) => (
    <Table.Tr key={index + 1}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{row.question}</Table.Td>
      <Table.Td>
        <Anchor href={row.question_link} target="_blank">
          {row.platform}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Badge
          color={
            row.difficulty === "easy"
              ? "green"
              : row.difficulty === "medium"
              ? "yellow"
              : "red"
          }
        >
          {row.difficulty}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge
          color={
            row.grade === "easy"
              ? "green"
              : row.grade === "good"
              ? "yellow"
              : row.grade === "hard"
              ? "orange"
              : "red"
          }
        >
          {row.grade}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Pill.Group>
          {row.tags.map((tag, index) => (
            <Pill key={index}>{tag}</Pill>
          ))}
        </Pill.Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box style={{ padding: "20px 0", flex: 1, overflow: "hidden" }}>
      <ScrollArea
        style={{ height: "calc(100vh - 60px - 40px)", overflow: "auto" }}
        onScrollPositionChange={onScrollPositionChange}
        viewportRef={viewport}
        // onScroll={handleScroll}
        // ref={scrollAreaRef}
      >
        <Box
          style={{
            paddingBottom: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Table miw={700}>
            <Table.Thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <Table.Tr>
                <Table.Th>No.</Table.Th>
                <Table.Th>Question</Table.Th>
                <Table.Th>Platform</Table.Th>
                <Table.Th>Difficulty</Table.Th>
                <Table.Th>Grade</Table.Th>
                <Table.Th>Tags</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
      </ScrollArea>
    </Box>
  );
}
