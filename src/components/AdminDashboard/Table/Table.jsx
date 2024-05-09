import React from 'react'

const Table = ({children,head}) => {

  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b border-l border-b3 bg-b3 font-medium text-white">
            <tr>
              {head?.map((item)=><th scope="col" className="text-center px-6 py-2">{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default Table