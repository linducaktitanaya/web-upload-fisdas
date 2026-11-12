import Link from 'next/link';

export default function HalamanTidakAda() {
  return (
    <div>
      <p className="font-display text-6xl font-bold text-merah">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-void">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 text-lg">
        Alamat yang kamu buka tidak ada, atau tugasnya sudah dihapus.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="tombol tombol-void">
          Ke Beranda
        </Link>
        <Link href="/tugas" className="tombol tombol-merah">
          Lihat Daftar Tugas
        </Link>
      </div>
    </div>
  );
}
