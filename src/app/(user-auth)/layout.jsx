import './globals.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@/app/GlobalRedux/StoreProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        animation= "bounce"
        />
      <StoreProvider>
        {children}
      </StoreProvider>
      </body>
    </html>
  );
}
