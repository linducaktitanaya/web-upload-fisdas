import Link from 'next/link';
import { notFound } from 'next/navigation';
import Lencana from '@/components/Lencana';
import PembacaDokumen from '@/components/PembacaDokumen';
import PesanKosong from '@/components/PesanKosong';
import { ambilTugas } from '@/lib/tugas';
import { urlOffice } from '@/lib/office';

export const dynamic = 'force-dynamic';

async function muatTugas(id) {
  if (!/^\d+$/.test(id)) return { tugas: null };
  try {
    return { tugas: await ambilTugas(Number(id)) };
  } catch (err) {
    console.error('Gagal membaca database (detail tugas):', err);
    return { tugas: null, galat: true };
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { tugas } = await muatTugas(id);
  return { title: tugas ? tugas.judul : 'Tugas' };
}

function linkAman(url) {
  return /^https?:\/\//i.test(url || '') ? url : null;
}

export default async function DetailTugas({ params }) {
  const { id } = await params;
  const { tugas, galat } = await muatTugas(id);

  if (galat) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-10">
        <PesanKosong galat judul="Data tugas belum bisa dimuat">
          <p>Coba muat ulang halaman ini beberapa saat lagi.</p>
        </PesanKosong>
      </div>
    );
  }
  if (!tugas) notFound();

  const apiUrl = `/api/berkas/${tugas.id}`;
  const bukaDiTabBaru =
    tugas.jenis === 'pdf' || tugas.jenis === 'gambar'
      ? tugas.jenis === 'pdf'
        ? apiUrl
        : tugas.fileUrl
      : urlOffice(tugas.fileUrl);
  const link = linkAman(tugas.link);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <Link href="/tugas" className="tombol tombol-void">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
        Kembali ke Daftar Tugas
      </Link>

      <article className="kartu mt-6">
        <div className="kartu__isi p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {tugas.baru && <Lencana jenis="baru">Baru</Lencana>}
            {tugas.adaDokumen && <Lencana jenis="dokumen">{tugas.jenisLabel || 'Dokumen'}</Lencana>}
          </div>
          <h1 className="mt-3 break-words font-display text-3xl font-bold leading-tight text-void sm:text-4xl">
            {tugas.judul}
          </h1>
          <p className="mt-2 text-lg text-tinta/80">Diunggah pada {tugas.tanggalJam}</p>

          {tugas.deskripsi && (
            <p className="mt-5 max-w-prose whitespace-pre-line text-lg">{tugas.deskripsi}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {tugas.adaDokumen && (
              <>
                <a
                  href={bukaDiTabBaru}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tombol tombol-biru"
                >
                  Buka di tab baru
                </a>
                <a href={`${apiUrl}?unduh=1`} download className="tombol tombol-merah">
                  Unduh
                </a>
              </>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="tombol tombol-void">
                Buka tautan terkait
              </a>
            )}
          </div>
        </div>
      </article>

      <section className="mt-10" aria-labelledby="judul-dokumen">
        <h2 id="judul-dokumen" className="judul-bagian">
          Dokumen
        </h2>
        <div className="mt-5">
          <PembacaDokumen tugas={tugas} />
        </div>
      </section>
    </div>
  );
}
