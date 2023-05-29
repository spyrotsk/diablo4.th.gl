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
      };

module.exports = nextConfig;
