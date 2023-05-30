import { Metadata } from "next";
import { loadDictionary } from "./i18n";

export function generateMetadata({
  params: { locale, name },
}: {
  params: { locale: string; name: string };
}): Metadata {
  const { meta } = loadDictionary(locale);
  const title = name ? decodeURIComponent(name) : "Sanctuary";

  return {
    title: `${title} | ${meta.subtitle} | diablo4.th.gl`,
    description: meta.description,
    creator: "Leon Machens",
    themeColor: "black",
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        de: "/de",
      },
    },
    openGraph: {
      title: `Sanctuary | ${meta.subtitle} | diablo4.th.gl`,
      description: meta.description,
      type: "website",
      url: "https://diablo4.th.gl",
    },
  };
}
