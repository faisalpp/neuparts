import './globals.css';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/DeskComp/ScrollToTop';
import Footer from '@/components/DeskComp/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@/app/GlobalRedux/StoreProvider';
import StoreData from '@/provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" animation="bounce" />
        <StoreProvider>
          <StoreData>
            <Navbar />
            <ScrollToTop />
            {children}
            <Footer />
          </StoreData>
        </StoreProvider>
      </body>
    </html>
  );
}
