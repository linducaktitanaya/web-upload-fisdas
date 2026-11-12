'use client';

export default function GalatAdmin({ error, reset }) {
  return (
    <div>
      <h1>Terjadi masalah di halaman admin</h1>
      <p>Cek koneksi database (DATABASE_URL) dan pastikan tabel sudah dibuat dengan schema.sql.</p>
      <p className="kecil">Kode: {error && error.digest ? error.digest : '-'}</p>
      <button type="button" onClick={() => reset()}>
        Coba lagi
      </button>
    </div>
  );
}
