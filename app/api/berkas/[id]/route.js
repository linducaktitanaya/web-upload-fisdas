import { ambilTugas } from '@/lib/tugas';
import { jenisDariNama } from '@/lib/jenis-berkas';

export const dynamic = 'force-dynamic';

// Meneruskan file dari Vercel Blob lewat alamat situs sendiri (same-origin),
// sehingga pdf.js tidak terkena masalah CORS.
export async function GET(request, { params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return new Response('Berkas tidak ditemukan.', { status: 404 });
  }

  let tugas;
  try {
    tugas = await ambilTugas(Number(id));
  } catch (err) {
    console.error('Gagal membaca database (berkas):', err);
    return new Response('Data belum bisa dimuat.', { status: 500 });
  }
  if (!tugas || !tugas.fileUrl) {
    return new Response('Berkas tidak ditemukan.', { status: 404 });
  }

  let hulu;
  try {
    hulu = await fetch(tugas.fileUrl, { cache: 'no-store' });
  } catch (err) {
    console.error('Gagal mengambil file dari Blob:', err);
    return new Response('File belum bisa diambil.', { status: 502 });
  }
  if (!hulu.ok || !hulu.body) {
    return new Response('File belum bisa diambil.', { status: 502 });
  }

  const jenis = jenisDariNama(tugas.fileName || tugas.fileUrl);
  const unduh = new URL(request.url).searchParams.get('unduh') === '1';
  const nama = tugas.fileName || 'berkas';
  const namaAscii = nama.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');

  const header = new Headers({
    'Content-Type':
      (jenis && jenis.mime) || hulu.headers.get('content-type') || 'application/octet-stream',
    'Content-Disposition': `${unduh ? 'attachment' : 'inline'}; filename="${namaAscii}"; filename*=UTF-8''${encodeURIComponent(nama)}`,
    'Cache-Control': 'public, max-age=300',
    'X-Content-Type-Options': 'nosniff',
  });
  const panjang = hulu.headers.get('content-length');
  if (panjang) header.set('Content-Length', panjang);

  return new Response(hulu.body, { status: 200, headers: header });
}
