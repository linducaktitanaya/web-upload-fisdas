import { Pool } from 'pg';

// Satu koneksi pool dipakai bersama (aman untuk serverless & mode dev).
function buatPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL belum diatur. Tambahkan database Neon di tab Storage Vercel, lalu redeploy.'
    );
  }
  const lokal = /localhost|127\.0\.0\.1/.test(url);
  return new Pool({
    connectionString: url,
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000,
    // Neon mewajibkan SSL. Biasanya sudah ada "sslmode=require" di URL.
    ssl: lokal || url.includes('sslmode=') ? undefined : true,
  });
}

export function ambilPool() {
  if (!globalThis.__poolPortofolio) {
    globalThis.__poolPortofolio = buatPool();
  }
  return globalThis.__poolPortofolio;
}

export function query(teks, parameter) {
  return ambilPool().query(teks, parameter);
}
