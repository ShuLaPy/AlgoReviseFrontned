import { createRoot } from "react-dom/client";
import { MantineProvider } from '@mantine/core';
import App from "./App.jsx";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
