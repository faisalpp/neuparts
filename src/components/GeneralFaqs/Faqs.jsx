'use client'
import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import FaqAccordion from '../FaqAccordion';
import MobileFaqs from './MobileFaqs';
import Pagination from '@/components/Pagination'
import Image from 'next/image';

const Faqs = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [tabs,setTabs] = useState([])
  const [faqs,setFaqs] = useState([])
  const [faqLoading,setFaqLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(null);
  const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(0)
  const [limit,setLimit] = useState(2)

  const [mobFaqs, setMobFaqs] = useState([]);


  const GetFaqs = async (tab=false) => {
    setFaqLoading(true)
    fetch(`/api/front/faqs?category=${tab ? tab : activeTab}&page=${page}&limit=${limit}`,{method:'GET',headers:{'Content-Type':'application/json'}})
    .then((res)=>res.json())
    .then((data)=>{
      (data)
      if(data.faqs.length > 0){
        setFaqs(data.faqs)
        setPageCount(data.pagination.pageCount)
        setFaqLoading(false)
      }else{
        setFaqs([])
        setPageCount(0)
        setFaqLoading(false)
      }
    })
    .catch((error)=>{
      (error)
    })
  }

  const GetTabs = async () => {
    fetch('/api/front/faqs/tabs',{method:'GET',headers:{'Content-Type':'application/json'}})
    .then((res)=>res.json())
    .then((data)=>{
      (data)
      if(data.tabs.length > 0){
        setTabs(data.tabs)
        setActiveTab(data.tabs[0]._id)
        GetFaqs(data.tabs[0]._id)
      }
    })
    .catch((error)=>{
      (error)
    })
  }

  useEffect(()=>{
   GetTabs()
  },[])

  useEffect(()=>{
      GetFaqs()
  },[activeTab,page])

  const handleTabClick = (tabId, device) => {
    if (tabId === activeTab) {
      if (device === 'mobile') {
        setActiveTab(null);
      } else {
        setActiveTab(tabId);
      }
    } else {
      setActiveTab(tabId);
    }
  };

  const GetMobFaqs = async () => {
    fetch('/api/front/faqs/mobile',{method:'GET',headers:{'Content-Type':'application/json'}})
    .then((res)=>res.json())
    .then((data)=>{
      (data)
      if(data.faqs.length > 0){
        setMobFaqs(data.faqs)
      }
    })
    .catch((error)=>{
      (error)
    })
  }

  // Mobile and Desktop Design
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 992);
    GetMobFaqs()
  }, []);




  return (
    <>
      <div className="maincontainer flex gap-6 py-12 lg:gap-7 lg:py-16 xl:gap-10 xl:py-20 maxlg:flex-col">
        
        {isDesktop ? (
          <>
            <div className="tab-buttons flex flex-col gap-2 lg:w-[50%] maxlg:order-2">
              {tabs.length > 0 ? tabs.map((tab) => (
                <button
                  key={tab._id}
                  className={`flex items-center justify-between rounded-2xl border border-[rgba(0,0,0,0.15)] p-5 text-left font-semibold xl:p-6 xl:text-lg ${activeTab === tab._id ? 'active bg-b3 text-white' : 'text-b23'}`}
                  onClick={() => {
                    handleTabClick(tab._id);
                  }}
                >
                  <span>{tab.title}</span>
                  {activeTab === tab._id ? <FiChevronRight /> : ''}
                </button>
              )):null}
            </div>
            <div className="tab-content w-full">
              <div className="flex flex-col gap-3 sm:gap-4">
                {faqLoading ? <div className='flex justify-center items-center h-32' ><Image src="/loader2.gif"  width={70} height={70} /></div>  : faqs.length > 0 ?
                  faqs.map((faq) => ( 
                   <FaqAccordion key={faq._id} title={faq.title} parent="gap-3 bg-[#F8FBFB] [&>div>h6]:maxmd:text-sm text-white p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-md text-b18" child="[&>p]:text-sm text-b18 font-normal" answer={faq.content} />
                  )):<div className="text-center">No FAQ&apos;s Found!</div>}
                 {faqLoading ? null : pageCount > 1 ? <div className='flex justify-center mt-3' ><Pagination page={page} pageCount={pageCount} setPage={setPage} /></div>:null}
              </div>
            </div>
          </>
        ) : (
          <>
           {mobFaqs.map((tab, index) => (
              <MobileFaqs
                key={tab._id}
                title={tab.title}
                tabfaqs={tab.posts}
                activeClass={tab._id === activeTab ? true : false}
                isOpen={tab._id === activeTab}
                onClick={() => {
                  handleTabClick(tab._id, 'mobile');
                }}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Faqs;
