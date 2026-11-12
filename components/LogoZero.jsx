// Lambang kecil: lingkaran bercahaya (Color Timer) dengan dua pita merah-biru.
export default function LogoZero({ ukuran = 44 }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="19" fill="none" stroke="#c3cddc" strokeWidth="3" />
      <circle cx="32" cy="32" r="12" fill="#ffc21a" />
      <path d="M6 54 L26 54 L32 46 L12 46 Z" fill="#c81e32" />
      <path d="M58 10 L38 10 L32 18 L52 18 Z" fill="#1647c8" />
    </svg>
  );
}
