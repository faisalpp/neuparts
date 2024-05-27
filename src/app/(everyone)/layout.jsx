import './globals.css';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/DeskComp/ScrollToTop';
import Footer from '@/components/DeskComp/Footer';

export const metadata = {
  title: 'Neu Parts',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
