import DaftarTugas from '@/components/DaftarTugas';
import JudulBagian from '@/components/JudulBagian';
import PesanKosong from '@/components/PesanKosong';
import { ambilSemuaTugas } from '@/lib/tugas';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Daftar Tugas' };

export default async function HalamanDaftarTugas() {
  let tugas = [];
  let galat = false;

  try {
    tugas = await ambilSemuaTugas();
  } catch (err) {
    console.error('Gagal membaca database (Daftar Tugas):', err);
    galat = true;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <JudulBagian>Daftar Tugas</JudulBagian>
      <p className="mt-3 text-lg">
        Tanggal yang tampil adalah tanggal tugas diunggah, bukan tenggat pengumpulan.
      </p>
      <div className="mt-6">
        {galat ? (
          <PesanKosong galat judul="Data tugas belum bisa dimuat">
            <p>Coba muat ulang halaman ini beberapa saat lagi.</p>
          </PesanKosong>
        ) : (
          <DaftarTugas tugas={tugas} />
        )}
      </div>
    </div>
  );
}
