// Pemeriksaan Basic Auth. Username bebas, password = env ADMIN_PASSWORD.
// Murni JavaScript standar supaya jalan di proxy/middleware maupun server.

function samaAman(a, b) {
  let selisih = a.length ^ b.length;
  const panjang = Math.max(a.length, b.length);
  for (let i = 0; i < panjang; i++) {
    selisih |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return selisih === 0;
}

export function cekBasicAuth(header) {
  const sandi = process.env.ADMIN_PASSWORD;
  if (!sandi || !header) return false;

  const [skema, kode] = header.split(' ');
  if (!/^basic$/i.test(skema || '') || !kode) return false;

  let teks;
  try {
    const biner = atob(kode);
    const bita = Uint8Array.from(biner, (c) => c.charCodeAt(0));
    teks = new TextDecoder().decode(bita);
  } catch {
    return false;
  }

  const posisi = teks.indexOf(':');
  if (posisi < 0) return false;
  return samaAman(teks.slice(posisi + 1), sandi);
}
