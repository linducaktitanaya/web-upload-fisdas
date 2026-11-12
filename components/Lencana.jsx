const WARNA = {
  baru: 'bg-merah text-white',
  dokumen: 'bg-zamrud text-white',
  netral: 'bg-void text-white',
};

export default function Lencana({ jenis = 'netral', children }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 font-display text-base font-bold ${WARNA[jenis]}`}
    >
      {children}
    </span>
  );
}
