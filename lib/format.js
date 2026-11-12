// Semua tanggal ditampilkan dalam zona WIB (Asia/Jakarta).
const ZONA = 'Asia/Jakarta';

export function formatTanggal(nilai) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: ZONA,
  }).format(new Date(nilai));
}

export function formatTanggalJam(nilai) {
  const d = new Date(nilai);
  const jam = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: ZONA,
  }).format(d);
  return `${formatTanggal(d)} pukul ${jam} WIB`;
}
