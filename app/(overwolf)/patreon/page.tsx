import dynamic from "next/dynamic";

const Redirect = dynamic(() => import("./redirect"), {
  ssr: false,
});

export const metadata = {
  title: "Patreon - Diablo 4 Map",
};

export default async function Patreon() {
  return <Redirect />;
}
