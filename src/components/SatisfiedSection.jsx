'use client';
import React, { useState } from 'react';
import ReviewExSlider from '@/components/ReviewExSlider';

const SatisfiedSection = ({ apiSectionName, title, dots, SectionStyle }) => {
  const [reviews, setReviews] = useState([
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
  ]);

  // const GetLoopMedia = async () => {
  //   const data = { pageType: apiSectionName }
  //   const res = await getReviews(data);
  //   if (res.status === 200) {
  //     setReviews(res.data.reviews)
  //   } else {
  //     setReviews([])
  //   }
  // }
  // useEffect(() => {
  //   GetLoopMedia()
  // }, [])

  return (
    <>
      {reviews?.length > 0 ? (
        <div className={`maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px ${SectionStyle} ${dots ? 'mb-7' : ''}`}>
          {title ? <h2 className="pb-7 text-center text-xl font-bold lg:text-2xl xl:pb-20 xl:text-3xl 2xl:text-32px">{title}</h2> : null}
          <div className="relative">
            <ReviewExSlider clientreviews={reviews} dots={dots} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SatisfiedSection;
