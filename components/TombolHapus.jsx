'use client';

export default function TombolHapus({ judul }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(`Hapus tugas "${judul}"? File-nya juga akan dihapus.`)) {
          e.preventDefault();
        }
      }}
    >
      Hapus
    </button>
  );
}
