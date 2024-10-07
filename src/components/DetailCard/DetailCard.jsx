// FloatingButtonForm.jsx
import { useEffect, useRef, useState } from "react";
import {
  Anchor,
  Badge,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { AreaChart } from "@mantine/charts";
import axios from "axios";
import {
  IconExternalLink,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";

const grade_enum = {
  hard: 1,
  again: 2,
  good: 3,
  easy: 4,
};

export function DetailCard({ card, closeModal }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null); // Store the reference to the start time
  const lastElapsedTimeRef = useRef(0);
  const [progress, setProgress] = useState([]);

  const interval = useInterval(() => {
    if (timerStarted) {
      const now = Date.now(); // Get current time
      const timeDiff = now - startTimeRef.current; // Difference since the stopwatch started
      setElapsedTime(lastElapsedTimeRef.current + timeDiff); // Add this difference to the previously elapsed time
    }
  }, 10);

  // Start or pause the stopwatch
  const toggle = () => {
    if (isRunning) {
      interval.stop(); // Stop updating the time
      lastElapsedTimeRef.current = elapsedTime; // Store the current elapsed time before pausing
    } else {
      startTimeRef.current = Date.now(); // Set the current time as the start time
      interval.start(); // Start updating the time
    }
    setIsRunning(!isRunning);
  };

  const handleSubmit = async (grade) => {
    setLoading(true);
    interval.stop();
    const last_time_taken = Math.ceil(elapsedTime / 1000 / 60);
    try {
      const payload = {
        grade,
        last_time_taken,
      };

      console.log("Payload: ", payload);

      const response = await axios.patch(
        `http://localhost:3000/card/review/${card.id}`,
        payload
      );

      // onRecordAdded(response.data); // Call parent function to add new record
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
      3,
      "0"
    )}`;
  };

  // Method to start and stop timer
  const startTimer = () => {
    startTimeRef.current = Date.now();
    setTimerStarted(true);
    setIsRunning(true);
    interval.start();
  };

  const getProgress = async () => {
    let { data } = await axios.get(
      `http://localhost:3000/history/progress/${card.id}`
    );

    data = data.map((data) => {
      data.grade = grade_enum[data.grade];
      return data;
    });

    setProgress(data);
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Group justify="space-between">
        <div>
          <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
            {formatTime(elapsedTime)}
          </Text>
          {/* <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
            {formatTime(time)}
            </Text> */}
        </div>

        {timerStarted && (
          <Button radius="xl" color="pink.6" onClick={toggle}>
            {interval.active ? (
              <IconPlayerPause size={15} />
            ) : (
              <IconPlayerPlay size={15} />
            )}
          </Button>
        )}
      </Group>
      <Divider my="md" />
      <Anchor href={card.question_link} target="_blank">
        <Button
          fullWidth
          rightSection={<IconExternalLink size={15} />}
          onClick={startTimer}
        >
          Solve
        </Button>
      </Anchor>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Total Reviews</Text>
        <Badge color="pink">{card.review_count}</Badge>
      </Group>
      <AreaChart
        h={200}
        data={progress}
        dataKey="date"
        series={[
          { name: "time_taken", color: "teal.6" },
          { name: "grade", color: "red.6" },
        ]}
        curveType="natural"
        withXAxis={false}
        withYAxis={false}
      />
      <Divider my="md" />
      <Group flex="true" justify="space-around" mt="md">
        <Button
          variant="filled"
          color="green"
          onClick={() => handleSubmit("easy")}
        >
          Easy
        </Button>
        <Button
          variant="filled"
          color="yellow"
          onClick={() => handleSubmit("good")}
        >
          Good
        </Button>
        <Button
          variant="filled"
          color="orange"
          onClick={() => handleSubmit("hard")}
        >
          Hard
        </Button>
        <Button
          variant="filled"
          color="red"
          onClick={() => handleSubmit("again")}
        >
          Again
        </Button>
      </Group>
    </>
  );
}
