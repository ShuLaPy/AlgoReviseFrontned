import { Box } from "@mantine/core";
import "./App.css";

import AuthProvider from "./utils/AuthProvider";
import Routes from "./routes";

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
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Box>
  );
}

export default App;
