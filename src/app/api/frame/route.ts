import { ResponseType } from "@/app/types";
import { SITE_URL } from "@/config";
// import { kv } from '@vercel/kv';
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
// const HAS_KV = !!process.env.KV_URL;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  try {
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
  const shouldRetry =
    type === ResponseType.ERROR || type === ResponseType.NO_ADDRESS;
  if (!shouldRetry) {
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
