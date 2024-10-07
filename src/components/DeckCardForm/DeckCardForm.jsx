// FloatingButtonForm.jsx
import { useState } from "react";
import {
  Button,
  TextInput,
  Checkbox,
  Select,
  Textarea,
  Group,
  LoadingOverlay,
  MultiSelect,
} from "@mantine/core";
import axios from "axios";
import { useForm } from "@mantine/form";

const tagsOptions = [
  { value: "Binary Tree", label: "Binary Tree" },
  { value: "Linked List", label: "Linked List" },
  { value: "Graph", label: "Graph" },
  // Add more options as needed
];

export function DeckCardForm({ card, closeModal }) {
  const [loading, setLoading] = useState(false);

  let form = useForm({
    initialValues: card
      ? {
          question: card.question,
          question_link: card.question_link,
          platform: card.platform,
          tags: card.tags, // Multi-select for tags
          resources: card.resources.join(","), // Multi-select for resources
          revision: card.revision,
          difficulty: card.difficulty, // Default value
          grade: card.grade, // Default value
          note: card.note,
        }
      : {
          question: "",
          question_link: "",
          platform: "",
          tags: [], // Multi-select for tags
          resources: [], // Multi-select for resources
          revision: false,
          difficulty: "easy", // Default value
          grade: "easy", // Default value
          note: "",
        },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Ensure resources are split into an array if comma-separated input is used
      const resourcesArray = values.resources
        .split(",")
        .map((link) => link.trim())
        .filter(Boolean);

      const payload = {
        ...values,
        resources: resourcesArray, // Send resources as an array
      };

      console.log("Payload: ", payload);
      let response;
      if (card) {
        response = await axios.patch(
          `http://localhost:3000/card/${card.id}`,
          payload
        );
      } else {
        response = await axios.post("http://localhost:3000/card", payload);
      }
      // onRecordAdded(response.data); // Call parent function to add new record
      closeModal() // Close the modal
      form.reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={loading} />

      <TextInput
        label="Question"
        {...form.getInputProps("question")}
        required
      />

      <TextInput
        label="Question Link"
        {...form.getInputProps("question_link")}
        required
      />

      <TextInput
        label="Platform"
        {...form.getInputProps("platform")}
        required
      />

      <MultiSelect
        label="Tags"
        placeholder="Select tags"
        data={tagsOptions}
        {...form.getInputProps("tags")}
        hidePickedOptions
        searchable
        clearable
        maxDropdownHeight={200}
      />

      <TextInput
        label="Resources (comma separated)"
        {...form.getInputProps("resources")}
        placeholder="e.g. https://example.com, https://another.com"
      />

      <Checkbox
        label="Revision"
        {...form.getInputProps("revision", { type: "checkbox" })}
      />

      <Select
        label="Difficulty"
        {...form.getInputProps("difficulty")}
        data={[
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
        ]}
        required
      />

      <Select
        label="Grade"
        {...form.getInputProps("grade")}
        data={[
          { value: "easy", label: "Easy" },
          { value: "good", label: "Good" },
          { value: "hard", label: "Hard" },
          { value: "again", label: "Again" },
        ]}
        required
      />

      <Textarea
        label="Notes"
        {...form.getInputProps("note")}
        placeholder="Add any notes here..."
      />

      <Group position="right" mt="md">
        <Button variant="outline" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
