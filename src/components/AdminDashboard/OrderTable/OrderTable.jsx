import React from 'react'
import OrderRow from './OrderRow'
import moment from 'moment'

const OrderTable = ({orders,refreshOrders}) => {

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b border-l border-b3 bg-b3 font-medium text-white">
            <tr>
              <th scope="col" className=" px-6 py-4">Order&nbsp;#</th>
              <th scope="col" className=" px-6 py-4">Order Type</th>
              <th scope="col" className=" px-6 py-4">Date</th>
              <th scope="col" className=" px-6 py-4">Order&nbsp;Status</th>
              <th scope="col" className=" px-6 py-4">Total</th>
              <th scope="col" className=" px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length ? orders.map((order)=><OrderRow orderType={order.shipping.type} isArchived={order.isArchived} orderStatus={order.orderStatus} refreshOrders={refreshOrders} id={order._id} orderNo={order.orderNo} date={moment(order.createdAt).format('DD MMMM YYYY')} total={order.grandTotal} />) : null}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default OrderTable