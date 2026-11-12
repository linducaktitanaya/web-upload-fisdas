// Lingkaran bercahaya bergaya "Color Timer". Angka di tengah = jumlah tugas.
export default function TimerWarna({ jumlah }) {
  const garis = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <div className="timer-glow relative mx-auto size-52">
      <svg viewBox="0 0 200 200" className="absolute inset-0" aria-hidden="true">
        <circle cx="100" cy="100" r="94" fill="#07122e" stroke="#c3cddc" strokeWidth="6" />
        {garis.map((sudut) => (
          <line
            key={sudut}
            x1="100"
            y1="14"
            x2="100"
            y2="26"
            stroke="#c3cddc"
            strokeWidth="4"
            transform={`rotate(${sudut} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="62" fill="none" stroke="#ffc21a" strokeWidth="14" />
        <circle cx="100" cy="100" r="50" fill="#0d1d4a" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-6xl font-bold leading-none text-timer">
          {jumlah ?? '-'}
        </span>
      </div>
    </div>
  );
}
