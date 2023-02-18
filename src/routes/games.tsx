import { Container } from "@mantine/core";
import { ethers } from "ethers";
import {
  paginatedIndexesConfig,
  useAccount,
  useContractInfiniteReads,
  useNetwork,
} from "wagmi";

import { factoryAddress } from "../../abi";

import factoryABI from "../../abi/factory.json";

import { Items } from "../components";

export default function Games() {
  const { address } = useAccount();

  const { chain } = useNetwork();

  const contractConfig: any = {
    address:
      chain?.id && (chain?.id === 80_001 || chain?.id === 314_1)
        ? factoryAddress[chain.id]
        : ethers.constants.AddressZero,
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
