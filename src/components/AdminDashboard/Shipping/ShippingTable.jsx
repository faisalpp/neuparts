import React from 'react'
import ShippingRow from './ShippingRow'


const ShippingTable = () => {
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b border-l border-b3 bg-b3 font-medium text-white">
            <tr>
              <th scope="col" className="px-3 py-4">Zone Name</th>
              <th scope="col" className="px-3 py-4">Zip Codes</th>
              <th scope="col" className="px-3 py-4">Description</th>
              <th scope="col" className="px-3 py-4">Methods</th>
              <th scope="col" className="px-3 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <ShippingRow />
            <ShippingRow />
            <ShippingRow />
            <ShippingRow />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default ShippingTable