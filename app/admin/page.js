import Link from 'next/link';
import FormTugas from '@/components/FormTugas';
import TombolHapus from '@/components/TombolHapus';
import { hapusTugas } from './actions';
import { ambilSemuaTugas } from '@/lib/tugas';

export const dynamic = 'force-dynamic';

export default async function HalamanAdmin({ searchParams }) {
  const { pesan, galat } = await searchParams;

  let daftar = [];
  let galatDb = null;
  try {
    daftar = await ambilSemuaTugas();
  } catch (err) {
    console.error('Gagal membaca database (admin):', err);
    galatDb = err.message;
  }

  return (
    <div>
      <h1>Admin: Kelola Tugas</h1>
      <p>
        <Link href="/">Lihat situs</Link>
      </p>

      {pesan && <p className="ok">{pesan}</p>}
      {galat && <p className="galat">{galat}</p>}
      {galatDb && (
        <p className="galat">
          Database belum bisa dibaca: {galatDb}. Pastikan DATABASE_URL ada dan schema.sql
          sudah dijalankan.
        </p>
      )}

      <h2>Tambah tugas</h2>
      <FormTugas />

      <h2>Daftar tugas ({daftar.length})</h2>
      <div className="gulir">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Diunggah (WIB)</th>
              <th>File</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftar.length === 0 && (
              <tr>
                <td colSpan={5}>Belum ada tugas.</td>
              </tr>
            )}
            {daftar.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.judul}</td>
                <td>{t.tanggalJam}</td>
                <td>{t.fileName || '-'}</td>
                <td>
                  <Link href={`/tugas/${t.id}`}>Lihat</Link>{' '}
                  <Link href={`/admin/${t.id}`}>Edit</Link>
                  <form action={hapusTugas} style={{ display: 'inline', marginLeft: 8 }}>
                    <input type="hidden" name="id" value={t.id} />
                    <TombolHapus judul={t.judul} />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
