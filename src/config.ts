import { getFrameMetadata } from "@coinbase/onchainkit";
import { base } from "viem/chains";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const CHAIN = base;

export const CONTRACT_ADDRESS: `0x${string}` = "0x";

export const FRAME_METADATA = getFrameMetadata({
  buttons: [
    {
      label: "Vote Today! 🗳️",
    },
  ],
  image: `${SITE_URL}/opengraph-image.png`,
  post_url: `${SITE_URL}/api/frame`,
});
