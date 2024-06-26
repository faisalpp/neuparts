'use client';
import React, { useState } from 'react';
import ReviewExSlider from '@/components/ReviewExSlider';

const SatisfiedSection = ({ apiSectionName, title, dots, SectionStyle }) => {
  const [reviews, setReviews] = useState([
    {
      content: 'Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet. Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.',
      author: 'John Doe',
      rating: 4,
    },
    {
      content: 'Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet. Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.',
      author: 'John Doe',
      rating: 4,
    },
    {
      content: 'Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet. Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.',
      author: 'John Doe',
      rating: 4,
    },
    {
      content: 'Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet. Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.',
      author: 'John Doe',
      rating: 4,
    },
    {
      content: 'Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet. Facilisis sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.',
      author: 'John Doe',
      rating: 4,
    },
  ]);

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
