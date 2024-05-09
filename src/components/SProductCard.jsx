import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SProductCard = ({ link, title, image }) => {
  return (
    <Link href={link} ><div className='maxmd:max-w-[330px] maxmd:mx-auto'>
      <div className='flex flex-col items-center justify-center rounded-xl border-[1px] border-gray-200 bg-white p-10' >
        <Image width={500} height={500} quality={100} src={image} alt={title} className='h-56' />
      </div>
      <h4 className=' font-bold xl:text-xl text-lg mt-2' >{title}</h4>
    </div>
    </Link>
  )
}

export default SProductCard