import React from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';

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
  return <></>;
};

export { OrderHistoryData };
