import React from 'react'

const NoRow = ({message}) => {
    return (
     <tr className="border-b border-l border-r border-b6 text-xs font-semibold">
      <td className='py-2' >{message}</td>
     </tr>
    )
}

export default NoRow