import { PairType } from "./Pair";

export interface PairsType {
  pairs: Array<Array<PairType>>;
}

export enum VOTES {
  NONE,
  LEFT,
  RIGHT,
  ABSTAIN,
}

export enum ResponseType {
  SUCCESS,
  // RECAST,
  NEXT_PAIR,
  NO_ADDRESS,
  ERROR,
}
