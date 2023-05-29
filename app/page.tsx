import { isOverwolf } from "./lib/env";

import Home from "./[locale]/(web)/home";

export default isOverwolf ? () => <></> : Home;
