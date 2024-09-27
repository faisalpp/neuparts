"use client";
import React, { useState } from "react";
import RatingProductSectionXl from "./Sections/RatingProductSections/RatingProductSectionXl";
import RatingProductSectionLg from "./Sections/RatingProductSections/RatingProductSectionLg";
import RatingProductSectionSm from "./Sections/RatingProductSections/RatingProductSectionSm";

const RatingProductSection = () => {
  const [threeStar, setThreeStar] = useState([
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
  ]);
  const [fourStar, setFourStar] = useState([
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    }
  ]);
  const [fiveStar, setFiveStar] = useState([
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!",
      isSale: true,
      salePrice: 279.0,
      regPrice: 279.0,
      rating: 5,
    }
  ]);

  const GetThreeStarAppliances = async () => {
    // const res = await getSliderAppliances({ rating: 3, sort: 1 })
    // if (res.status === 200) {
    //   setThreeStar(res.data.products)
    // }
  };
  const GetFourStarAppliances = async () => {
    // const res = await getSliderAppliances({ rating: 4, sort: 1 })
    // if (res.status === 200) {
    //   setFourStar(res.data.products)
    // }
  };
  const GetFiveStarAppliances = async () => {
    // const res = await getSliderAppliances({ rating: 5, sort: 1 })
    // if (res.status === 200) {
    //   setFiveStar(res.data.products)
    // }
  };

  // useEffect(() => {
  //   GetThreeStarAppliances()
  //   GetFourStarAppliances()
  //   GetFiveStarAppliances()
  // }, [])

  return (
    <div className="pb-8">
      {fiveStar?.length > 0 ? (
        <>
          <RatingProductSectionXl products={fiveStar} stars={5} title={true} />
          <RatingProductSectionLg products={fiveStar} stars={5} title={true} />
          <RatingProductSectionSm products={fiveStar} stars={5} title={true} />
        </>
      ) : null}

      {fourStar?.length > 0 ? (
        <>
          <RatingProductSectionXl products={fourStar} stars={4} title={false} />
          <RatingProductSectionLg products={fourStar} stars={4} title={false} />
          <RatingProductSectionSm products={fourStar} stars={4} title={false} />
        </>
      ) : null}

      {threeStar?.length > 0 ? (
        <>
          <RatingProductSectionXl
            products={threeStar}
            stars={3}
            title={false}
          />
          <RatingProductSectionLg
            products={threeStar}
            stars={3}
            title={false}
          />
          <RatingProductSectionSm
            products={threeStar}
            stars={3}
            title={false}
          />
        </>
      ) : null}
    </div>
  );
};

export default RatingProductSection;
