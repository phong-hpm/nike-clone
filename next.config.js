/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "_build",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["static.nike.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
};

module.exports = nextConfig;
