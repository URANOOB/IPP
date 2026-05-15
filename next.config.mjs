/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  /* Le indicamos a Next.js que la raíz del proyecto es esta carpeta. */
  outputFileTracingRoot: __dirname,

  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.5'],
};

export default nextConfig;
