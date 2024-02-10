import { ResponseType } from "@/app/types";
import { CHAIN, SITE_URL } from "@/config";
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import image from "next/image";
// import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from "next/server";
import {
  Address,
  Hex,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
// import { privateKeyToAccount } from "viem/accounts";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
// const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY as
//   | Hex
//   | undefined;
// const HAS_KV = !!process.env.KV_URL;

const transport = http(process.env.RPC_URL);

// const publicClient = createPublicClient({
//   chain: CHAIN,
//   transport,
// });

// const walletClient = createWalletClient({
//   chain: CHAIN,
//   transport,
// });

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // if (!NEXT_PUBLIC_PRIVATE_KEY)
    //   throw new Error("NEXT_PUBLIC_PRIVATE_KEY is not set");

    const body: { trustedData?: { messageBytes?: string } } = await req.json();

    // Check if frame request is valid
    const status = await validateFrameRequest(body.trustedData?.messageBytes);

    if (!status?.valid) {
      console.error(status);
      throw new Error("Invalid frame request");
    }

    // Check if user has an address connected
    const address: Address | undefined =
      status?.action?.interactor?.verifications?.[0];

    if (!address) {
      return getResponse(ResponseType.NO_ADDRESS);
    }

    // Set up the tranaction to cast vote
    // const { request } = await publicClient.simulateContract({
    //   address: "0x",
    //   abi: [],
    //   functionName: "",
    //   args: [],
    //   account: privateKeyToAccount(NEXT_PUBLIC_PRIVATE_KEY),
    // });

    // if (!request) {
    //   throw new Error("Could not simulate contract");
    // }

    // const hash = await walletClient.writeContract(request);

    // console.log(`Transaction sent from ${address} with hash ${hash}`);

    // if (HAS_KV) {
    //   await kv.set(`tx:${address}`, hash);
    // }

    return getResponse(ResponseType.NEXT_PAIR);
  } catch (error) {
    console.error(error);
    return getResponse(ResponseType.ERROR);
  }
}

function getResponse(type: ResponseType) {
  const IMAGE = {
    [ResponseType.SUCCESS]: "status/ty-for-voting.webp",
    [ResponseType.NO_ADDRESS]: "status/no-address.png",
    [ResponseType.ERROR]: "status/error.png",
    [ResponseType.NEXT_PAIR]: "/Example1.webp",
  }[type];
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Left",
        },
        {
          label: "Right",
        },
        {
          label: "Abstain",
        },
        {
          label: "I'm Done",
        },
      ],
      image: `${SITE_URL}${IMAGE}`,
      post_url: `${SITE_URL}/api/vote`,
    })
  );
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
