import { ContractABI } from "@/app/abi/ContractABI";
import { ResponseType } from "@/app/types";
import { CHAIN, CONTRACT_ADDRESS, SITE_URL } from "@/config";
// import { kv } from '@vercel/kv';
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import {
  Address,
  Hex,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
const WALLET_PRIVATE_KEY = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY as
  | Hex
  | undefined;
// const HAS_KV = !!process.env.KV_URL;
const transport = http(process.env.RPC_URL);
const publicClient = createPublicClient({
  chain: CHAIN,
  transport,
});
const walletClient = createWalletClient({
  chain: CHAIN,
  transport,
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    if (!WALLET_PRIVATE_KEY) throw new Error("WALLET_PRIVATE_KEY is not set");

    const body: { trustedData?: { messageBytes?: string } } = await req.json();

    // Check if frame request is valid
    const status = await validateFrameRequest(body.trustedData?.messageBytes);

    if (!status?.valid) {
      console.error(status);
      throw new Error("Invalid frame request");
    }

    // Check if user has liked and recasted
    const hasLiked = !!status?.action?.cast?.viewer_context?.liked;
    const hasRecasted = !!status?.action?.cast?.viewer_context?.recasted;
    const hasLikedAndRecasted = hasLiked && hasRecasted;

    // if (!hasLikedAndRecasted) {
    //   return getResponse(ResponseType.RECAST);
    // }

    // Check if user has an address connected
    const address: Address | undefined =
      status?.action?.interactor?.verifications?.[0];

    if (!address) {
      return getResponse(ResponseType.NO_ADDRESS);
    }

    // Using KV to store hashes and votes/pairs
    // if (HAS_KV) {
    //   const prevMintHash = await kv.get<Hex>(`mint:${address}`);

    //   if (prevMintHash) {
    //     return getResponse(ResponseType.ALREADY_MINTED);
    //   }
    // }

    // Read contract call
    const hasVoted: bigint = await publicClient.readContract({
      abi: ContractABI,
      address: CONTRACT_ADDRESS,
      functionName: "",
      args: [],
    });

    if (hasVoted) {
      return getResponse(ResponseType.ALREADY_VOTED);
    }

    // if (HAS_KV) {
    //   await kv.set(`transaction:${address}`, hash);
    // }

    return getResponse(ResponseType.SUCCESS);
  } catch (error) {
    console.error(error);
    return getResponse(ResponseType.ERROR);
  }
}

function getResponse(type: ResponseType) {
  const FRAME = {
    [ResponseType.START]: "",
    [ResponseType.SUCCESS]: "status/success.png",
    [ResponseType.RECAST]: "status/recast.png",
    [ResponseType.ALREADY_VOTED]: "status/already-voted.png",
    [ResponseType.NO_ADDRESS]: "status/no-address.png",
    [ResponseType.ERROR]: "status/error.png",
    [ResponseType.DONE]: "status/done.png",
  }[type];
  const shouldRetry =
    type === ResponseType.ERROR || type === ResponseType.RECAST;
  if (!shouldRetry) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `🌊 ${"Vote"} 🌊`,
          },
        ],
        image: `${SITE_URL}/opengraph-image.png`,
        post_url: `${SITE_URL}/api/frame`,
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `🌊 ${"Try Again"} 🌊`,
          },
        ],
        image: `${SITE_URL}/try-again-image.png`,
        post_url: `${SITE_URL}/api/frame`,
      })
    );
  }
}

async function validateFrameRequest(data: string | undefined) {
  if (!NEYNAR_API_KEY) throw new Error("NEYNAR_API_KEY is not set");
  if (!data) throw new Error("No data provided");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      api_key: NEYNAR_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({ message_bytes_in_hex: data }),
  };

  return await fetch(
    "https://api.neynar.com/v2/farcaster/frame/validate",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
