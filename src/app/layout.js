import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'sweetalert2/dist/sweetalert2.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HMSE UNIPI",
  description: "Himpunan Mahasiswa Sistem Informasi Universitas Putra Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
