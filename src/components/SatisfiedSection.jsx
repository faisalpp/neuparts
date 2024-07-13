'use client';
import React, { useEffect, useState } from 'react';
import ReviewExSlider from '@/components/ReviewExSlider';

const SatisfiedSection = ({ page, title, dots, SectionStyle }) => {
  const [reviews, setReviews] = useState([]);

  const GetReviews = async () => {
   fetch(`/api/front/reviews?page=${page}`,{method:'GET',headers:{
    'Content-Type':'application/json'
   }})
   .then(res=> res.json())
   .then(data=>{
    setReviews(data.reviews)
   })
   .catch(error=>{
     console.log(error)
   })
  }

  useEffect(()=>{
   GetReviews();
  },[])
  


  return (
    <>
      {reviews?.length > 0 ? (
        <div className={`maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 ${SectionStyle} ${dots ? 'mb-7' : ''}`}>
          {title ? <h2 className="pb-10 text-center text-2xl font-bold lg:pb-16 xl:pb-20 lg:text-32px 2xl:text-4xl">{title}</h2> : null}
          <div className="relative">
            <ReviewExSlider clientreviews={reviews} dots={dots} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SatisfiedSection;
