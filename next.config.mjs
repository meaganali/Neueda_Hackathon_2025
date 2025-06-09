/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    ASTRA_DB_TOKEN: process.env.ASTRA_DB_TOKEN,
    ASTRA_DB_ENDPOINT: process.env.ASTRA_DB_ENDPOINT,
  },
}

export default nextConfig