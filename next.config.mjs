/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: "./tsconfig.next.json",
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
