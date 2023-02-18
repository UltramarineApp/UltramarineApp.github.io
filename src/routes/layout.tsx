import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Box,
  Image,
  Modal,
  LoadingOverlay,
  Input,
  Divider,
  Grid,
  ColorInput,
  Button,
  DEFAULT_THEME,
} from "@mantine/core";
import {
  IconPictureInPicture,
  IconPaint,
  IconRefresh,
  IconPlayCard,
  IconGoGame,
  IconDeviceGamepad,
  IconDeviceGamepad2,
  IconPlayerPause,
  IconPlus,
} from "@tabler/icons-react";

import logo from "../images/logo.png";

const randomColor = () =>
  `${Math.floor(Math.random() * 16777215).toString(16)}`;

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

import { ItemPreview } from "../components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import factoryABI from "../../abi/factory.json";
import { ethers } from "ethers";

const customLoader = (
  <svg
    width="54"
    height="54"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke={DEFAULT_THEME.colors.green[6]}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="2">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);

export default function Layout() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [game, setGame] = useState({
    name: "Football versus",
    background1: "5d2e1a",
    emoji1: "🏈",
    background2: "1a435d",
    emoji2: "⚽️",
  });

  const { classes, cx } = useStyles();

  const { isConnected } = useAccount();

  const contractConfig: any = {
    address: "0x36c4E4f98D82944515D87b0aad0CD263588039d8",
    abi: factoryABI,
  };

  const { config }: any = usePrepareContractWrite({
    ...contractConfig,
    functionName: "createGame",
    args: [
      game.name,
      [
        [game.background1, game.emoji1],
        [game.background2, game.emoji2],
      ],
    ],
  });
  const {
    data: createGame,
    isLoading: isLoadingCreateGame,
    write,
  } = useContractWrite(config);
  const {
    data: res,
    isError,
    isLoading,
  } = useWaitForTransaction({ hash: createGame?.hash });

  useEffect(() => {
    if (!isLoading && res) {
      const address = ethers.utils.defaultAbiCoder.decode(
        ["address"],
        res?.logs?.[0]?.topics?.[2]
      )[0];
      setOpened(false);
      navigate(`/games/${address}`);
    }
  }, [isLoading]);

  return (
    <Container>
      <Header
        height={60}
        style={{
          border: 0,
          borderRadius: "10px",
          marginTop: "5px",
          marginBottom: "15px",
        }}
      >
        <Container className={classes.inner}>
          <Link to={`/`}>
            <Image src={logo} style={{ width: "50px" }}></Image>
          </Link>
          <Group spacing={5}>
            <Link to={`/games`}>
              <Button
                leftIcon={<IconDeviceGamepad />}
                color="gray"
                variant="light"
                size="sm"
              >
                Games
              </Button>
            </Link>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Create New Game"
              size="lg"
              centered
            >
              <LoadingOverlay
                visible={isLoading || isLoadingCreateGame}
                loader={customLoader}
                style={{ borderRadius: 5 }}
              />
              <Input
                value={game.name}
                onChange={(e) => {
                  setGame({ ...game, name: e.currentTarget.value });
                }}
              ></Input>
              <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={
                  <>
                    <IconPictureInPicture size={12} />
                    <Box ml={5}>Preview</Box>
                  </>
                }
              />
              <ItemPreview game={game} />
              <Grid>
                <Grid.Col span={6}>
                  <Grid>
                    <Grid.Col span={3}>
                      <Input
                        variant="unstyled"
                        size="sm"
                        value={game.emoji1}
                        onChange={(e) => {
                          setGame({ ...game, emoji1: e.currentTarget.value });
                        }}
                      ></Input>
                    </Grid.Col>
                    <Grid.Col span={9}>
                      <ColorInput
                        size="sm"
                        variant="unstyled"
                        value={`#${game.background1}`}
                        icon={<IconPaint size={16} />}
                        placeholder="Button 1"
                        onChange={(v) => {
                          setGame({ ...game, background1: v.replace("#", "") });
                        }}
                        rightSection={
                          <ActionIcon
                            onClick={() => {
                              setGame({ ...game, background1: randomColor() });
                            }}
                          >
                            <IconRefresh size={16} />
                          </ActionIcon>
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Grid>
                    <Grid.Col span={3}>
                      <Input
                        size="sm"
                        variant="unstyled"
                        value={game.emoji2}
                        onChange={(e) => {
                          setGame({ ...game, emoji2: e.currentTarget.value });
                        }}
                      ></Input>
                    </Grid.Col>
                    <Grid.Col span={9}>
                      <ColorInput
                        size="sm"
                        variant="unstyled"
                        value={`#${game.background2}`}
                        icon={<IconPaint size={16} />}
                        placeholder="Button 2"
                        onChange={(v) => {
                          setGame({ ...game, background2: v.replace("#", "") });
                        }}
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button
                    variant="light"
                    color="green"
                    fullWidth
                    size="sm"
                    disabled={!write}
                    onClick={() => write?.()}
                    leftIcon={<IconPlayCard />}
                  >
                    Create Game
                  </Button>
                </Grid.Col>
              </Grid>
            </Modal>
            <Button
              onClick={() => setOpened(true)}
              leftIcon={<IconPlus />}
              color="gray"
              variant="light"
              size="sm"
            >
              Create Game
            </Button>
          </Group>

          <ConnectButton />
        </Container>
      </Header>
      <Outlet />
    </Container>
  );
}
