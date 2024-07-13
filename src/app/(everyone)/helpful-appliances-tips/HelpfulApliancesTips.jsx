'use client'
import React,{useState,useEffect} from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import GetScoop from '@/components/AppliancesTips/GetScoop';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import { RiArrowDropRightLine } from 'react-icons/ri';

const HelpfulApliancesTips = () => {
  const [page, setPage] = useState(1)
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [moreLoading,setMoreLoading] = useState(false)
  const [pageCount,setPageCount] = useState(null)
  const [limit,setLimit] = useState(9)

  const FetchBlogs = async () => {

    if(!moreLoading){
      setLoading(true)
    }
  
    fetch(`/api/front/helpful-appliance-tips/categories/?page=${page}&limit=${limit}`)  
     .then((res) => res.json())
     .then((data) => {
      console.log(data)
      if(data.cats.length > 0){
        setPageCount(data.pagination.pageCount)
        setTips((blogs)=>[...blogs,...data.cats])
      }else{
        setTips([])
      }
      if(moreLoading){
        setMoreLoading(false)
      }
      setLoading(false)
     })
   }
  
   // get team members data
   useEffect(() => {
    FetchBlogs()
   }, [page])

  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-[#C3C2C2]" />
          <h5 className="text-xs text-b17">Helpful Appliance Tips</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Helpful Appliance Tips" description="Get the inside scoop! We are a local small business working our butts off to improve the way people can buy appliances. We have lots of experience in the appliance world and we would love to share some tips with you we have accumulated over the years:" />
      </div>

      <GetScoop ScoopCards={tips} />

      {/* Shop Austin Section */}
      <ShopAustinSection />

      {/* Client Reviews */}
      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="help-appliance-tips" title="Join Thousands of Satisfied Customers." />
      
      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default HelpfulApliancesTips;
