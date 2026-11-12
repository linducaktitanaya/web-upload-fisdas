'use server';

import { put, del } from '@vercel/blob';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { wajibAdmin } from '@/lib/admin-guard';
import { BATAS_BYTE, jenisDariNama } from '@/lib/jenis-berkas';
import { ambilMentah, hapusTugasDb, tambahTugas, ubahTugas } from '@/lib/tugas';

function bersihkanLink(nilai) {
  const teks = String(nilai || '').trim();
  if (!teks) return '';
  const lengkap = /^https?:\/\//i.test(teks) ? teks : `https://${teks}`;
  try {
    const u = new URL(lengkap);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.toString();
  } catch {
    return null;
  }
}

function namaAman(nama) {
  const bersih = String(nama || 'berkas')
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return (bersih || 'berkas').slice(-80);
}

function pesanBlob(err) {
  const pesan = err && err.message ? err.message : String(err);
  if (/token|credential|BLOB_/i.test(pesan)) {
    return 'Vercel Blob belum tersambung ke project ini (BLOB_READ_WRITE_TOKEN atau BLOB_STORE_ID tidak ditemukan). Buat Blob (akses Public) di tab Storage, sambungkan ke project, lalu redeploy.';
  }
  return `Detail: ${pesan}`;
}

async function hapusDariBlob(url) {
  if (!url) return;
  try {
    await del(url);
  } catch (err) {
    console.error('Gagal menghapus file lama dari Blob:', err);
  }
}

// Dipakai untuk tambah (tanpa id) maupun ubah (dengan id).
export async function simpanTugas(_state, formData) {
  await wajibAdmin();

  const idMentah = String(formData.get('id') || '');
  const id = idMentah ? Number(idMentah) : null;
  const judul = String(formData.get('judul') || '').trim();
  const deskripsi = String(formData.get('deskripsi') || '').trim();
  const linkMentah = String(formData.get('link') || '');
  const berkas = formData.get('file');
  const hapusFile = formData.get('hapus_file') === 'on';
  const nilai = { judul, deskripsi, link: linkMentah };

  if (!judul) return { error: 'Judul wajib diisi.', nilai };
  if (judul.length > 200) return { error: 'Judul terlalu panjang (maksimal 200 huruf).', nilai };
  if (id !== null && !Number.isInteger(id)) return { error: 'ID tugas tidak valid.', nilai };

  const link = bersihkanLink(linkMentah);
  if (link === null) {
    return { error: 'Link tidak valid. Contoh: https://contoh.com', nilai };
  }

  let fileBaru = null;
  if (berkas && typeof berkas === 'object' && berkas.size > 0) {
    const jenis = jenisDariNama(berkas.name);
    if (!jenis) {
      return {
        error: 'Jenis file tidak didukung. Pilih PDF, Word, PowerPoint, Excel, atau gambar.',
        nilai,
      };
    }
    if (berkas.size > BATAS_BYTE) {
      return { error: 'Ukuran file lebih dari 4 MB. Kecilkan dulu filenya.', nilai };
    }
    try {
      const blob = await put(`tugas/${namaAman(berkas.name)}`, berkas, {
        access: 'public',
        addRandomSuffix: true,
        contentType: jenis.mime,
      });
      fileBaru = { url: blob.url, nama: berkas.name };
    } catch (err) {
      console.error('Gagal upload ke Blob:', err);
      return { error: `Gagal mengunggah file. ${pesanBlob(err)}`, nilai };
    }
  }

  try {
    if (id !== null) {
      const dataLama = await ambilMentah(id);
      if (!dataLama) {
        if (fileBaru) await hapusDariBlob(fileBaru.url);
        return { error: 'Tugas tidak ditemukan.', nilai };
      }
      let fileUrl = dataLama.file_url;
      let fileName = dataLama.file_name;
      if (fileBaru) {
        fileUrl = fileBaru.url;
        fileName = fileBaru.nama;
      } else if (hapusFile) {
        fileUrl = null;
        fileName = null;
      }
      await ubahTugas(id, { judul, deskripsi, link, fileUrl, fileName });
      // file lama dihapus otomatis bila diganti atau dihapus
      if ((fileBaru || hapusFile) && dataLama.file_url) {
        await hapusDariBlob(dataLama.file_url);
      }
    } else {
      await tambahTugas({
        judul,
        deskripsi,
        link,
        fileUrl: fileBaru ? fileBaru.url : null,
        fileName: fileBaru ? fileBaru.nama : null,
      });
    }
  } catch (err) {
    console.error('Gagal menyimpan ke database:', err);
    if (fileBaru) await hapusDariBlob(fileBaru.url);
    return {
      error: `Gagal menyimpan ke database. Pastikan DATABASE_URL benar dan schema.sql sudah dijalankan. Detail: ${err.message}`,
      nilai,
    };
  }

  revalidatePath('/');
  revalidatePath('/tugas');
  revalidatePath('/admin');
  if (id !== null) revalidatePath(`/tugas/${id}`);
  redirect(`/admin?pesan=${encodeURIComponent(id !== null ? 'Tugas berhasil diubah.' : 'Tugas berhasil ditambahkan.')}`);
}

export async function hapusTugas(formData) {
  await wajibAdmin();
  const id = Number(formData.get('id'));
  if (!Number.isInteger(id)) redirect('/admin?galat=' + encodeURIComponent('ID tidak valid.'));

  let galat = null;
  try {
    const fileUrl = await hapusTugasDb(id);
    await hapusDariBlob(fileUrl); // file di Blob ikut dihapus
  } catch (err) {
    console.error('Gagal menghapus tugas:', err);
    galat = `Gagal menghapus: ${err.message}`;
  }

  revalidatePath('/');
  revalidatePath('/tugas');
  revalidatePath('/admin');
  revalidatePath(`/tugas/${id}`);
  if (galat) redirect(`/admin?galat=${encodeURIComponent(galat)}`);
  redirect(`/admin?pesan=${encodeURIComponent('Tugas berhasil dihapus.')}`);
}
