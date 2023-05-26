import Home from "./(web)/home";
import { isOverwolf } from "./lib/env";

export default isOverwolf ? () => <></> : Home;
