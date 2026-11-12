import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutSitus({ children }) {
  return (
    <>
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-timer focus:px-4 focus:py-3 focus:font-bold focus:text-void"
      >
        Lewati ke isi halaman
      </a>
      <Navbar />
      <main id="isi" className="min-h-[70vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
