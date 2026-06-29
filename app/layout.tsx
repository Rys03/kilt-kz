import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'kilt.kz - Недвижимость в Казахстане',
  description: 'Покупка, продажа и аренда недвижимости в Казахстане. Актуальные объявления о квартирах, домах и коммерческой недвижимости.',
  keywords: 'недвижимость Казахстан, квартиры Алматы, купить квартиру, аренда жилья',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
