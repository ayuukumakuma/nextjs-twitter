/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  sassOptions: {
    prependData: `@import "${path.resolve(__dirname, "src/styles/_variables.scss")}";`,
  },
};

export default nextConfig;
