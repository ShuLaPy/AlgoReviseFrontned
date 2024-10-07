// FloatingButtonForm.jsx
import { useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  Checkbox,
  Select,
  Textarea,
  ActionIcon,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { VITE_API_URL } from "../../utils/config";

const tagsOptions = [
  { value: "Binary Tree", label: "Binary Tree" },
  { value: "Linked List", label: "Linked List" },
  { value: "Graph", label: "Graph" },
  // Add more options as needed
];

export function FloatingButtonForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      question: "",
      question_link: "",
      platform: "",
      tags: [], // Multi-select for tags
      resources: "", // Multi-select for resources
      revision: false,
      difficulty: "easy", // Default value
      grade: "easy", // Default value
      note: "",
      last_time_taken: 0,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Ensure resources are split into an array if comma-separated input is used
      console.log(values.resources);
      const resourcesArray = values.resources
        .split(",")
        .map((link) => link.trim())
        .filter(Boolean);

      const payload = {
        ...values,
        resources: resourcesArray, // Send resources as an array
      };

      console.log("Payload: ", payload);

      const response = await axios.post(`${VITE_API_URL}/card`, payload);
      // onRecordAdded(response.data); // Call parent function to add new record
      setModalOpen(false); // Close the modal
      form.reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActionIcon
        size="xl"
        onClick={() => setModalOpen(true)}
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <IconPlus />
      </ActionIcon>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Record"
        size="lg"
      >
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

          <NumberInput
            label="Time Taken"
            {...form.getInputProps("last_time_taken")}
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
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
