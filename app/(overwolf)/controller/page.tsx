import dynamic from "next/dynamic";

const Init = dynamic(() => import("./init"), {
  ssr: false,
});

export const metadata = {
  title: "Controller - Diablo 4 Companion",
};

export default async function Controller() {
  return <Init />;
}
