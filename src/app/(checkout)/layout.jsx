import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Cart';
import { StoreProvider } from '../GlobalRedux/StoreProvider';
import OrderLoader from '@/components/Checkout/Payment/OrderLoader'


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" animation="bounce" />
       <StoreProvider>
        <div className="grid h-full w-full grid-cols-1 items-center justify-center">
          <div className="relative flex h-full w-full grid-cols-2 3xl:grid maxlg:flex-col">
            
            {/* Loader for order processing */}
            <OrderLoader/>
            {/* Loader for order processing */}
            
            <div className="h-full w-full grow bg-white px-4 pb-52 pt-14 sm:px-16 2xl:max-w-[808px] xs:px-10 3xl:max-w-full">
              <div className="w-full max-w-[572px] lg:ml-auto">{children}</div>
            </div>
            <Cart />
          </div>
        </div>
        </StoreProvider> 
      </body>
    </html>
  );
}
