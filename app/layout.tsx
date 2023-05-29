import OverwolfLayout, {
  generateMetadata as generateMetadataOverwolf,
} from "./(overwolf)/layout";
import Layout, {
  generateMetadata as generateMetadataLayout,
} from "./[locale]/layout";
import { isOverwolf } from "./lib/env";

export const generateMetadata = isOverwolf
  ? generateMetadataOverwolf
  : generateMetadataLayout;
export default isOverwolf ? OverwolfLayout : Layout;
