import React from 'react'
import Row from './Row'

const Table = ({zips,uState,handleUpdate,getZips}) => {  
  return (
    <>
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b border-l border-b3 bg-b3 font-medium text-white">
            <tr>
              <th scope="col" className="px-3 py-4">Zip Code</th>
              <th scope="col" className="px-3 py-4">Country</th>
              <th scope="col" className="px-3 py-4">State</th>
              <th scope="col" className="px-3 py-4">City</th>
              <th scope="col" className="px-3 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {zips.length > 0 ? zips.map((zip,index)=><Row key={index} item={zip} updateHandler={handleUpdate} updateState={uState} getAllZips={getZips} />):null}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Table