import Link from 'next/link';
import LogoZero from './LogoZero';
import NavLink from './NavLink';
import { profil } from '@/lib/profil';

export default function Navbar() {
  return (
    <header className="gelap bg-void text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2">
        <Link href="/" className="flex items-center gap-3 py-1" aria-label="Ke Beranda">
          <LogoZero />
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold sm:text-xl">{profil.nama}</span>
            <span className="block text-sm text-perak-tua">Portofolio tugas kuliah</span>
          </span>
        </Link>
        <nav aria-label="Menu utama" className="-mx-2 flex">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/tugas">Daftar Tugas</NavLink>
        </nav>
      </div>
      <div
        aria-hidden="true"
        className="h-1.5"
        style={{
          background:
            'linear-gradient(90deg, var(--color-merah) 0 50%, var(--color-biru) 50% 100%)',
        }}
      />
    </header>
  );
}
