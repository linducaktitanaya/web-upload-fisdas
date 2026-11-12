# Portofolio Tugas Kuliah - Lindu Cakti Tanaya

Next.js 16 (App Router, JavaScript) + Tailwind CSS v4 + Neon Postgres (driver `pg`) + Vercel Blob (Public), di-hosting di Vercel.

## Isi situs
- `/` Beranda: perkenalan, ringkasan jumlah tugas, tugas terbaru, tentang saya, kontak.
- `/tugas` Daftar Tugas: pencarian, filter, urut dari yang terbaru.
- `/tugas/[id]` Detail tugas dengan pembaca dokumen langsung (PDF, Word, PowerPoint, Excel, gambar).
- `/admin` Halaman admin (Basic Auth): tambah, ubah, hapus tugas. Username bebas, password = `ADMIN_PASSWORD`.

---

# PANDUAN DEPLOY DARI NOL

## Langkah 0 - Siapkan
1. Buat akun di https://github.com (gratis).
2. Buka https://vercel.com, klik **Sign Up**, pilih **Continue with GitHub**.
3. Ekstrak (unzip) file zip ini di komputermu.

## Langkah 1 - Buat repository di GitHub
1. Di GitHub klik tanda **+** di kanan atas, lalu **New repository**.
2. Isi **Repository name**: `portofolio-tugas`. Pilih **Public** atau **Private** (keduanya boleh).
3. **Jangan** centang "Add a README". Klik **Create repository**.
4. Di halaman berikutnya klik tautan **uploading an existing file**.
5. Buka folder hasil ekstrak, **masuk ke dalam folder `portofolio-tugas`**, pilih SEMUA isinya (Ctrl+A), lalu seret ke kotak unggah di GitHub.
   - Yang harus terunggah: folder `app`, `components`, `lib`, dan file `package.json`, `next.config.js`, `proxy.js`, `schema.sql`, dll.
   - **Penting:** `package.json` harus berada di barisan paling atas repo, bukan di dalam sebuah folder.
   - File berawalan titik (`.gitignore`, `.env.example`) kadang tersembunyi. Di Mac tekan `Cmd + Shift + .` untuk menampilkannya. Di Windows: Lihat > Tampilkan > Item tersembunyi.
6. Tunggu semua file selesai terunggah, tulis pesan "unggah pertama", klik **Commit changes**.
   - Jika GitHub membatasi jumlah file per unggahan, unggah dua kali (misalnya folder `app` dulu, lalu sisanya).

## Langkah 2 - Import ke Vercel
1. Di Vercel klik **Add New...** > **Project**.
2. Pada daftar repo, cari `portofolio-tugas`, klik **Import**.
3. **Framework Preset** harus terisi **Next.js** otomatis. Biarkan pengaturan lain.
4. Buka bagian **Environment Variables**, tambahkan:
   - Name: `ADMIN_PASSWORD`, Value: sandi rahasia pilihanmu (panjang dan sulit ditebak).
5. Klik **Deploy**. Tunggu sampai muncul tampilan "Congratulations".
   (Situs sudah terbuka, tetapi isinya masih belum bisa dimuat karena database belum ada. Itu normal.)

## Langkah 3 - Tambah database Neon
1. Di halaman project Vercel, buka tab **Storage**.
2. Klik **Create Database**, pilih **Neon** (Postgres), lanjutkan sampai selesai (pilih paket Free).
3. Pastikan database **tersambung ke project ini** untuk semua environment (Production, Preview, Development).
4. Vercel otomatis menambahkan `DATABASE_URL`. Cek di **Settings > Environment Variables**.

## Langkah 4 - Tambah Vercel Blob (penyimpanan file)
1. Masih di tab **Storage**, klik **Create Database** lagi, pilih **Blob**.
2. Pada pilihan akses, pilih **Public**. (Tidak bisa diubah setelah dibuat.)
3. Sambungkan ke project ini. Vercel otomatis menambahkan `BLOB_READ_WRITE_TOKEN` atau `BLOB_STORE_ID`.

