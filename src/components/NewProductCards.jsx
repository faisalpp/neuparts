import React from 'react'
import Iframe from '../components/Reusable/Ifram'


const NewProductCards = ({keyFeatures}) => {
    return (
        <div className='py-10 lg:py-14 xl:py-20 maincontainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 2xl:gap-20'>
            {keyFeatures ? keyFeatures.map((item,indx)=>
            <div key={indx} className='card'>
                <div className='card_header px-5 py-10 border border-black/[0.08] rounded-3xl h-[266px] object-contain w-full '>
                  {item.media.file === 'image' ? <img  src={item.media.data} alt='' className='h-full object-contain w-full'  />:null}
                  {item.media.file === 'video' && item.media.type === 'url' ? <Iframe src={item.media.data} title="Modal Video" icon="text-5xl" frameId={`iframe-keyFeatures-${Math.random()*1000/15}`} divId={`iframe-keyFeaturs-wrapper-${Math.random()*1000/15}`} thumbnail={item.media.prevImg} />:null}
                  {item.media.file === 'video' && item.media.type === 'upload' ? <video className=" rounded-2xl" controls  src={item.media.data} />:null}
                    {/* <img src="/WashingMachine.webp" className='h-[266px] object-contain w-full' alt="WashingMachine" /> */}
                </div>
                <div className='card_body text-black'>
                    <h3 className='font-semibold mt-8 text-center'>{item.title}</h3>
                    <p className='mt-3 font-medium text-center leading-6 -tracking-032'>
                     {item.description}
                    </p>
                </div>
            </div>):null}
        </div>
    )
}

export default NewProductCards
