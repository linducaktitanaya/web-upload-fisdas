export default function PesanKosong({ judul, children, galat = false }) {
  return (
    <div
      role={galat ? 'alert' : undefined}
      className={`border-4 border-dashed p-6 text-lg ${
        galat ? 'border-merah bg-white' : 'border-perak-tua bg-white/70'
      }`}
    >
      <p className="font-display text-xl font-bold text-void">{judul}</p>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
