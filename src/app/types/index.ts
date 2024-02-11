export enum VOTES {
  NONE,
  LEFT,
  RIGHT,
  ABSTAIN,
}

export enum ResponseType {
  SUCCESS,
  // RECAST,
  VOTE_AGAIN,
  NEXT_PAIR,
  NO_ADDRESS,
  ERROR,
  DONE,
}

export type TRanking = {
  id: number;
  rankGiven: number;
  pickedPairId: number;
  createdAt: Date;
};

export type ProjectType = "INDIVIDUAL" | "COLLECTION";

export interface IProject {
  id?: number;
  name?: string;
  description?: string;
  address?: `0x${string}`;
  hasRanking?: boolean;
  type: ProjectType;
  createdAt: Date;
  updatedAt?: Date;
  metadata?: TMetadata | undefined;
  parentId?: number;
}

export type TMetadata = {
  id?: number;
  protocol: number;
  pointer: string;
  project?: IProject[];
};

export interface IUser {
  id?: number;
  name: string;
  email: string;
  address: `0x${string}`;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPickedPair {
  id: number;
  pickedAt: Date;
  projectPairIds: number[];
  createdAt: Date;
  rankings: TRanking[];
  user: IUser;
}
