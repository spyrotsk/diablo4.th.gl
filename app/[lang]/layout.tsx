export { generateMetadata } from "@/app/lib/meta";
export { default } from "../(web)/layout";

export async function generateStaticParams() {
  return [{ lang: "de" }];
}
