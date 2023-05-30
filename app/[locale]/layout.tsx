import { notFound } from "next/navigation";
import { isLocale } from "../lib/i18n";

export { generateMetadata } from "@/app/lib/meta";

function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(locale)) {
    notFound();
  }
  return children;
}

export default Layout;
