import {
  Container,
  Text,
  Button,
  Center,
  Modal,
  Input,
  HueSlider,
  ColorPicker,
  SimpleGrid,
  ColorInput,
  Box,
  Grid,
  Divider,
  Group,
  ActionIcon,
  LoadingOverlay,
  DEFAULT_THEME,
} from "@mantine/core";
import {
  IconDice,
  IconPaint,
  IconPictureInPicture,
  IconPlayCard,
  IconRefresh,
} from "@tabler/icons-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import {
  paginatedIndexesConfig,
  useAccount,
  useContractInfiniteReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import factoryABI from "../../abi/factory.json";

import { Item, Items, ItemPreview } from "../components";

const randomColor = () =>
  `${Math.floor(Math.random() * 16777215).toString(16)}`;

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

export default function Games() {
  const { address } = useAccount();

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [game, setGame] = useState({
    name: "Football versus",
    background1: "5d2e1a",
    emoji1: "🏈",
    background2: "1a435d",
    emoji2: "⚽️",
  });

  const contractConfig: any = {
    address: "0x0880fC62Ea5203Bb0Fc738214E97Fce0C97d386F",
    abi: factoryABI,
  };

  const { data } = useContractInfiniteReads({
    cacheKey: "games",
    ...paginatedIndexesConfig(
      (index: number): any => {
        return [
          {
            ...contractConfig,
            functionName: "getGame",
            args: [ethers.BigNumber.from(index), address] as const,
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
    cacheTime: 2_000,
  });

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
      navigate(`/games/${address}`);
    }
  }, [isLoading]);

  return (
    <Container>
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
                  size="xl"
                  value={game.emoji1}
                  onChange={(e) => {
                    setGame({ ...game, emoji1: e.currentTarget.value });
                  }}
                ></Input>
              </Grid.Col>
              <Grid.Col span={9}>
                <ColorInput
                  size="xl"
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
                  size="xl"
                  variant="unstyled"
                  value={game.emoji2}
                  onChange={(e) => {
                    setGame({ ...game, emoji2: e.currentTarget.value });
                  }}
                ></Input>
              </Grid.Col>
              <Grid.Col span={9}>
                <ColorInput
                  size="xl"
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
              size="xl"
              disabled={!write}
              onClick={() => write?.()}
              leftIcon={<IconPlayCard />}
            >
              Create Game
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
      <Center m={20}>
        <Button
          onClick={() => setOpened(true)}
          leftIcon={<IconPlayCard />}
          size="xl"
          color="orange"
          variant="light"
        >
          Create Game
        </Button>
      </Center>
      <Items games={data} />
    </Container>
  );
}
