import dynamic from "next/dynamic";
import Header from "../components/header";

const Map = dynamic(() => import("../../[[...slug]]/components/(map)/map"), {
  ssr: false,
});
const Tiles = dynamic(
  () => import("../../[[...slug]]/components/(map)/tiles"),
  {
    ssr: false,
  }
);

export default async function App() {
  return (
    <>
      <Header />
      <Map>
        <Tiles />
      </Map>
    </>
  );
}
