// FloatingButtonForm.jsx
import { useState } from "react";
import {
  Anchor,
  Badge,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import axios from "axios";
import { IconExternalLink } from "@tabler/icons-react";

export function DetailCard({ card }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (grade) => {
    setLoading(true);
    try {
      const payload = {
        grade,
      };

      const response = await axios.patch(
        `http://localhost:3000//card/review/${card.id}`,
        payload
      );

      // onRecordAdded(response.data); // Call parent function to add new record
      setModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Divider my="md" />
      <Anchor href={card.question_link} target="_blank">
        <Button fullWidth rightSection={<IconExternalLink size={15} />}>
          Solve
        </Button>
      </Anchor>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Total Reviews</Text>
        <Badge color="pink">{card.review_count}</Badge>
      </Group>
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
