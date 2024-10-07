import cx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Table,
  ScrollArea,
  Box,
  Anchor,
  Pill,
  Badge,
  ActionIcon,
} from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import axios from "axios";
import { IconPlayerPlayFilled, IconEdit } from "@tabler/icons-react";
import ModalWrapper from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import { DeckCardForm } from "../DeckCardForm/DeckCardForm";
import { DetailCard } from "../DetailCard/DetailCard";
import { VITE_API_URL } from "../../utils/config";

const initialData = []; // Start with an empty array for data
const limit = 25; // Number of items per page
let currentPage = 1; // Start at page 1

export function TableScrollArea({ status }) {
  const [opened, { open, close }] = useDisclosure(false);

  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(currentPage);
  const [card, setCard] = useState(null);

  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const viewport = useRef(null);

  const handleEdit = (row) => {
    setCard(row);
    open();
  };

  let baseurl = `${VITE_API_URL}/card`;
  if (status === "due") {
    baseurl = `${VITE_API_URL}/card/duetoday`;
  } else if (status === "pending") {
    baseurl = `${VITE_API_URL}/card/pending`;
  }

  const fetchData = async (page) => {
    if (loading || !hasMore) return; // Prevent multiple requests

    setLoading(true);
    try {
      const response = await axios.get(
        `${baseurl}?limit=${limit}&page=${page}`
      );
      const newData = response.data.results; // Assuming the results come here

      setData((prevData) => [...prevData, ...newData]);
      if (response.data.totalPages !== page) {
        setPage(page + 1);
        // currentPage += 1; // Increment the page for next fetch
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
        setTimeout(() => {
          fetchData(page);
        }, 50);
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
      <Table.Td>
        <ActionIcon
          variant="filled"
          aria-label="Settings"
          onClick={() => handleEdit(row)}
        >
          {" "}
          {status == "due" || status == "pending" ? (
            <IconPlayerPlayFilled
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          ) : (
            <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
          )}
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Fragment>
      <ScrollArea
        style={{ height: "100%", overflowY: "auto" }}
        onScrollPositionChange={onScrollPositionChange}
        viewportRef={viewport}
        // onScroll={handleScroll}
        // ref={scrollAreaRef}
      >
        <Box
          style={{
            padding: "20px",
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
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
      </ScrollArea>
      {card && (
        <ModalWrapper
          opened={opened}
          close={close}
          title={card.question}
          component={
            status == "due" || status == "pending" ? (
              <DetailCard card={card} closeModal={close} />
            ) : (
              <DeckCardForm card={card} closeModal={close} />
            )
          }
        />
      )}
    </Fragment>
  );
}
