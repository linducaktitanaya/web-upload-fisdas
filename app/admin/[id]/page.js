import Link from 'next/link';
import { notFound } from 'next/navigation';
import FormTugas from '@/components/FormTugas';
import { ambilTugas } from '@/lib/tugas';

export const dynamic = 'force-dynamic';

export default async function HalamanEdit({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const tugas = await ambilTugas(Number(id));
  if (!tugas) notFound();

  return (
    <div>
      <h1>Edit tugas #{tugas.id}</h1>
      <p>
        <Link href="/admin">Kembali ke admin</Link>
      </p>
      <FormTugas tugas={tugas} />
    </div>
  );
}
