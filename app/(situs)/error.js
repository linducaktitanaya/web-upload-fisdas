'use client';

export default function Galat({ reset }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-bold">Terjadi masalah</h1>
      <p className="mt-3 text-lg">
        Halaman ini belum bisa dimuat. Coba sekali lagi. Jika masih gagal, pemilik situs
        perlu memeriksa koneksi database.
      </p>
      <button type="button" onClick={() => reset()} className="tombol tombol-merah mt-6">
        Coba lagi
      </button>
    </div>
  );
}
