import React from 'react';
import {Switch} from '@material-tailwind/react'

const EmailPreferenceData = ({ title,checked,setState }) => {

    return (
        <>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex flex-col gap-4'>
                    <h3 className=' font-semibold'>{title}</h3>
                    <p className='text-sm'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor.
                    </p>
                </div>
                <div className='flex gap-10 items-center'>
                    <div class="inline-flex items-center">
                        <div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
                            <Switch
                                class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full  bg-gray-300 transition-colors duration-300 checked:bg-b3 peer-checked:border-b3 peer-checked:before:bg-b3" checked={checked}
                                onChange={setState}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr className='bg-[rgba(0,0,0,0.08)]' />
        </>
    )
}

export default EmailPreferenceData