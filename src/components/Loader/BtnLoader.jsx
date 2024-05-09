import React from 'react'

const BtnLoader = ({style}) => {
  return (
    <div className='flex justify-center w-full' >
     <img src="/loader-bg.gif" className={style} />
    </div>
  )
}

export default BtnLoader