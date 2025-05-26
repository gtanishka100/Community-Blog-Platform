import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'GDG Community Blog',
  description: 'Social blogging platform for GDG team',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5EBE0] min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
