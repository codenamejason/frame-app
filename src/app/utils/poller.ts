import { PairsType } from "@/app/types";
import { IPairType } from "@/app/types/Pair";
import { axiosInstance } from "./axiosInstance";

export async function fetchPairs(cid?: string) {
  try {
    const pairs: any[] = [];

    console.log(pairs);
  } catch (error) {
    console.error(error);
  }

  // const url = "/api/pairs";
  // return axiosInstance
  //   .get<PairsType>(url, {
  //     params: {
  //       cid,
  //     },
  //   })
  //   .then((res) => res.data);
}

export async function voteProjects({
  id1,
  id2,
  pickedId,
}: {
  id1: number;
  id2: number;
  pickedId: number | null;
}) {
  // const myPairVote =
  // return axiosInstance
  //   .post("/api/vote", {
  //     project1Id: id1,
  //     project2Id: id2,
  //     pickedId,
  //   })
  //   .then((res) => res.data);
}

// export async function getRankings(cid?: string) {
//   return axiosInstance
//     .get<CollectionRanking>(`/flow/ranking`, {
//       params: { cid: cid === "root" ? null : cid },
//     })
//     .then((res) => res.data);
// }

// export async function getOverallRanking(): Promise<CollectionRanking> {
//   const { data } = await axiosInstance.get<CollectionRanking[]>(
//     `/flow/ranking/overall`
//   );
//   return {
//     id: -1,
//     name: "root",
//     ranking: data,
//     isTopLevel: false,
//     progress: "Pending",
//     share: 1,
//     // isFinished: true,
//     type: "collection",
//     hasRanking: true,
//   };
//   // return data
// }

export async function getCollection(id: number): Promise<IPairType> {
  const { data } = await axiosInstance.get(`/collection/${id}`);
  return data.collection;
}

export async function getProject(id: number): Promise<IPairType> {
  const { data } = await axiosInstance.get(`/project/${id}`);
  return data.project;
}

export async function finishCollections(id: number) {
  const { data } = await axiosInstance.post(`/flow/finish`, { cid: id });
  return data;
}
