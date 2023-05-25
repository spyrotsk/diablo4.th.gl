/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: process.env.TARGET === "overwolf" ? "export" : undefined,
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = nextConfig;
