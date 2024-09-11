import React from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import { IoIosArrowForward } from "react-icons/io";


const OrderHistory = () => {
  return (
    <>
      <MyAccount>
        <OrderHistoryData />
      </MyAccount>
    </>
  );
};

export default OrderHistory;

const OrderHistoryData = () => {
  return <>
   <div>

   <div className='flex flex-col gap-8' >
    <div className='flex justify-between' >
     <div className='flex flex-col gap-3' >
      <span className='font-bold text-sm' >Order# 1234</span>
      <span className='text-xs' >Jul 12, 2024 at 12:26 AM • 4 Items</span>
     </div>
     <div className='flex items-center gap-5' >
      <div className='flex flex-col gap-3' >
       <span className='text-b3 text-sm font-bold' >$245.00</span>
       <span className='text-xs' >In Progress</span>
      </div>
       <IoIosArrowForward/>
     </div>
    </div>
    <hr/>
   </div>

   </div>
  </>;
};

export { OrderHistoryData };
