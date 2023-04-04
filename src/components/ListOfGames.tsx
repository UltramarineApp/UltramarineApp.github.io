import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
  Center,
  Box,
  Slider,
  Input,
  Notification,
  Space,
  Tooltip,
  LoadingOverlay,
  DEFAULT_THEME,
  Modal,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAddressBook,
  IconAlertCircle,
  IconCheck,
  IconCircle,
  IconCurrencyEthereum,
  IconDice,
  IconPlus,
  IconSeeding,
  IconSettings,
  IconWallet,
  IconX,
} from "@tabler/icons-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const vs: any = {
  position: "absolute",
  fontSize: "50px",
  top: "65px",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  fontWeight: "bold",
  background: "-webkit-linear-gradient(top, #00ffb9, #2727aa)",
  color: "transparent",
  WebkitBackgroundClip: "text",
  WebkitTextStroke: "2px transparent",
  width: "70px",
  zIndex: "1",
  opacity: ".5",
};

const bal: any = {
  position: "absolute",
  fontSize: "10px",
  top: "2px",
  left: "0px",
  marginLeft: "auto",
  marginRight: "auto",
  background: "",
  zIndex: "1",
};

const liq: any = {
  position: "absolute",
  fontSize: "10px",
  top: "2px",
  right: "0px",
  marginLeft: "auto",
  marginRight: "auto",
  background: "",
  zIndex: "1",
};

import { ultramarineABI } from "../../abi";

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

