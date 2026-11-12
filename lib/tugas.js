import { query } from './db';
import { formatTanggal, formatTanggalJam } from './format';
import { jenisDariNama } from './jenis-berkas';

const HARI_LABEL_BARU = 3; // label "Baru" untuk tugas yang diunggah <= 3 hari lalu
const HARI_FILTER_TERBARU = 7; // filter "Terbaru 7 hari terakhir"

const KOLOM = 'id, judul, deskripsi, link, file_url, file_name, created_at';

// Mengubah baris database menjadi objek sederhana yang aman dikirim ke browser.
function siapkan(r) {
  const dibuat = new Date(r.created_at);
  const umurHari = (Date.now() - dibuat.getTime()) / 86400000;
  const jenis = r.file_url ? jenisDariNama(r.file_name || r.file_url) : null;
  return {
    id: r.id,
    judul: r.judul,
    deskripsi: r.deskripsi || '',
    link: r.link || '',
    fileUrl: r.file_url || '',
    fileName: r.file_name || '',
    adaDokumen: Boolean(r.file_url),
    jenis: jenis ? jenis.kode : null,
    jenisLabel: jenis ? jenis.label : null,
    dibuat: dibuat.toISOString(),
    tanggal: formatTanggal(dibuat),
    tanggalJam: formatTanggalJam(dibuat),
    baru: umurHari <= HARI_LABEL_BARU,
    tujuhHari: umurHari <= HARI_FILTER_TERBARU,
  };
}

export async function ambilSemuaTugas() {
  const { rows } = await query(
    `SELECT ${KOLOM} FROM tugas ORDER BY created_at DESC, id DESC`
  );
  return rows.map(siapkan);
}

export async function ambilTugasTerbaru(jumlah = 3) {
  const { rows } = await query(
    `SELECT ${KOLOM} FROM tugas ORDER BY created_at DESC, id DESC LIMIT $1`,
    [jumlah]
  );
  return rows.map(siapkan);
}

export async function ambilRingkasan() {
  const { rows } = await query(
    'SELECT COUNT(*)::int AS jumlah, MAX(created_at) AS terakhir FROM tugas'
  );
  const r = rows[0];
  return {
    jumlah: r.jumlah,
    terakhir: r.terakhir ? formatTanggal(r.terakhir) : null,
  };
}

export async function ambilTugas(id) {
  const { rows } = await query(`SELECT ${KOLOM} FROM tugas WHERE id = $1`, [id]);
  return rows[0] ? siapkan(rows[0]) : null;
}

// ---- khusus admin ----

export async function tambahTugas({ judul, deskripsi, link, fileUrl, fileName }) {
  const { rows } = await query(
    `INSERT INTO tugas (judul, deskripsi, link, file_url, file_name)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [judul, deskripsi || null, link || null, fileUrl || null, fileName || null]
  );
  return rows[0].id;
}

export async function ubahTugas(id, { judul, deskripsi, link, fileUrl, fileName }) {
  await query(
    `UPDATE tugas
        SET judul = $2, deskripsi = $3, link = $4, file_url = $5, file_name = $6
      WHERE id = $1`,
    [id, judul, deskripsi || null, link || null, fileUrl || null, fileName || null]
  );
}

// Mengembalikan file_url lama (atau null) supaya bisa dihapus dari Blob.
export async function hapusTugasDb(id) {
  const { rows } = await query(
    'DELETE FROM tugas WHERE id = $1 RETURNING file_url',
    [id]
  );
  return rows[0] ? rows[0].file_url : null;
}

export async function ambilMentah(id) {
  const { rows } = await query(`SELECT ${KOLOM} FROM tugas WHERE id = $1`, [id]);
  return rows[0] || null;
}
