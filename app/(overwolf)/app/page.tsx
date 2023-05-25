import dynamic from "next/dynamic";
import Header from "./header";

const Client = dynamic(() => import("./client"), {
  ssr: false,
});

export const metadata = {
  title: "Diablo 4 Companion",
};

export default async function App() {
  return (
    <>
      <Header />
      <Client />
    </>
  );
}
