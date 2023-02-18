import { Container } from "@mantine/core";
import { ethers } from "ethers";
import {
  paginatedIndexesConfig,
  useAccount,
  useContractInfiniteReads,
} from "wagmi";

import factoryABI from "../../abi/factory.json";

import { Items } from "../components";

export default function Games() {
  const { address } = useAccount();

  const contractConfig: any = {
    address: "0x36c4E4f98D82944515D87b0aad0CD263588039d8",
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

  return (
    <Container>
      <Items games={data} />
    </Container>
  );
}
