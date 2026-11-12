import Link from 'next/link';
import Lencana from './Lencana';

export default function KartuTugas({ tugas }) {
  return (
    <article className="kartu h-full">
      <div className="kartu__isi relative flex h-full flex-col p-5 sm:p-6">
        {(tugas.baru || tugas.adaDokumen) && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {tugas.baru && <Lencana jenis="baru">Baru</Lencana>}
            {tugas.adaDokumen && <Lencana jenis="dokumen">{tugas.jenisLabel || 'Dokumen'}</Lencana>}
          </div>
        )}
        <h3 className="font-display text-xl font-bold leading-snug text-void sm:text-2xl">
          <Link
            href={`/tugas/${tugas.id}`}
            className="break-words after:absolute after:inset-0 after:content-[''] hover:underline"
          >
            {tugas.judul}
          </Link>
        </h3>
        <p className="mt-1 text-base text-tinta/80">Diunggah {tugas.tanggal}</p>
        {tugas.deskripsi && (
          <p className="mt-3 line-clamp-3 text-lg text-tinta">{tugas.deskripsi}</p>
        )}
        <span className="mt-auto pt-5 font-display text-lg font-bold text-biru">Buka tugas</span>
      </div>
    </article>
  );
}
