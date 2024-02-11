import { SITE_URL } from "@/config";
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  return new NextResponse(
    getFrameHtmlResponse({
      image: `${SITE_URL}/status/ty-for-voting.webp`,
    })
  );
}