export function ItemMain({
  game,
  gameAddress,
}: {
  game: any;
  gameAddress: any;
}) {
  const navigate = useNavigate();

  const [btn1, setBtn1] = useState("1");
  const [btn2, setBtn2] = useState("1");

  const contractConfig: any = {
    address: gameAddress,
    abi: ultramarineABI,
  };

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useNetwork();

  let [
    game_,
    name_,
    owner_,
    balance_,
    liquidity_,
    numberOfGames_,
    background1_,
    emoji1_,
    background2_,
    emoji2_,
  ] = game;

  const [liquidity, setLiquidity] = useState(0.0);
  const [amount, setAmount] = useState(0.0);
  const [move, setMove] = useState("");
  const [min, setMin] = useState(0.0);
  const [max, setMax] = useState(0.0);

  useEffect(() => {
    if (liquidity_.gte(ethers.utils.parseEther("0.001"))) {
      const l = parseFloat(
        parseFloat(ethers.utils.formatEther(liquidity_)).toFixed(5)
      );
      setLiquidity(l);
      setAmount(l / 10 / 2);
      setMin(l / 100);
      setMax(l / 10);
    }
  }, [liquidity_]);

  const [l, setL] = useState(balance?.formatted);

  const { config }: any = usePrepareContractWrite({
    ...contractConfig,
    functionName: "addLiquidity",
    overrides: {
      value: ethers.utils.parseEther(l || "0"),
    },
  });
  const {
    data: addLiquidity,
    isLoading: isLoadingAddLiquidity,
    write,
  } = useContractWrite(config);
  const {
    data: res,
    isError,
    isLoading,
  } = useWaitForTransaction({ hash: addLiquidity?.hash });

  useEffect(() => {
    if (!isLoading && res && l) {
      window.location.reload();
    }
  }, [isLoading]);

  const { config: configPlay }: any = usePrepareContractWrite({
    ...contractConfig,
    functionName: "play",
    args: [ethers.utils.parseEther(amount.toFixed(5) || "0"), move],
    overrides: {
      value: ethers.utils.parseEther(amount.toFixed(5) || "0"),
    },
  });
  const {
    data: play,
    isLoading: isLoadingPlay,
    write: writePlay,
  } = useContractWrite(configPlay);
  const {
    data: dataPlay,
    isError: isErrorPlay,
    isLoading: isLoading2Play,
  } = useWaitForTransaction({ hash: play?.hash });

  useEffect(() => {
    if (!isLoading2Play && dataPlay) {
      const id = ethers.utils.defaultAbiCoder.decode(
        ["uint256"],
        chain?.id && chain?.id === 314_1
          ? dataPlay?.logs?.[1]?.topics?.[2]
          : dataPlay?.logs?.[1]?.topics?.[3]
      )[0];
      navigate(`/games/${gameAddress}/${id}`);
      window.location.reload();
    }
  }, [isLoading2Play]);

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [pushChecked, setPushChecked] = useState(false);
  const [pushValue, setPushValue] = useState("");
  const [chainlinkChecked, setChainlinkChecked] = useState(false);
  const [chainlinkValue, setChainlinkValue] = useState("");

  const { config: configSetChannel }: any = usePrepareContractWrite({
    ...contractConfig,
    functionName: "setChannel",
    args: [pushValue],
  });
  const {
    data: setChannel,
    isLoading: isLoadingSetChannel,
    write: writeSetChannel,
  } = useContractWrite(configSetChannel);
  const {
    data: dataSetChannel,
    isError: isErrorSetChannel,
    isLoading: isLoading2SetChannel,
  } = useWaitForTransaction({ hash: setChannel?.hash });

  const { config: configSetSubscriptionId }: any = usePrepareContractWrite({
    ...contractConfig,
    functionName: "setSubscriptionId",
    args: [chainlinkValue],
  });
  const {
    data: setSubscriptionId,
    isLoading: isLoadingSetSubscriptionId,
    write: writeSetSubscriptionId,
  } = useContractWrite(configSetSubscriptionId);
  const {
    data: dataSetSubscriptionId,
    isError: isErrorSetSubscriptionId,
    isLoading: isLoading2SetSubscriptionId,
  } = useWaitForTransaction({ hash: setSubscriptionId?.hash });

  const { config: configWithdraw }: any = usePrepareContractWrite({
    ...contractConfig,
    functionName: "withdraw",
  });
  const {
    data: withdraw,
    isLoading: isLoadingWithdraw,
    write: writeWithdraw,
  } = useContractWrite(configWithdraw);
  const {
    data: dataWithdraw,
    isError: isErrorWithdraw,
    isLoading: isLoading2Withdraw,
  } = useWaitForTransaction({ hash: withdraw?.hash });

  useEffect(() => {
    if (!isLoading2Withdraw && dataWithdraw) {
      balance_ = 0;
    }
  }, [isLoading2Withdraw]);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Game Settings"
        size="lg"
        centered
      >
        <Group position="left" style={{ margin: 10 }}>
          <Switch
            checked={pushChecked}
            onChange={(event) => setPushChecked(event.currentTarget.checked)}
            color="teal"
            size="md"
            label="Receive liquidity notifications via Push protocol"
            thumbIcon={
              pushChecked ? (
                <IconCheck
                  size={12}
                  color={theme.colors.teal[theme.fn.primaryShade()]}
                  stroke={3}
                />
              ) : (
                <IconX
                  size={12}
                  color={theme.colors.red[theme.fn.primaryShade()]}
                  stroke={3}
                />
              )
            }
          />
        </Group>
        {pushChecked && (
          <SimpleGrid
            cols={2}
            spacing="xs"
            verticalSpacing="xs"
            style={{ position: "relative" }}
            mx={10}
            py={20}
          >
            <LoadingOverlay
              visible={isLoadingSetChannel || isLoading2SetChannel}
              loader={customLoader}
              style={{ borderRadius: 10 }}
            />
            <Input
              placeholder="0x0"
              my={10}
              size="xs"
              icon={<IconAddressBook size={16} />}
              value={pushValue}
              onChange={(v) => {
                setPushValue(v.currentTarget.value);
              }}
              rightSection={
                <Tooltip
                  label="Push.org channel address"
                  position="top-end"
                  withArrow
                >
                  <div>
                    <IconAlertCircle
                      size={18}
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </div>
                </Tooltip>
              }
            ></Input>
            <Button
              my={10}
              size="xs"
              disabled={!writeSetChannel}
              onClick={() => writeSetChannel && writeSetChannel()}
              color="green"
              leftIcon={<IconPlus />}
            >
              Set Push Channel
            </Button>
          </SimpleGrid>
        )}
        <Group position="left" style={{ margin: 10 }}>
          <Switch
            checked={chainlinkChecked}
            onChange={(event) =>
              setChainlinkChecked(event.currentTarget.checked)
            }
            color="teal"
            size="md"
            label="Use cryptographically secure randomness via Chainlink"
            thumbIcon={
              chainlinkChecked ? (
                <IconCheck
                  size={12}
                  color={theme.colors.teal[theme.fn.primaryShade()]}
                  stroke={3}
                />
              ) : (
                <IconX
                  size={12}
                  color={theme.colors.red[theme.fn.primaryShade()]}
                  stroke={3}
                />
              )
            }
          />
        </Group>
        {chainlinkChecked && (
          <SimpleGrid
            cols={2}
            spacing="xs"
            verticalSpacing="xs"
            style={{ position: "relative" }}
            mx={10}
            py={20}
          >
            <LoadingOverlay
              visible={
                isLoadingSetSubscriptionId || isLoading2SetSubscriptionId
              }
              loader={customLoader}
              style={{ borderRadius: 10 }}
            />
            <Input
              placeholder="1234"
              my={10}
              size="xs"
              icon={<IconAddressBook size={16} />}
              value={chainlinkValue}
              onChange={(v) => {
                setChainlinkValue(v.currentTarget.value);
              }}
              rightSection={
                <Tooltip
                  label="Chain.link VRF Subscription ID"
                  position="top-end"
                  withArrow
                >
                  <div>
                    <IconAlertCircle
                      size={18}
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </div>
                </Tooltip>
              }
            ></Input>
            <Button
              my={10}
              size="xs"
              disabled={!writeSetSubscriptionId}
              onClick={() => writeSetSubscriptionId && writeSetSubscriptionId()}
              color="green"
              leftIcon={<IconPlus />}
            >
              Set Subscription ID
            </Button>
          </SimpleGrid>
        )}
      </Modal>
      <LoadingOverlay
        visible={isLoadingPlay || isLoading2Play}
        loader={customLoader}
      />
      {balance_ && balance_.gt(ethers.BigNumber.from("0")) && (
        <Box
          style={{
            position: "absolute",
            zIndex: "1",
            left: "0",
            top: "0",
            margin: "0",
            padding: "0",
          }}
        >
          <Button
            disabled={!writeWithdraw}
            loading={isLoadingWithdraw || isLoading2Withdraw}
            loaderPosition="center"
            onClick={() => writeWithdraw && writeWithdraw()}
            color="lime"
            leftIcon={<IconWallet />}
            size="xs"
            variant="light"
            style={{
              border: 0,
              paddingRight: 8,
              paddingLeft: 8,
              borderRadius: "0 0 10px 0",
            }}
          >
            Withdraw {ethers.utils.formatEther(balance_)}{" "}
            {balance && balance.symbol}{" "}
          </Button>
        </Box>
      )}
      {owner_ && address && owner_ === address ? (
        <Box
          style={{
            position: "absolute",
            zIndex: "1",
            right: "0",
            top: "0",
            margin: "0",
            padding: "0",
          }}
        >
          <Button
            onClick={() => setOpened(true)}
            size="sm"
            variant="default"
            style={{ border: 0, paddingRight: 8, paddingLeft: 8 }}
          >
            <IconSettings />
          </Button>
        </Box>
      ) : (
        ""
      )}
      {liquidity <= 0 ? (
        <Notification
          title="The game requires adding liquidity."
          disallowClose
          color="red"
        >
          <LoadingOverlay
            visible={isLoading || isLoadingAddLiquidity}
            loader={customLoader}
          />
          The game creator must add liquidity to the game to start playing.
          <Space h="md" />
          <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
            <Input
              icon={<IconCurrencyEthereum size={16} />}
              value={l}
              onChange={(v) => {
                setL(v.currentTarget.value);
              }}
              rightSection={
                <Tooltip
                  label="Add liquidity to the game."
                  position="top-end"
                  withArrow
                >
                  <div>
                    <IconAlertCircle
                      size={18}
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </div>
                </Tooltip>
              }
            ></Input>
            <Button
              disabled={!write}
              onClick={() => write && write()}
              color="green"
              leftIcon={<IconSeeding />}
            >
              Add liquidity
            </Button>
          </SimpleGrid>
        </Notification>
      ) : (
        <Slider
          onChange={setAmount}
          labelAlwaysOn
          defaultValue={max / 2}
          min={min}
          max={max}
          label={(value) => `${value.toFixed(5)} ${balance?.symbol}`}
          step={min / 10}
          thumbChildren={<IconCircle size={20} />}
          thumbSize={26}
          styles={{ thumb: { borderWidth: 1, padding: 1 } }}
          style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}
          color="cyan"
        />
      )}

      <Space h="md" />

      <SimpleGrid
        cols={2}
        spacing="xs"
        verticalSpacing="xs"
        style={{ position: "relative" }}
      >
        <div style={vs}>VS</div>
        <Center
          style={{
            height: 200,
            backgroundColor: `#${background1_}`,
            fontSize: "100px",
            cursor: "pointer",
            opacity: btn1,
          }}
          className="box"
          onClick={(e) => {
            setBtn1("1");
            setBtn2(".2");
            setMove("1");
          }}
        >
          {emoji1_}
        </Center>
        <Center
          style={{
            height: 200,
            backgroundColor: `#${background2_}`,
            fontSize: "100px",
            cursor: "pointer",
            opacity: btn2,
          }}
          className="box"
          onClick={(e) => {
            setBtn1(".2");
            setBtn2("1");
            setMove("2");
          }}
        >
          {emoji2_}
        </Center>
      </SimpleGrid>

      <Space h="md" />

      <Button
        disabled={!writePlay}
        size="xl"
        variant="gradient"
        fullWidth
        onClick={() => writePlay && writePlay()}
      >
        BET {amount ? amount.toFixed(5) + " " + balance?.symbol : ""}
      </Button>
    </Card>
  );
}

