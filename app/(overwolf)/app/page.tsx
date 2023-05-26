import Map from "@/app/components/(map)/map";
import Tiles from "@/app/components/(map)/tiles";
import Header from "../components/header";

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
