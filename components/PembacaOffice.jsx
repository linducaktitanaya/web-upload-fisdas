import { urlOffice } from '@/lib/office';

// Word, PowerPoint, dan Excel dibuka lewat Office online viewer milik Microsoft.
export default function PembacaOffice({ fileUrl, judul }) {
  return (
    <div>
      <iframe
        src={urlOffice(fileUrl)}
        title={`Dokumen: ${judul}`}
        className="h-[75vh] min-h-[480px] w-full border-4 border-void bg-white"
        loading="lazy"
      />
      <p className="mt-3 text-base">
        Jika dokumen tidak tampil, pakai tombol <strong>Unduh</strong> di atas lalu buka
        di perangkatmu.
      </p>
    </div>
  );
}
