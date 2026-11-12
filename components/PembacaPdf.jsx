'use client';

import { useEffect, useRef, useState } from 'react';

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const LANGKAH = 0.25;

// Satu halaman PDF = satu canvas. Dirender hanya saat mendekati layar (hemat memori HP).
function HalamanPdf({ pdf, nomor, lebar }) {
  const wadahRef = useRef(null);
  const canvasRef = useRef(null);
  const tugasRef = useRef(null);
  const [terlihat, setTerlihat] = useState(false);
  const [tinggi, setTinggi] = useState(null);

  useEffect(() => {
    const el = wadahRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setTerlihat(true);
      return undefined;
    }
    const pengamat = new IntersectionObserver(
      ([entri]) => {
        if (entri.isIntersecting) {
          setTerlihat(true);
          pengamat.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );
    pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  useEffect(() => {
    if (!terlihat || lebar < 50) return undefined;
    let batal = false;

    (async () => {
      // tunggu render sebelumnya (jika ada) selesai dibatalkan
      if (tugasRef.current) {
        try {
          await tugasRef.current.promise;
        } catch {
          /* dibatalkan, abaikan */
        }
      }
      if (batal) return;

      const halaman = await pdf.getPage(nomor);
      if (batal) return;
      const dasar = halaman.getViewport({ scale: 1 });
      const viewport = halaman.getViewport({ scale: lebar / dasar.width });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      setTinggi(Math.floor(viewport.height));

      const tugas = halaman.render({
        canvasContext: canvas.getContext('2d'),
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      tugasRef.current = tugas;
      await tugas.promise;
    })().catch((err) => {
      if (err && err.name === 'RenderingCancelledException') return;
      console.error('Gagal merender halaman PDF', nomor, err);
    });

    return () => {
      batal = true;
      if (tugasRef.current) tugasRef.current.cancel();
    };
  }, [terlihat, pdf, nomor, lebar]);

  return (
    <div
      ref={wadahRef}
      className="mx-auto mb-4 border-2 border-void bg-white"
      style={{ width: lebar, height: tinggi ?? Math.round(lebar * 1.414) }}
    >
      <canvas ref={canvasRef} className="block" aria-label={`Halaman ${nomor}`} role="img" />
    </div>
  );
}

export default function PembacaPdf({ sumber, cadanganUrl, judul }) {
  const ukurRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [status, setStatus] = useState('memuat'); // memuat | siap | galat
  const [zoom, setZoom] = useState(1);
  const [lebarDasar, setLebarDasar] = useState(0);

  // Ukur lebar layar yang tersedia supaya halaman PDF selalu selebar layar.
  useEffect(() => {
    const el = ukurRef.current;
    if (!el) return undefined;
    const ukur = () => setLebarDasar(Math.floor(el.clientWidth));
    ukur();
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  // Muat pdf.js (versi "legacy" agar jalan juga di HP lama) lalu buka dokumennya.
  useEffect(() => {
    let batal = false;
    let tugasMuat = null;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString();

        tugasMuat = pdfjs.getDocument({ url: sumber, isEvalSupported: false });
        const dokumen = await tugasMuat.promise;
        if (batal) {
          dokumen.destroy();
          return;
        }
        setPdf(dokumen);
        setStatus('siap');
      } catch (err) {
        console.error('pdf.js gagal dimuat:', err);
        if (!batal) setStatus('galat');
      }
    })();

    return () => {
      batal = true;
      if (tugasMuat && tugasMuat.destroy) tugasMuat.destroy();
    };
  }, [sumber]);

  const lebar = Math.round(lebarDasar * zoom);
  const persen = Math.round(zoom * 100);

  return (
    <div>
      {status === 'galat' ? (
        <div>
          <p role="alert" className="mb-3 border-l-8 border-merah bg-white p-4 text-lg">
            Pembaca di halaman tidak bisa dimuat. Ini tampilan cadangan. Jika masih kosong,
            pakai tombol <strong>Buka di tab baru</strong> atau <strong>Unduh</strong>.
          </p>
          <iframe
            src={cadanganUrl}
            title={`Dokumen PDF: ${judul}`}
            className="h-[80vh] w-full border-4 border-void bg-white"
          />
        </div>
      ) : (
        <>
          <div className="gelap sticky top-0 z-30 flex flex-wrap items-center gap-3 bg-void p-3 text-white">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - LANGKAH).toFixed(2)))}
              disabled={status !== 'siap' || zoom <= ZOOM_MIN}
              className="tombol tombol-putih disabled:opacity-50"
            >
              Perkecil
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + LANGKAH).toFixed(2)))}
              disabled={status !== 'siap' || zoom >= ZOOM_MAX}
              className="tombol disabled:opacity-50"
              style={{ background: 'var(--color-timer)', color: 'var(--color-void)' }}
            >
              Perbesar
            </button>
            <p className="text-base" role="status">
              {status === 'siap' ? (
                <>
                  <strong>{pdf.numPages}</strong> halaman, perbesaran <strong>{persen}%</strong>
                </>
              ) : (
                'Memuat dokumen...'
              )}
            </p>
          </div>

          <div className="overflow-x-auto bg-void/10 p-2">
            <div ref={ukurRef} className="w-full">
              {status === 'siap' &&
                lebar > 0 &&
                Array.from({ length: pdf.numPages }, (_, i) => (
                  <HalamanPdf key={i + 1} pdf={pdf} nomor={i + 1} lebar={lebar} />
                ))}
              {status === 'memuat' && (
                <div className="grid min-h-60 place-items-center text-lg">
                  Sedang membuka dokumen, mohon tunggu...
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
