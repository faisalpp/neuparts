'use client';
import React, { useState } from 'react';
import ReviewSlider from './ReviewSlider';
import { BsArrowRightShort } from 'react-icons/bs';
// import { GetGoogleReviews, getYelpReviews } from '../api/frontEnd'

const ReviewSection = ({ buttonactive }) => {
  const [reviews, setReviews] = useState([
    {
      rating: 4,
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      author_name: 'Author',
    },
  ]);

  // const gg = async () => {
  //   const res = await GetGoogleReviews();
  //   if (res.status === 200) {
  //     setReviews(res.data.reviews);
  //   } else {
  //     setReviews([])
  //   }
  // }

  // useEffect(() => {
  //   gg()
  // }, []);

  const [yelpReviews, setYelpReviews] = useState([
    {
      rating: 4,
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      author_name: 'Author',
    },
  ]);
  // const fetchYelpReviews = async () => {
  //   const res = await getYelpReviews();
  //   if (res.status === 200) {
  //     setYelpReviews(res.data.reviews)
  //   } else {
  //     setYelpReviews([])
  //   }
  // }

  // useEffect(() => {

  //   fetchYelpReviews();
  // }, []);

  return (
    <div className="maincontainer flex flex-col justify-center pb-10 lg:pb-16">
      <h2 className="mb-12 text-2xl font-extrabold">Saving Austinites Money on Appliances Since 2015</h2>
      <div className="space-y-8">
        <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
        {/* <div className="elfsight-app-e353e15d-00c0-408e-a088-0d639b57d70f"></div> */}
        {/* <div className="elfsight-app-a9c6c21c-6d3f-4b27-9d75-ed5d69605c15"></div> */}
        <ReviewSlider color="#F5F5F5" clientreviews={reviews} icon="/google.webp" />
        <ReviewSlider color="#ff9b3e14" clientreviews={yelpReviews} icon="/yelp.webp" />
      </div>
      {buttonactive ? (
        ''
      ) : (
        <div className="mt-5 flex justify-center">
          <a href="/" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-3 font-semibold text-b3">
            <span className="text-sm">Shop Austin&apos;s Best Appliance Deals</span>
            <BsArrowRightShort className="text-2xl" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
