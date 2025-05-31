import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'GDG Community Blog Platform',
  description: 'A social blogging platform for the GDG community',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}