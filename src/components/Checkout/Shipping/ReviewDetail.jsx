import React from 'react'
import { Link } from 'react-router-dom'

const ReviewDetail = ({ title, detail, subtitle, textStyle }) => {

    return (
        <div className='flex justify-between w-full gap-2 items-center'>
            <div className='text-b16 text-sm flex gap-4 items-center'>
                <span>
                    {title}
                </span>
                <div>
                    <span className={textStyle}>
                        {detail}
                    </span>
                    {
                        subtitle ?
                            <span className='block text-xs'>
                                {subtitle}
                            </span>
                            : null
                    }
                </div>
            </div>
            <Link to="/mycart/information/?callback=change-info" className='text-xs text-b3 hover:underline font-semibold'>
                Change
            </Link>
        </div>
    )
}

export default ReviewDetail