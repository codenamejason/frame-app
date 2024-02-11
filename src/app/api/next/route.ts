import { ResponseType } from "@/app/types";
import { voteProjects } from "@/app/utils/poller";
import { CHAIN, SITE_URL } from "@/config";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
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

    const body: FrameRequest = await req.json();
    console.log("BODY", body);

    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: NEYNAR_API_KEY,
    });

    if (!isValid) {
      console.error(message);
      throw new Error("Invalid frame request");
    }

    const vote = await voteProjects({ pairId: 2, selected: 4 });

    console.log("VOTE", vote);

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

    if (message.button === 4) {
      return getResponse(ResponseType.DONE);
    }

    return getResponse(ResponseType.NEXT_PAIR);
  } catch (error) {
    console.error(error);
    return getResponse(ResponseType.ERROR);
  }
}

// add pariwise functions here to pair up the next set of projects

// merge the images of the two projects into one image
async function getPairImage() {
  const image1 = "/status/ty-for-voting.webp";
  const image2 = "/Example1.webp";

  // show the two images side by side

  return image2;
}

async function getResponse(type: ResponseType) {
  const pairImage = await getPairImage();
  const IMAGE = {
    [ResponseType.SUCCESS]: "/status/ty-for-voting.webp",
    [ResponseType.NO_ADDRESS]: "/status/no-address.png",
    [ResponseType.ERROR]: "/status/error.png",
    [ResponseType.VOTE_AGAIN]: "/status/vote-again.webp",
    [ResponseType.NEXT_PAIR]: pairImage,
    [ResponseType.DONE]: "/status/ty-for-voting.webp",
  }[type];
  const ROUTE = {
    [ResponseType.SUCCESS]: "/api/thanks",
    [ResponseType.NO_ADDRESS]: "/api/frame",
    [ResponseType.ERROR]: "/api/frame",
    [ResponseType.VOTE_AGAIN]: "/api/next",
    [ResponseType.NEXT_PAIR]: "/api/next",
    [ResponseType.DONE]: "/api/thanks",
  }[type];

  if (type === ResponseType.NEXT_PAIR) {
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
        post_url: `${SITE_URL}${ROUTE}`,
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Share Frame",
          },
        ],
        image: `${SITE_URL}${IMAGE}`,
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