## Langkah 5 - Jalankan SQL pembuat tabel
1. Di tab **Storage**, klik database Neon kamu, lalu **Open in Neon** (atau tombol sejenis).
2. Di Neon, buka **SQL Editor**.
3. Buka file `schema.sql` dari repo/zip, salin seluruh isinya, tempel ke SQL Editor, klik **Run**.
4. Muncul pesan sukses = tabel `tugas` sudah dibuat. (Aman dijalankan ulang.)

## Langkah 6 - Redeploy (wajib)
Perubahan environment variable baru dipakai setelah deploy ulang.
1. Buka tab **Deployments**.
2. Pada deployment paling atas klik tanda **...** > **Redeploy** > **Redeploy**.
3. Setelah selesai, klik **Visit** untuk membuka situs.

## Langkah 7 - Unggah tugas pertama
1. Buka `alamat-situsmu.vercel.app/admin`.
2. Muncul kotak login: **username bebas** (misalnya `admin`), **password** = nilai `ADMIN_PASSWORD`.
3. Isi judul (wajib), deskripsi, link (opsional), pilih file (maksimal 4 MB), klik **Tambah tugas**.
4. Buka Beranda dan Daftar Tugas untuk melihat hasilnya.

## Mengubah isi Beranda
Edit file `lib/profil.js` langsung di GitHub (ikon pensil), lalu **Commit changes**. Vercel otomatis deploy ulang.

---

# MENGATASI ERROR UMUM

| Gejala | Penyebab | Solusi |
|---|---|---|
| Layar "Application error: a server-side exception has occurred" | Hampir selalu: database belum siap | 1) Vercel > project > **Logs**, lihat pesan merahnya. 2) Jika "relation \"tugas\" does not exist": jalankan `schema.sql` (Langkah 5). 3) Jika "DATABASE_URL belum diatur": sambungkan Neon (Langkah 3). 4) Setelah memperbaiki, **Redeploy**. |
| "No blob credentials found" / "BLOB_READ_WRITE_TOKEN is not defined" | Blob belum dibuat atau belum tersambung ke project, atau belum redeploy | Buat Blob **Public** di tab Storage, pastikan tersambung ke project ini, cek `BLOB_READ_WRITE_TOKEN` (atau `BLOB_STORE_ID`) ada di Environment Variables, lalu **Redeploy**. |
| Layar "ADMIN_PASSWORD belum diatur" di /admin | Variabel belum ada | Tambahkan `ADMIN_PASSWORD` di Settings > Environment Variables, lalu **Redeploy**. |
| Login admin selalu ditolak | Password salah (huruf besar/kecil) atau belum redeploy | Samakan dengan `ADMIN_PASSWORD`. Username boleh apa saja. |
| "password authentication failed" / "ECONNREFUSED" / timeout | `DATABASE_URL` salah atau Neon tertidur | Pastikan `DATABASE_URL` hasil Neon dari Vercel (jangan diketik manual), lalu muat ulang. |
| Upload gagal / "Body exceeded" / error 413 | File lebih dari 4 MB | Kecilkan file (kompres PDF, perkecil gambar). |
| Build gagal: "No Next.js version detected" | `package.json` ada di dalam folder, bukan di barisan atas repo | Pindahkan isi folder ke barisan atas repo (atau unggah ulang isinya), lalu redeploy. |
| Situs meminta login Vercel | Deployment Protection aktif | Vercel > Settings > Deployment Protection, matikan untuk Production. |
| PDF kosong di HP | Koneksi lambat atau pdf.js gagal | Tunggu sebentar; jika gagal, otomatis tampil cadangan. Bisa juga pakai tombol **Buka di tab baru** atau **Unduh**. |
| Word/PowerPoint/Excel tidak tampil | Office viewer hanya bisa membuka file Blob yang Public | Pastikan Blob dibuat dengan akses **Public**. Atau pakai tombol Unduh. |
| Perubahan env var tidak berpengaruh | Belum redeploy | Selalu **Redeploy** setelah mengubah env var. |

Catatan teknis: di Next.js 16 berkas `middleware.js` bernama `proxy.js`; fungsinya sama (melindungi `/admin` dengan Basic Auth).
