import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://diablo4.th.gl",
      lastModified: new Date(),
    },
  ];
}
