export default function PembacaGambar({ src, judul }) {
  return (
    <div className="border-4 border-void bg-white p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`Gambar tugas: ${judul}`} className="mx-auto h-auto max-w-full" />
    </div>
  );
}
