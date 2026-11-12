import Link from 'next/link';
import JudulBagian from './JudulBagian';
import KartuTugas from './KartuTugas';
import PesanKosong from './PesanKosong';

export default function TugasTerbaru({ tugas, galat }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-14" aria-labelledby="judul-terbaru">
      <JudulBagian id="judul-terbaru">Tugas terbaru</JudulBagian>

      <div className="mt-6">
        {galat ? (
          <PesanKosong galat judul="Data tugas belum bisa dimuat">
            <p>Coba muat ulang halaman ini beberapa saat lagi.</p>
          </PesanKosong>
        ) : tugas.length === 0 ? (
          <PesanKosong judul="Belum ada tugas yang diunggah">
            <p>Tugas pertama akan muncul di sini setelah diunggah.</p>
          </PesanKosong>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tugas.map((t) => (
              <li key={t.id}>
                <KartuTugas tugas={t} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <Link href="/tugas" className="tombol tombol-void">
          Lihat Semua Tugas
        </Link>
      </div>
    </section>
  );
}
