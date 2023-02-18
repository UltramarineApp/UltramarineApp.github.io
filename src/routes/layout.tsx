import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Center,
  SegmentedControl,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconExternalLink,
  IconCode,
  IconEye,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

import { Account } from "../components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Layout() {
  const navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const { isConnected } = useAccount();

  return (
    <Container>
      <Header height={60} style={{ border: 0 }}>
        <Container className={classes.inner}>
          <Group spacing={5}>
            <SegmentedControl
              data={[
                {
                  value: "index",
                  label: (
                    <Center>
                      <IconEye size={16} />
                      <Box ml={10}>Index</Box>
                    </Center>
                  ),
                },
                {
                  value: "games",
                  label: (
                    <Center>
                      <IconCode size={16} />
                      <Box ml={10}>Games</Box>
                    </Center>
                  ),
                },
              ]}
              onChange={(v) => {
                if (v === "index") {
                  navigate(`/`);
                } else if (v === "games") {
                  navigate(`/games`);
                }
              }}
            />
          </Group>

          <ConnectButton />
        </Container>
      </Header>
      <Outlet />
    </Container>
  );
}
