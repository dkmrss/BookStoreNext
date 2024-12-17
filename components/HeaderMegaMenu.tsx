"use client";
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useFullscreen, useOs } from "@mantine/hooks";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
  IconBook,
  IconChartPie3,
  IconCode,
  IconCoin,
  IconDashboard,
  IconFileText,
  IconFingerprint,
  IconHome,
  IconMoonStars,
  IconNotification,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./HeaderMegaMenu.module.css";
const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const os = useOs();
  const router = useRouter();
  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => router.push("/home", { scroll: false }),
      leftSection: (
        <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
      ),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Get full information about current system status",
      onClick: () => router.push("/home/index"),
      leftSection: (
        <IconDashboard
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
    {
      id: "documentation",
      label: "Documentation",
      description: "Visit documentation to lean more about all features",
      onClick: () => router.push("/about"),
      leftSection: (
        <IconFileText
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
  ];

  const links = mockdata?.map((item) => (
    <UnstyledButton key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} />
        </ThemeIcon>
        <div>
          <Text size="sm">{item.title}</Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  const { toggle, fullscreen } = useFullscreen();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Box pb={120}>
      <header>
        <div>
          <p>
            Your os is <b>{os}</b>
          </p>
        </div>
        <Group align="center">
          {/* <ButtonToggle /> */}
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>

          <Link href="/home" className={classes.link}>
            Home
          </Link>
          <Link href="/about" className={classes.link}>
            about
          </Link>
          <Link href="/home/index" className={classes.link}>
            index
          </Link>
          <Link href="/ip" className={classes.link}>
            ip
          </Link>
          <Link href="/home/staticpages" className={classes.link}>
            staticpages
          </Link>
          <Link href="/login" className={classes.link}>
            Login
          </Link>
          <Group align="center">
            <Button onClick={spotlight.open}>Open spotlight </Button>
          </Group>
          <Spotlight
            actions={actions}
            nothingFound="Nothing found..."
            highlightQuery
            searchProps={{
              leftSection: (
                <IconSearch
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              ),
              placeholder: "Search...",
            }}
          />
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </header>

      {/* <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        zIndex={1000000}
        className={classes.hiddenDesktop}
      ></Drawer> */}
    </Box>
  );
}

//https://onursimsek94.github.io/react-big-calendar/examples/index.html
