import { getFrameMetadata } from "@coinbase/onchainkit";
import { base } from "viem/chains";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

export const CHAIN = base;

export const CONTRACT_ADDRESS: `0x${string}` = "0x";

export const HOME_PAGE_FRAME_METADATA = getFrameMetadata({
  buttons: [
    {
      label: "Vote on Projects",
      action: "post",
    },
  ],
  image: {
    src: `${SITE_URL}/status/welcome.webp`,
    aspectRatio: "1:1",
  },
  post_url: `${SITE_URL}/api/frame`,
});
