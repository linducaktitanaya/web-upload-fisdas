import './globals.css';
import { Atkinson_Hyperlegible, Chakra_Petch } from 'next/font/google';

// Atkinson Hyperlegible: huruf yang dirancang agar mudah dibaca (isi teks)
const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson',
  display: 'swap',
});

// Chakra Petch: huruf bersudut bernuansa teknologi (judul dan tombol)
const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Lindu Cakti Tanaya | Portofolio Tugas Kuliah',
    template: '%s | Lindu Cakti Tanaya',
  },
  description:
    'Kumpulan tugas kuliah Lindu Cakti Tanaya, mahasiswa Teknik Elektro. Dokumen bisa dibaca langsung di halaman.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07122e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${atkinson.variable} ${chakra.variable}`}>
      <body>{children}</body>
    </html>
  );
}
