export { default } from "@/app/page";

export async function generateStaticParams() {
  return [{ locale: "de" }];
}
