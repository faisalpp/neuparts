'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '@/components/AdminDashboard/Table';
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import OrderTablet from '@/components/AdminDashboard/Table/TD/OrderTablet';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(2);

  const FetchOrders = async () => {
    setRowLoader(true);
    const getToastId = toast.loading('Loading orders...')
    fetch(`/api/admin/order/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.orders.length > 0) {
          toast.update(getToastId, { render: 'Orders loaded successfully!', type: 'success', autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setOrders(data.orders);
        } else {
          toast.update(getToastId, { render: 'Orders loading failed!', type: 'error', autoClose: 1000, isLoading: false });
          setOrders([]);
        }
        setRowLoader(false);
      });
  };

  // get team members data
  useEffect(() => {
    FetchOrders();
  }, [page]);

  return (
    <>
      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        {/* <ActionBtns buttons={[{ type: 'trigger', trigger: setCreatePopup, text: 'Add Review' }]} /> */}
        <div className="mt-10 flex h-full w-full flex-col items-center">
          <Table header={['Order #','Customer', 'Payment Status', 'Order Status', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : orders?.length > 0 ? (
              orders.map((order, i) => (
                <Row Key={i}>
                  <Text text={order.order_no} />
                  <Text text={`${order?.shipping_address.first_name} ${order?.shipping_address.last_name}`} />
                  <OrderTablet type="payment" text={order.payment_status} />
                  <OrderTablet type="order" text={order.order_status} />
                  <Actions id={order._id} handleDelete={()=>{}} data={order} editLink={`/neu-admin/orders/edit/${order._id}`} isEditLink={true} />
                </Row>
              ))
            ) : (
              <NoData colspan={4} alert="No Orders Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Orders;
