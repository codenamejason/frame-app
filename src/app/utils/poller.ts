import { IPairType } from "@/app/types/Pair";
import { seedDb } from "@/data/seed";

import { PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchPairs(cid?: string) {
  let pairs: IPairType[] = [];
  try {
    await seedDb();
    const pairs: any[] = [];

    console.log(pairs);
  } catch (error) {
    console.error(error);
  }

  return pairs;
}

/**
 * Vote for a pair
 *
 * @param pairId - pair ID
 * @param selected - selected project ID
 *
 * @returns
 */
export async function voteProjects({
  pairId,
  selected,
}: {
  pairId: number;
  selected: number;
}) {
  const myPairVote = await prisma.vote.create({
    data: {
      userId: 1,
      pickedId: selected,
      pickedPairId: pairId,
    },
  });

  return myPairVote;
}

/**
 * Get rankings
 *
 * @param cid - collection ID
 *
 * @returns Rankings[]
 */
export async function getRankings(cid?: string) {
  const rankings = prisma.ranking.findMany({
    include: {
      pickedPair: true,
    },
  });

  return rankings;
}

export async function getOverallRanking(): Promise<any> {
  const rankings = prisma.ranking.findMany();

  // do something with rankings

  // return data
  return rankings;
}
