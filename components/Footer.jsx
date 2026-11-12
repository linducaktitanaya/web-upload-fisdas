import { profil } from '@/lib/profil';

export default function Footer() {
  const tahun = new Date().getFullYear();
  return (
    <footer className="gelap mt-16 bg-void text-perak-tua">
      <div
        aria-hidden="true"
        className="h-1.5"
        style={{
          background:
            'linear-gradient(90deg, var(--color-biru) 0 50%, var(--color-merah) 50% 100%)',
        }}
      />
      <div className="mx-auto max-w-6xl px-5 py-8 text-base">
        <p className="font-display text-lg font-bold text-white">{profil.nama}</p>
        <p>Mahasiswa {profil.jurusan}. Situs ini hanya berisi tugas yang sudah dikumpulkan.</p>
        <p className="mt-2 text-sm">&copy; {tahun} {profil.nama}</p>
      </div>
    </footer>
  );
}
