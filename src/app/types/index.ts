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
  START,
  SUCCESS,
  RECAST,
  ALREADY_VOTED,
  NO_ADDRESS,
  ERROR,
  DONE,
}
