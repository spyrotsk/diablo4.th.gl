import dynamic from "next/dynamic";
import Coordinates from "../components/(map)/coordinates";
import Nodes from "../components/(map)/nodes";
import Tiles from "../components/(map)/tiles";

const Map = dynamic(() => import("../components/(map)/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <Map>
      <Tiles />
      <Nodes />
      <Coordinates />
    </Map>
  );
}
