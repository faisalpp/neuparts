import React from 'react'

const InformationCard = ({item,count}) => {
  return (
     <div className='flex items-center justify-between cursor-pointer bg-[#F8F8F8] p-5 rounded-2xl'>
      <h3 className='text-sm capitalize'><span className='font-semibold'>{item.rating} Star</span> rating</h3>
      <div className='text-sm capitalize'><span className='font-semibold'>{count}</span> buying options</div>
      <div className='w-120px bg-black/[0.08] rounded-lg' ><span className='flex rounded-lg bg-gradient-to-r from-b4 to-b7 w-1/5 h-2' ></span></div>
      
      {item.isSale ? <div className='text-b16 font-semibold text-xs px-3 py-[5px] bg-b4 flex items-center rounded-full'>
       <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
        <mask id="mask0_2_10877" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="12"><rect x="0.335938" width="12" height="12" fill="#D9D9D9" /></mask>
        <g mask="url(#mask0_2_10877)"><path d="M2.33594 7C2.33594 7.73333 2.5151 8.402 2.87344 9.006C3.23177 9.61033 3.7026 10.0875 4.28594 10.4375C4.14427 10.2375 4.03394 10.0187 3.95494 9.781C3.8756 9.54367 3.83594 9.29167 3.83594 9.025C3.83594 8.69167 3.89844 8.37917 4.02344 8.0875C4.14844 7.79583 4.33177 7.52917 4.57344 7.2875L6.33594 5.55L8.11094 7.2875C8.34427 7.52083 8.52344 7.7855 8.64844 8.0815C8.77344 8.37717 8.83594 8.69167 8.83594 9.025C8.83594 9.29167 8.79644 9.54367 8.71744 9.781C8.6381 10.0187 8.5276 10.2375 8.38594 10.4375C8.96927 10.0875 9.4401 9.61033 9.79844 9.006C10.1568 8.402 10.3359 7.73333 10.3359 7C10.3359 6.25833 10.1526 5.577 9.78594 4.956C9.41927 4.33533 8.93594 3.85 8.33594 3.5L8.11094 3.775C8.0026 3.90833 7.88394 4.00417 7.75494 4.0625C7.6256 4.12083 7.4901 4.15 7.34844 4.15C7.0901 4.15 6.85677 4.06033 6.64844 3.881C6.4401 3.702 6.33594 3.45833 6.33594 3.15V1.5L5.71094 1.8685C5.29427 2.1145 4.83594 2.47083 4.33594 2.9375C3.83594 3.40417 3.3776 3.97917 2.96094 4.6625C2.54427 5.34583 2.33594 6.125 2.33594 7ZM6.33594 6.95L5.27344 7.9875C5.13177 8.12917 5.02344 8.28967 4.94844 8.469C4.87344 8.648 4.83594 8.83333 4.83594 9.025C4.83594 9.43333 4.98177 9.78117 5.27344 10.0685C5.5651 10.3562 5.91927 10.5 6.33594 10.5C6.7526 10.5 7.10677 10.3562 7.39844 10.0685C7.6901 9.78117 7.83594 9.43333 7.83594 9.025C7.83594 8.825 7.79844 8.6375 7.72344 8.4625C7.64844 8.2875 7.5401 8.12917 7.39844 7.9875L6.33594 6.95Z" fill="#111010" /></g>
       </svg> {(100 - (item.salePrice / item.regPrice) * 100).toFixed(0)}% off
      </div>:null}

      <div className='text-b3 text-xl font-body'>${item.isSale ? item.salePrice : item.regPrice}</div>
     </div>
  )
}

export default InformationCard