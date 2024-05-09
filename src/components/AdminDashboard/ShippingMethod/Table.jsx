import React from 'react'
// import Row from './Row'


const Table = () => {
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b border-l border-b3 bg-b3 font-medium text-white">
            <tr>
              <th scope="col" className="px-3 py-4">Method Name</th>
              <th scope="col" className="px-3 py-4">Description</th>
              <th scope="col" className="px-3 py-4">Status</th>
              <th scope="col" className="px-3 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className='border-[1px] border-b6 ' >
            <td colSpan={4} className='py-2 px-5 text-b15 ' >You can add multiple shipping methods within this zone. Only customers within the zone assigned zip codes will see them.</td>
            {/* <ShippingRow />
            <ShippingRow />
            <ShippingRow />
            <ShippingRow /> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default Table