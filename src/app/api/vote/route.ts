import { ResponseType } from "@/app/types";
import { SITE_URL } from "@/config";
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    console.log("BODY", body);

    // Check if frame request is valid
    const status = await validateFrameRequest(body.trustedData?.messageBytes);

    // Check if user has an address connected
    const address: Address | undefined =
      status?.action?.interactor?.verifications?.[0];
    console.log("ADDRESS", address);

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
    [ResponseType.SUCCESS]: "status/vote-again.webp",
    [ResponseType.NO_ADDRESS]: "status/no-address.png",
    [ResponseType.ERROR]: "status/error.png",
    [ResponseType.NEXT_PAIR]: "/Example1.webp",
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
      post_url: `${SITE_URL}/api/next`,
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
