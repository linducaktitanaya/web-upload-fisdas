import JudulBagian from './JudulBagian';
import { profil } from '@/lib/profil';

export default function Tentang() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16" aria-labelledby="judul-tentang">
      <JudulBagian id="judul-tentang">Tentang saya</JudulBagian>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="max-w-prose space-y-4 text-lg">
          {profil.tentang.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="kartu self-start">
          <dl className="kartu__isi space-y-4 p-6">
            {profil.fakta.map((f) => (
              <div key={f.label}>
                <dt className="font-display text-base font-bold text-biru">{f.label}</dt>
                <dd className="text-lg">{f.isi}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
