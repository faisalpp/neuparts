'use client';
import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import FaqAccordion from '../FaqAccordion';
import MobileFaqs from './MobileFaqs';

const Faqs = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const [faqTabs, setFaqTabs] = useState([
    {
      _id: 1,
      title: 'lorem ipsum',
      slug: 'lorem-ipsum',
    },
  ]);
  const [faqs, setFaqs] = useState([
    {
      _id: 1,
      question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, similique!',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eius natus quam molestias voluptatem magnam minus recusandae quisquam dicta ab.',
    },
    {
      _id: 2,
      question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, similique!',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eius natus quam molestias voluptatem magnam minus recusandae quisquam dicta ab.',
    },
    {
      _id: 3,
      question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, similique!',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eius natus quam molestias voluptatem magnam minus recusandae quisquam dicta ab.',
    },
    {
      _id: 2,
      question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, similique!',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eius natus quam molestias voluptatem magnam minus recusandae quisquam dicta ab.',
    },
  ]);
  const [slug, setSlug] = useState('');
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tabId, device) => {
    if (tabId === activeTab) {
      if (device === 'mobile') {
        setActiveTab(null);
      }
    } else {
      setActiveTab(tabId);
    }
  };

  useEffect(() => {
    const GetFaqTabs = async () => {};
    GetFaqTabs();
  }, []);

  useEffect(() => {
    const GetFaqs = async () => {};
    GetFaqs();
  }, [slug]);

  // Mobile and Desktop Design
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="maincontainer flex gap-6 py-12 lg:gap-7 lg:py-16 xl:gap-10 xl:py-20 maxlg:flex-col">
        {isDesktop ? (
          <>
            <div className="tab-buttons flex flex-col gap-2 lg:w-[50%] maxlg:order-2">
              {faqTabs.map((tab) => (
                <button
                  key={tab._id}
                  className={`flex items-center justify-between rounded-2xl border border-[rgba(0,0,0,0.15)] p-5 text-left font-semibold xl:p-6 xl:text-lg ${activeTab === tab._id ? 'active bg-b7 text-white' : 'text-b23'}`}
                  onClick={() => {
                    handleTabClick(tab._id);
                    setSlug(tab.slug);
                  }}
                >
                  <span>{tab.title}</span>
                  {activeTab === tab._id ? <FiChevronRight /> : ''}
                </button>
              ))}
            </div>
            <div className="tab-content w-full">
              <div className="flex flex-col gap-3 sm:gap-4">{faqs.length > 0 ? faqs.map((faq) => <FaqAccordion key={faq._id} title={faq.question} parent="gap-3 bg-[#F8FBFB] [&>div>h6]:maxmd:text-sm text-white p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-md text-b18" child="[&>p]:text-sm text-b18 font-normal" answer={faq.answer} />) : <div className="text-center">No FAQ&apos;s Found!</div>}</div>
            </div>
          </>
        ) : (
          <>
            {faqTabs.map((tab, index) => (
              <MobileFaqs
                key={index}
                title={tab.title}
                tabfaqs={faqs}
                activeClass={tab._id === activeTab ? true : false}
                isOpen={tab._id === activeTab}
                onClick={() => {
                  handleTabClick(tab._id, 'mobile');
                  setSlug(tab.slug);
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
