/**
 * @type {import('next').NextConfig}
 */
const nextConfig =
  process.env.TARGET === "overwolf"
    ? {
        output: "export",
      }
    : {
        i18n: {
          locales: ["en", "de"],
          defaultLocale: "en",
        },
        headers: async () => [
          {
            source: "/map/:all*(webp)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, stale-while-revalidate",
              },
            ],
          },
        ],
      };

module.exports = nextConfig;
