import Hero from '@/components/Hero';
import TugasTerbaru from '@/components/TugasTerbaru';
import Tentang from '@/components/Tentang';
import Kontak from '@/components/Kontak';
import { ambilRingkasan, ambilTugasTerbaru } from '@/lib/tugas';

// Data selalu diambil segar dari database.
export const dynamic = 'force-dynamic';

export default async function Beranda() {
  let ringkasan = { jumlah: null, terakhir: null };
  let terbaru = [];
  let galat = false;

  try {
    [ringkasan, terbaru] = await Promise.all([ambilRingkasan(), ambilTugasTerbaru(3)]);
  } catch (err) {
    console.error('Gagal membaca database (Beranda):', err);
    galat = true;
  }

  return (
    <>
      <Hero jumlah={ringkasan.jumlah} terakhir={ringkasan.terakhir} />
      <TugasTerbaru tugas={terbaru} galat={galat} />
      <Tentang />
      <Kontak />
    </>
  );
}