export function ItemPreview({ game }: { game: any }) {
  return (
    <SimpleGrid
      cols={2}
      spacing="xs"
      verticalSpacing="xs"
      style={{ position: "relative" }}
    >
      <div style={vs}>VS</div>
      <Center
        style={{
          height: 200,
          backgroundColor: `#${game.background1}`,
          fontSize: "100px",
        }}
      >
        {game.emoji1}
      </Center>
      <Center
        style={{
          height: 200,
          backgroundColor: `#${game.background2}`,
          fontSize: "100px",
        }}
      >
        {game.emoji2}
      </Center>
    </SimpleGrid>
  );
}

export function Item({ game }: { game: any }) {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <Card shadow="sm" p={0} radius="md">
      <Group position="apart" h={20}>
        <div style={bal}>
          <Badge color="gray.6" variant="light" size="xs">
            Bal: {ethers.utils.formatEther(game[3])} {balance?.symbol}
          </Badge>
        </div>
        <div style={liq}>
          <Badge color="gray.6" variant="light" size="xs">
            Liq: {ethers.utils.formatEther(game[4])} {balance?.symbol}
          </Badge>
        </div>
      </Group>

      <SimpleGrid
        cols={2}
        spacing="xs"
        verticalSpacing="xs"
        style={{ position: "relative" }}
      >
        <div style={vs}>VS</div>
        <Center
          style={{
            height: 200,
            backgroundColor: `#${game[6]}`,
            fontSize: "100px",
          }}
          className="box"
        >
          {game[7]}
        </Center>
        <Center
          style={{
            height: 200,
            backgroundColor: `#${game[8]}`,
            fontSize: "100px",
          }}
          className="box"
        >
          {game[9]}
        </Center>
      </SimpleGrid>

      <Group position="apart" m="md">
        <Text weight={500}>{game[1]}</Text>
        <Badge color="dark" variant="light">
          {game[5].toString()} games
        </Badge>
      </Group>

      <Link
        to={`/games/${game[0].toString()}`}
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="light"
          color="dark"
          fullWidth
          radius={0}
          leftIcon={<IconDice />}
          mt={10}
        >
          Go to game
        </Button>
      </Link>
    </Card>
  );
}

export function Items({ games }: { games: any }) {
  return (
    <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
      {games &&
        games.pages[0].map((game: any, id: number) =>
          game ? <Item key={id} game={game} /> : ""
        )}
    </SimpleGrid>
  );
}
