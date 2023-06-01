"use client";
import dynamic from "next/dynamic";
import { useOverwolfRouter } from "../(overwolf)/components/overwolf-router";
import Drawer from "./drawer";
import ExternalLink from "./external-link";
const NitroPay = dynamic(() => import("./nitro-pay"), {
  ssr: false,
});

const DISCOVER_LINKS = [
  {
    href: "https://www.studioloot.com/diablo4",
    text: "Diablo 4 News & Guides",
  },
  {
    href: "https://www.th.gl",
    text: "Gaming Apps & Tools",
  },
];
export default function Menu({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const router = useOverwolfRouter();

  return (
    <Drawer show={show}>
      <div className="p-2 flex flex-col gap-1">
        <header className="my-2 flex justify-between">
          <h1 className="text-xl font-bold">Diablo 4 Map</h1>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </header>
        {!("value" in router) && <NitroPay />}
        <h2 className="text-sm text-gray-400">Community</h2>
        <ExternalLink
          href="https://discord.com/invite/NTZu8Px"
          text="Discord"
        />
        <h2 className="text-sm text-gray-400">Discover</h2>
        {DISCOVER_LINKS.map(({ href, text }) => (
          <ExternalLink key={href} href={href} text={text} />
        ))}
        <h2 className="text-sm text-gray-400">Contribute</h2>
        <ExternalLink
          href="https://github.com/lmachens/diablo4.th.gl"
          text="GitHub"
        />
      </div>
    </Drawer>
  );
}
