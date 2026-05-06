/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  /* 
     Le indicamos a Next.js que la raíz del proyecto es esta carpeta 
     para evitar conflictos con otros archivos package-lock.json superiores.
  */
  outputFileTracingRoot: __dirname,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
