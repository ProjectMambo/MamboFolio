import type { NextConfig } from "next";
import path from "node:path";
import manifest from "./src/generated/mambo/manifest";

const nextConfig: NextConfig = {
  output: "export",
  basePath: manifest.site.basePath,
  trailingSlash: manifest.site.trailingSlash,
  // MamboSite packages are linked from the sibling repository during local
  // development and CI, so Turbopack must be able to resolve their shared root.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
