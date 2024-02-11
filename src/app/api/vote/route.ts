import { ResponseType } from "@/app/types";
import { SITE_URL } from "@/config";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

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

    console.log("MESSAGE", { isValid, message });

    return getResponse(ResponseType.VOTE_AGAIN);
  } catch (error) {
    console.error(error);
    return getResponse(ResponseType.ERROR);
  }
}

function getResponse(type: ResponseType) {
  console.log("response type from vote", type);

  const IMAGE = {
    [ResponseType.SUCCESS]: "status/ty-for-voting.webp",
    [ResponseType.NO_ADDRESS]: "status/no-address.png",
    [ResponseType.ERROR]: "status/error.png",
    [ResponseType.VOTE_AGAIN]: "status/vote-again.webp",
    [ResponseType.NEXT_PAIR]: "/Example1.webp",
    [ResponseType.DONE]: "status/ty-for-voting.webp",
  }[type];
  const ROUTE = {
    [ResponseType.SUCCESS]: "api/ty-for-voting.webp",
    [ResponseType.NO_ADDRESS]: "api/frame",
    [ResponseType.ERROR]: "api/frame",
    [ResponseType.VOTE_AGAIN]: "api/next",
    [ResponseType.NEXT_PAIR]: "api/next",
    [ResponseType.DONE]: "api/thanks",
  }[type];
  // const shouldRetry = type === ResponseType.ERROR;
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Yes",
          action: "post",
        },
        {
          label: "I'm Done",
          action: "post",
        },
      ],
      image: {
        src: `${SITE_URL}/${IMAGE}`,
        aspectRatio: "1:1",
      },
      post_url: `${SITE_URL}/${ROUTE}`,
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
