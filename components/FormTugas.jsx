'use client';

import { useActionState, useState } from 'react';
import { simpanTugas } from '@/app/admin/actions';
import { ACCEPT, BATAS_BYTE } from '@/lib/jenis-berkas';

// Form polos untuk tambah dan ubah tugas.
export default function FormTugas({ tugas }) {
  const [state, formAction, menyimpan] = useActionState(simpanTugas, { error: null });
  const [peringatan, setPeringatan] = useState('');
  const nilai = state.nilai || {};

  function periksaFile(e) {
    const f = e.target.files && e.target.files[0];
    if (f && f.size > BATAS_BYTE) {
      setPeringatan('File lebih dari 4 MB, tidak bisa diunggah. Pilih file yang lebih kecil.');
      e.target.value = '';
    } else {
      setPeringatan('');
    }
  }

  return (
    <form action={formAction}>
      {tugas && <input type="hidden" name="id" value={tugas.id} />}

      {state.error && (
        <p className="galat" role="alert">
          {state.error}
        </p>
      )}

      <label htmlFor="judul">Judul (wajib)</label>
      <input
        id="judul"
        name="judul"
        type="text"
        required
        maxLength={200}
        defaultValue={nilai.judul ?? (tugas ? tugas.judul : '')}
      />

      <label htmlFor="deskripsi">Deskripsi</label>
      <textarea
        id="deskripsi"
        name="deskripsi"
        rows={5}
        defaultValue={nilai.deskripsi ?? (tugas ? tugas.deskripsi : '')}
      />

      <label htmlFor="link">Link (opsional)</label>
      <input
        id="link"
        name="link"
        type="text"
        placeholder="https://..."
        defaultValue={nilai.link ?? (tugas ? tugas.link : '')}
      />

      <label htmlFor="file">
        File (PDF, Word, PowerPoint, Excel, atau gambar; maksimal 4 MB)
      </label>
      <input id="file" name="file" type="file" accept={ACCEPT} onChange={periksaFile} />
      {peringatan && <p className="galat">{peringatan}</p>}

      {tugas && tugas.adaDokumen && (
        <>
          <p>
            File saat ini: <strong>{tugas.fileName}</strong>. Kosongkan kolom file di atas
            untuk mempertahankannya, atau pilih file baru untuk menggantinya (file lama
            otomatis dihapus).
          </p>
          <label>
            <input type="checkbox" name="hapus_file" /> Hapus file saat ini tanpa menggantinya
          </label>
        </>
      )}

      <p style={{ marginTop: 16 }}>
        <button type="submit" disabled={menyimpan}>
          {menyimpan ? 'Menyimpan... (mengunggah file, mohon tunggu)' : tugas ? 'Simpan perubahan' : 'Tambah tugas'}
        </button>
      </p>
    </form>
  );
}
