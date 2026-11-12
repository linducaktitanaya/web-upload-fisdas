/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Batas ukuran form (Server Action) = 5 MB.
  // Batas upload yang kita pakai di aplikasi = 4 MB (batas Vercel ~4,5 MB).
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },

  // Build memakai webpack (lihat package.json). Baris ini hanya agar Next.js
  // tidak mengeluh bila suatu saat Turbopack dipakai.
  turbopack: {},

  // pdfjs-dist mencoba memuat modul "canvas" (hanya dipakai di Node.js).
  // Di browser tidak diperlukan, jadi kita matikan.
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
