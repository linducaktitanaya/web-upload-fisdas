'use client';

export default function Galat({ reset }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-bold">Terjadi masalah</h1>
      <p className="mt-3 text-lg">
        Halaman ini belum bisa dimuat. Coba sekali lagi, atau kembali ke beranda.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => reset()} className="tombol tombol-merah">
          Coba lagi
        </button>
        <a href="/" className="tombol tombol-void">
          Ke Beranda
        </a>
      </div>
    </main>
  );
}
