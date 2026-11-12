import { headers } from 'next/headers';
import { cekBasicAuth } from './basic-auth';

// Lapisan pengaman kedua: dipanggil di awal setiap Server Action admin.
export async function wajibAdmin() {
  const h = await headers();
  if (!cekBasicAuth(h.get('authorization'))) {
    throw new Error('Tidak diizinkan.');
  }
}
