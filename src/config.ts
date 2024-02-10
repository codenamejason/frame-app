import { getFrameMetadata } from "@coinbase/onchainkit";
import { base } from "viem/chains";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

export const CHAIN = base;

export const CONTRACT_ADDRESS: `0x${string}` = "0x";

export const FRAME_METADATA = getFrameMetadata({
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
  image: `${SITE_URL}/Example1.webp`,
  post_url: `${SITE_URL}/api/vote`,
});
