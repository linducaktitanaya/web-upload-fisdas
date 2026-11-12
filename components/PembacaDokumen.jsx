import PembacaPdf from './PembacaPdf';
import PembacaOffice from './PembacaOffice';
import PembacaGambar from './PembacaGambar';
import PesanKosong from './PesanKosong';

// Memilih pembaca yang cocok dengan jenis file tugas.
export default function PembacaDokumen({ tugas }) {
  if (!tugas.adaDokumen) {
    return (
      <PesanKosong judul="Tugas ini tidak memiliki dokumen">
        <p>Isi tugas hanya berupa keterangan di atas.</p>
      </PesanKosong>
    );
  }

  const apiUrl = `/api/berkas/${tugas.id}`;

  switch (tugas.jenis) {
    case 'pdf':
      return <PembacaPdf sumber={apiUrl} cadanganUrl={apiUrl} judul={tugas.judul} />;
    case 'gambar':
      return <PembacaGambar src={tugas.fileUrl} judul={tugas.judul} />;
    case 'word':
    case 'powerpoint':
    case 'excel':
      return <PembacaOffice fileUrl={tugas.fileUrl} judul={tugas.judul} />;
    default:
      return (
        <PesanKosong judul="Jenis dokumen ini tidak bisa dibaca di halaman">
          <p>Silakan pakai tombol Unduh di atas.</p>
        </PesanKosong>
      );
  }
}
