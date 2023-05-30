export { default } from "@/app/(web)/page";

export async function generateStaticParams() {
  return [{ locale: "de" }];
}
