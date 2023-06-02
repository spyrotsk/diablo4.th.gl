"use client";
import { ICONS } from "../lib/icons";
import nodes from "../lib/nodes";
import { useDiscoveredNodesStore } from "../lib/storage";
import { useDict } from "./(i18n)/i18n-provider";

export default function DiscoveredNodes() {
  const { discoveredNodes } = useDiscoveredNodesStore();
  const dict = useDict();

  return (
    <>
      {Object.entries(ICONS).map(([key, icon]) => (
        <p key={key} className="flex items-center gap-2 text-gray-300">
          <svg viewBox="0 0 100 100" fill={icon.color} className="h-5">
            <path d={icon.path} />
          </svg>
          <span className="flex-1">
            {dict.nodes[key as keyof typeof ICONS]}
          </span>
          <span>
            {discoveredNodes.filter((node) => node.startsWith(key)).length}/
            {nodes[key as keyof typeof ICONS].length}
          </span>
        </p>
      ))}
    </>
  );
}
