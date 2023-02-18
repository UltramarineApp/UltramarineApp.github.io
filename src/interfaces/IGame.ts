import { BigNumber } from "ethers";

type IItem = readonly [
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  string,
  string,
  string,
  string
];

interface IPages {
  pages: [IItem[]];
}

export type { IItem, IPages };
