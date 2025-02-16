# Proyek Tiket Event Web

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:
- Node.js (versi 18 atau lebih baru)
- npm (Node Package Manager)

## Pengaturan Proyek

### 1. Kloning Repositori
```bash
git clone https://github.com/nama-pengguna-anda/web_event_ticket.git
cd web_event_ticket
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan
1. Buat file `.env.local` di root proyek
2. Tambahkan variabel lingkungan yang diperlukan (jika ada)

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
- Aplikasi akan tersedia di `http://localhost:3000`
- Menggunakan Next.js dengan Turbopack untuk pengembangan cepat

### 5. Membangun untuk Produksi
```bash
npm run build
```

### 6. Memulai Server Produksi
```bash
npm start
```

## Struktur Proyek
- `src/`: Direktori kode sumber utama
- `public/`: Aset statis
- `next.config.mjs`: Konfigurasi Next.js
- `tailwind.config.mjs`: Konfigurasi Tailwind CSS

## Teknologi yang Digunakan
- Next.js 15
- React 19
- Tailwind CSS
- Axios
- SweetAlert2

## Perintah Tambahan
- `npm run lint`: Jalankan linter
- `npm run build`: Buat build produksi

## Pemecahan Masalah
- Pastikan semua dependensi terinstal dengan benar
- Periksa bahwa Anda menggunakan versi Node.js yang kompatibel
- Verifikasi variabel lingkungan telah diatur dengan benar

## Kontribusi
1. Fork repositori
2. Buat cabang fitur Anda (`git checkout -b fitur/FiturMenakjubkan`)
3. Commit perubahan Anda (`git commit -m 'Tambahkan FiturMenakjubkan'`)
4. Push ke cabang (`git push origin fitur/FiturMenakjubkan`)
5. Buka Pull Request
