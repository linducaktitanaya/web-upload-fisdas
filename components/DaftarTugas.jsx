'use client';

import { useMemo, useState } from 'react';
import KartuTugas from './KartuTugas';
import PesanKosong from './PesanKosong';

const FILTER = [
  { kode: 'semua', label: 'Semua' },
  { kode: 'baru', label: 'Terbaru 7 hari terakhir' },
  { kode: 'dokumen', label: 'Ada dokumen' },
];

export default function DaftarTugas({ tugas }) {
  const [cari, setCari] = useState('');
  const [filter, setFilter] = useState('semua');

  const hasil = useMemo(() => {
    const kata = cari.trim().toLowerCase();
    return tugas.filter((t) => {
      if (filter === 'baru' && !t.tujuhHari) return false;
      if (filter === 'dokumen' && !t.adaDokumen) return false;
      if (!kata) return true;
      return `${t.judul} ${t.deskripsi}`.toLowerCase().includes(kata);
    });
  }, [tugas, cari, filter]);

  function aturUlang() {
    setCari('');
    setFilter('semua');
  }

  return (
    <div>
      <div className="kartu">
        <div className="kartu__isi space-y-5 p-5 sm:p-6">
          <div>
            <label htmlFor="cari-tugas" className="font-display text-lg font-bold text-void">
              Cari tugas
            </label>
            <input
              id="cari-tugas"
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Ketik judul atau kata kunci"
              className="isian mt-2"
              autoComplete="off"
            />
          </div>
          <div role="group" aria-label="Filter tugas">
            <p className="font-display text-lg font-bold text-void">Tampilkan</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {FILTER.map((f) => (
                <button
                  key={f.kode}
                  type="button"
                  className="chip"
                  aria-pressed={filter === f.kode}
                  onClick={() => setFilter(f.kode)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-lg" role="status" aria-live="polite">
        Menampilkan <strong>{hasil.length}</strong> dari <strong>{tugas.length}</strong> tugas,
        dari yang paling baru.
      </p>

      <div className="mt-4">
        {tugas.length === 0 ? (
          <PesanKosong judul="Belum ada tugas yang diunggah">
            <p>Tugas akan muncul di sini setelah diunggah.</p>
          </PesanKosong>
        ) : hasil.length === 0 ? (
          <PesanKosong judul="Tidak ada tugas yang cocok">
            <p>Coba kata kunci lain, atau tampilkan semua tugas.</p>
            <button type="button" onClick={aturUlang} className="tombol tombol-biru mt-4">
              Tampilkan semua tugas
            </button>
          </PesanKosong>
        ) : (
          <ol className="space-y-5">
            {hasil.map((t) => (
              <li key={t.id}>
                <KartuTugas tugas={t} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
