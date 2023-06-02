import { altars } from "./altars";
import { cellars } from "./cellars";
import { dungeons } from "./dungeons";
import { waypoints } from "./waypoints";

const nodes = {
  altars,
  cellars,
  dungeons,
  waypoints,
} as const;

export default nodes;

export type NODE_TYPE = keyof typeof nodes;
export type NODE = (typeof nodes)[NODE_TYPE][number];

export function getID(node: NODE, type: string) {
  return `${type}:${node.name}${node.x},${node.y}`;
}
