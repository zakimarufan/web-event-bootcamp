# Dokumentasi Pembuatan Web Event Ticket

## Daftar Isi
1. [Persiapan Awal](#persiapan-awal)
2. [Inisialisasi Proyek](#inisialisasi-proyek)
3. [Konfigurasi Project](#konfigurasi-project)
4. [Struktur Project](#struktur-project)
5. [Pengembangan Fitur](#pengembangan-fitur)

## Persiapan Awal

### Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
- Node.js (versi terbaru)
- npm (Node Package Manager)
- Code editor (VS Code direkomendasikan)

## Inisialisasi Proyek

1. Buat proyek Next.js baru dengan perintah:
```bash
npx create-next-app@latest web_event_ticket
```

2. Saat proses instalasi, pilih konfigurasi berikut:
```
Would you like to use TypeScript? › No
Would you like to use ESLint? › Yes
Would you like to use Tailwind CSS? › Yes
Would you like to use `src/` directory? › Yes
Would you like to use App Router? › Yes
Would you like to customize the default import alias? › No
```

## Konfigurasi Project

1. Masuk ke direktori proyek:
```bash
cd web_event_ticket
```

2. Update dependencies di package.json:
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.1.6"
  },
  "devDependencies": {
    "postcss": "^8",
    "tailwindcss": "^3.4.1"
  }
}
```

3. Install dependencies:
```bash
npm install
```

4. Konfigurasi Next.js (next.config.mjs):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```

5. Konfigurasi Tailwind CSS (tailwind.config.mjs):
```javascript
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

## Struktur Project

Struktur folder yang direkomendasikan:
```
web_event_ticket/
├── src/
│   ├── app/
│   │   ├── page.js
│   │   ├── layout.js
│   │   ├── globals.css
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── sections/
│   ├── lib/
│   └── utils/
├── public/
│   ├── images/
│   └── icons/
├── .next/
├── node_modules/
├── package.json
├── next.config.mjs
├── tailwind.config.mjs
└── postcss.config.mjs
```

## Pengembangan Fitur

### 1. Setup Layout Dasar
Buat layout dasar di `src/app/layout.js`:
```javascript
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Event Ticket",
  description: "Platform pemesanan tiket event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 2. Halaman Utama
Buat halaman utama di `src/app/page.js`:
```javascript
export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-4xl font-bold text-center">
        Selamat Datang di Web Event Ticket
      </h1>
    </main>
  );
}
```

### 3. Style Global
Update `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}
```

## Menjalankan Project

1. Mode Development:
```bash
npm run dev
```

2. Build untuk Production:
```bash
npm run build
```

3. Menjalankan Production Build:
```bash
npm run start
```

## Fitur yang Perlu Dikembangkan

1. Autentikasi Pengguna
   - Login
   - Register
   - Reset Password

2. Manajemen Event
   - Daftar Event
   - Detail Event
   - Pencarian Event
   - Filter Event

3. Manajemen blog
   - Daftar Blog
   - Detail Blog
   - Pencarian Blog
   - Filter Blog

4. Dashboard Admin
   - Manajemen Event
   - Manajemen User
   - Laporan Penjualan

5. Manajemen User
   - user Management
   - Role Management (mahasiswa, admin)

## Tips Pengembangan

1. Gunakan komponen yang reusable untuk mempermudah maintenance
2. Implementasikan responsive design menggunakan Tailwind CSS
3. Gunakan state management yang sesuai untuk aplikasi
4. Implementasikan error handling yang baik
5. Pastikan keamanan aplikasi terjaga
6. Lakukan testing secara berkala

## Deployment

1. Pilih platform hosting (contoh: Vercel, Netlify)
2. Setup environment variables
3. Konfigurasikan domain
4. Deploy aplikasi

## Perawatan

1. Update dependencies secara berkala
2. Monitor performa aplikasi
3. Backup data secara rutin
4. Pantau error logs
5. Implementasikan feedback user

---

Dokumentasi ini akan terus diperbarui sesuai dengan perkembangan project. Pastikan untuk selalu mengikuti best practices dan security guidelines dalam pengembangan aplikasi.
