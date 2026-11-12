'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const aktif = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={aktif ? 'page' : undefined}
      className={`inline-flex min-h-12 items-center px-5 font-display text-lg font-bold ${
        aktif ? 'bg-timer text-void' : 'text-white hover:bg-white/15'
      }`}
    >
      {children}
    </Link>
  );
}
