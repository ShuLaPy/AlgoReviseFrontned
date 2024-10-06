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
import classes from "./HeaderMegaMenu.module.css";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />

          <Group visibleFrom="sm">
            <Button variant="default">Due Today</Button>
            <Button>Pending Questions</Button>
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
            <Button variant="default">Due Today</Button>
            <Button>Pending Questions</Button>
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
