// Jenis file yang boleh diunggah.
export const BATAS_BYTE = 4 * 1024 * 1024; // 4 MB
export const ACCEPT =
  '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp';

const DAFTAR = {
  pdf: { kode: 'pdf', label: 'PDF', mime: 'application/pdf' },
  doc: { kode: 'word', label: 'Word', mime: 'application/msword' },
  docx: {
    kode: 'word',
    label: 'Word',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  ppt: { kode: 'powerpoint', label: 'PowerPoint', mime: 'application/vnd.ms-powerpoint' },
  pptx: {
    kode: 'powerpoint',
    label: 'PowerPoint',
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
  xls: { kode: 'excel', label: 'Excel', mime: 'application/vnd.ms-excel' },
  xlsx: {
    kode: 'excel',
    label: 'Excel',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  jpg: { kode: 'gambar', label: 'Gambar', mime: 'image/jpeg' },
  jpeg: { kode: 'gambar', label: 'Gambar', mime: 'image/jpeg' },
  png: { kode: 'gambar', label: 'Gambar', mime: 'image/png' },
  gif: { kode: 'gambar', label: 'Gambar', mime: 'image/gif' },
  webp: { kode: 'gambar', label: 'Gambar', mime: 'image/webp' },
};

export function ekstensiDari(nama) {
  const bersih = String(nama || '').split('?')[0];
  const cocok = bersih.match(/\.([a-z0-9]+)$/i);
  return cocok ? cocok[1].toLowerCase() : '';
}

// Mengembalikan { kode, label, mime } atau null bila jenisnya tidak dikenal.
export function jenisDariNama(nama) {
  return DAFTAR[ekstensiDari(nama)] || null;
}
