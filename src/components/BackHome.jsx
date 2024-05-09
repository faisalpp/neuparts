import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const BackHome = ({ className }) => {
    return (
        <Link to="/" className={'flex gap-2 font-semibold text-sm items-center text-b3 ' + className}>
            <AiOutlineArrowLeft />
            <span>Back to Home</span>
        </Link>
    )
}

export default BackHome
