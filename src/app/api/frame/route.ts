import { ResponseType } from "@/app/types";
import { fetchPairs } from "@/app/utils/poller";
import { SITE_URL } from "@/config";
// import { kv } from '@vercel/kv';
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
// const HAS_KV = !!process.env.KV_URL;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: FrameRequest = await req.json();
    console.log("BODY", body);

    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: NEYNAR_API_KEY,
    });

    if (!isValid) {
      console.error(message);
      throw new Error("Invalid frame request");
    }

    if (message.button === 1) {
      return getResponse(ResponseType.NEXT_PAIR);
    }

    console.log("MESSAGE", { isValid, message });

    return getResponse(ResponseType.DONE);
  } catch (error) {
    console.error(error);
    return getResponse(ResponseType.ERROR);
  }
}

// add pariwise functions here to pair up the next set of projects
const initialPairs = fetchPairs();

// merge the images of the two projects into one image
async function getPairImage() {
  const image1 = "/status/ty-for-voting.webp";
  const image2 = "/Example1.webp";

  // show the two images side by side

  return image2;
}

async function getResponse(type: ResponseType) {
  console.log("response type from frame", type);

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

  const isDone = type === ResponseType.DONE;

  const shouldRetry =
    type === ResponseType.ERROR || type === ResponseType.NO_ADDRESS;
  if (!shouldRetry) {
    if (isDone) {
      return new NextResponse(
        getFrameHtmlResponse({
          image: `${SITE_URL}${IMAGE}`,
        })
      );
    } else {
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
          ],
          image: `${SITE_URL}${IMAGE}`,
          post_url: `${SITE_URL}${ROUTE}`,
        })
      );
    }
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `🫤 ${"Try Again"} 🫤`,
          },
        ],
        image: `${SITE_URL}/status/try-again-image.webp`,
        post_url: `${SITE_URL}/api/frame`,
      })
    );
  }
}

// async function validateFrameRequest(data: string | undefined) {
//   if (!NEYNAR_API_KEY) throw new Error("NEYNAR_API_KEY is not set");
//   if (!data) throw new Error("No data provided");

//   const options = {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       api_key: NEYNAR_API_KEY,
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({ message_bytes_in_hex: data }),
//   };

//   return await fetch(
//     "https://api.neynar.com/v2/farcaster/frame/validate",
//     options
//   )
//     .then((response) => response.json())
//     .catch((err) => console.error(err));
// }
