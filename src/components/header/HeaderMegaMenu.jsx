import {
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Divider,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "./HeaderMegaMenu.module.css";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/">
            <MantineLogo size={30} />
          </Link>

          <Group visibleFrom="sm">
            <Link to="/due-today">
              <Button variant="default">Due Today</Button>
            </Link>
            <Link to="/pending">
              <Button>Pending Questions</Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Questions"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              gap: "10px",
            }}
          >
            <Link to="/due-today">
              <Button variant="default">Due Today</Button>
            </Link>
            <Link to="/pending">
              <Button>Pending Questions</Button>
            </Link>
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
