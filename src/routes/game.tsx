import {
  Container,
  Text,
  Button,
  Table,
  Space,
  Card,
  DEFAULT_THEME,
} from "@mantine/core";
import { ethers } from "ethers";
import { Link, useParams } from "react-router-dom";
import {
  paginatedIndexesConfig,
  useAccount,
  useBalance,
  useContractInfiniteReads,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import ultramarineABI from "../../abi/ultramarine.json";

import { ItemMain } from "../components";

export default function Game() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  let { gameAddress, id } = useParams();

  const contractConfig: any = {
    address: gameAddress,
    abi: ultramarineABI,
  };

  const { data: game }: any = useContractRead({
    ...contractConfig,
    functionName: "getGame",
    args: [address],
  });

  const { data: bets } = useContractInfiniteReads({
    cacheKey: "bets",
    ...paginatedIndexesConfig(
      (index: number): any => {
        return [
          {
            ...contractConfig,
            functionName: "getBet",
            args: [ethers.BigNumber.from(index)] as const,
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
    cacheTime: 2_000,
    staleTime: 2_000,
  });

  return (
    <Container mb={50}>
      {game && <ItemMain game={game} gameAddress={gameAddress} />}
      <Space h="md" />
      {bets && bets.pages[0] && bets?.pages?.[0]?.[0] && (
        <Card shadow="sm" p={0} radius="md" withBorder>
          <Table highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {bets.pages[0].map((page, i) => {
                if (!page) return;
                const [id_, user_, amount_, move_, rand_]: any = page;
                return (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: id === id_.toString() ? "#131313" : "",
                    }}
                  >
                    <td>{id_.toString()}</td>
                    <td>{user_}</td>
                    <td>
                      {ethers.utils.formatEther(amount_)} {balance?.symbol}
                    </td>
                    <td>
                      <Button
                        variant="light"
                        color={
                          rand_.gt(ethers.BigNumber.from("0"))
                            ? move_.eq(rand_)
                              ? "green"
                              : "red"
                            : ""
                        }
                        size="xs"
                        component="a"
                        href={`https://testnets.opensea.io/assets/mumbai/${gameAddress}/${id_}`}
                        target="_blank"
                        fullWidth
                      >
                        {rand_.gt(ethers.BigNumber.from("0"))
                          ? move_.eq(rand_)
                            ? "WON"
                            : "LOSE"
                          : "..."}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
}
