import Link from 'next/link';
import TimerWarna from './TimerWarna';
import { profil } from '@/lib/profil';

export default function Hero({ jumlah, terakhir }) {
  return (
    <section className="gelap bg-void text-white" aria-labelledby="judul-hero">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[1.15fr_0.85fr]">
        <div className="px-5 py-12 sm:py-16 lg:py-24 lg:pr-10">
          <p className="font-display text-xl font-semibold text-timer">{profil.sapaan}</p>
          <h1
            id="judul-hero"
            className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            Saya {profil.nama}
          </h1>
          <p className="mt-4 inline-block -skew-x-12 bg-biru px-4 py-1">
            <span className="inline-block skew-x-12 font-display text-xl font-bold">
              Mahasiswa {profil.jurusan}
            </span>
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-perak">{profil.perkenalan}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tugas" className="tombol tombol-merah">
              Lihat Daftar Tugas
            </Link>
            <a href="#kontak" className="tombol tombol-putih">
              Hubungi Saya
            </a>
          </div>
        </div>

        <div className="hero-pita flex items-center justify-center px-5 py-12 lg:pl-24">
          <div className="panel-timer w-full max-w-sm px-6 py-8 text-center">
            <TimerWarna jumlah={jumlah} />
            <p className="mt-4 font-display text-xl font-bold">tugas terkumpul</p>
            <p className="mt-3 text-base text-perak-tua">Terakhir diperbarui</p>
            <p className="font-display text-lg font-bold text-timer">
              {terakhir || 'Belum ada tugas'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
