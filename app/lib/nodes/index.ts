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
