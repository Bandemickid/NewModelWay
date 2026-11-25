import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true" ? { output: "export" as const } : {}),
  typescript: { tsconfigPath: "tsconfig.vercel.json" },
};

export default nextConfig;
