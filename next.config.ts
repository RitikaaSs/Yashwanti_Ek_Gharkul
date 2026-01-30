// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   //  output: "standalone",
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     // ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
