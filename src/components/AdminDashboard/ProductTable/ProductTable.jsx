import React from 'react'
import ProductRow from './ProductRow'
import {BsImage} from 'react-icons/bs'

const ProductTable = ({data,getProducts}) => {
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b border-l border-b3 bg-b3 font-medium text-white">
            <tr>
              <th scope="col" className="px-6 py-4"><BsImage/></th>
              <th scope="col" className="px-6 py-4">Title</th>
              <th scope="col" className="px-6 py-4">Sale&nbsp;Price</th>
              <th scope="col" className="px-6 py-4">Reguler&nbsp;Price</th>
              <th scope="col" className="px-6 py-4">Product&nbsp;Type</th>
              <th scope="col" className="px-6 py-4">Rating</th>
              <th scope="col" className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item)=><ProductRow data={item} getProductss={getProducts} />)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProductTable