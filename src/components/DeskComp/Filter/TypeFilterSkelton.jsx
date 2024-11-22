import React from 'react'

const TypeFilterSkelton = ({title}) => {
  return (
    <>
    <h3 className={`w-full text-sm font-bold mt-2`}>{title}</h3>
    <div className='flex flex-col gap-2 mt-2' >
        {Array.from({length:10}).map((_, index) =>
              <span key={index} >
                <div className={`flex text-sm hover:underline`}>
                  <h4 className="w-full bg-gray-200 animate-pulse mr-2 rounded-md text-gray-200">item.title</h4>
                  <div className="flex justify-end text-xs ml-2 bg-gray-200 rounded-xl h-4 w-4 text-gray-200 animate-pulse">
                    <span>0</span>
                  </div>
                </div>
              </span>
        )}
    </div>
  </>
  )
}

export default TypeFilterSkelton