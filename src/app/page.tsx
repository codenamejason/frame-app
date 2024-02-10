import { HOME_PAGE_FRAME_METADATA, SITE_URL } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: "Vote on Projects",
  other: HOME_PAGE_FRAME_METADATA,
};

export default function Home() {
  return <div style={{ minHeight: "100dvh", display: "flex" }}></div>;
}
