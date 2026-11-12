import JudulBagian from './JudulBagian';
import { profil } from '@/lib/profil';

function IkonSurat() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}
function IkonKamera() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}
function IkonKode() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}

export default function Kontak() {
  const daftar = [
    {
      nama: 'Email',
      tulisan: profil.email,
      href: `mailto:${profil.email}`,
      ikon: <IkonSurat />,
      baru: false,
    },
    {
      nama: 'Instagram',
      tulisan: `@${profil.instagram.nama}`,
      href: profil.instagram.url,
      ikon: <IkonKamera />,
      baru: true,
    },
    {
      nama: 'GitHub',
      tulisan: `github.com/${profil.github.nama}`,
      href: profil.github.url,
      ikon: <IkonKode />,
      baru: true,
    },
  ];

  return (
    <section id="kontak" className="mx-auto max-w-6xl scroll-mt-28 px-5 pt-16" aria-labelledby="judul-kontak">
      <JudulBagian id="judul-kontak">Kontak</JudulBagian>
      <p className="mt-4 max-w-prose text-lg">
        Ada pertanyaan tentang salah satu tugas? Silakan hubungi saya lewat salah satu cara ini.
      </p>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {daftar.map((k) => (
          <li key={k.nama}>
            <a
              href={k.href}
              {...(k.baru ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="gelap tombol tombol-void !flex !min-h-24 !w-full !justify-start !gap-4 !px-5 !text-left"
            >
              <span className="text-timer">{k.ikon}</span>
              <span className="min-w-0">
                <span className="block text-base font-semibold text-perak-tua">{k.nama}</span>
                <span className="block break-all text-lg">{k.tulisan}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
