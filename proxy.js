import { NextResponse } from 'next/server';
import { cekBasicAuth } from '@/lib/basic-auth';

// Di Next.js 16, "middleware" diganti namanya menjadi "proxy" (fungsinya sama).
// Semua alamat /admin dilindungi Basic Auth.
export function proxy(request) {
  if (!process.env.ADMIN_PASSWORD) {
    return new NextResponse(
      'ADMIN_PASSWORD belum diatur. Tambahkan di Vercel > Settings > Environment Variables, lalu redeploy.',
      { status: 500 }
    );
  }

  if (!cekBasicAuth(request.headers.get('authorization'))) {
    return new NextResponse('Perlu login admin.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Portofolio", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
