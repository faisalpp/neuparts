'use client';
import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import FaqAccordion from '../FaqAccordion';
import MobileFaqs from './MobileFaqs';

const Faqs = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      title: 'Delivery',
      content: [
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
      ],
    },
    {
      id: 2,
      title: 'Purchase',
      content: [
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
      ],
    },
    {
      id: 3,
      title: 'Return',
      content: [
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
      ],
    },
    {
      id: 4,
      title: 'Refund',
      content: [
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
      ],
    },
    {
      id: 5,
      title: 'Refund',
      content: [
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
        { question: 'Lorem Ipsum Dolor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibul tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phaselluse eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula.' },
      ],
    },
  ]);

  const [slug, setSlug] = useState('');
  const [activeTab, setActiveTab] = useState(1);

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

  // Mobile and Desktop Design
  useEffect(() => {
    // const handleResize = () => {
    setIsDesktop(window.innerWidth >= 992);
    // };

    // window.addEventListener('resize', handleResize);

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, []);

  return (
    <>
      <div className="maincontainer flex gap-6 py-12 lg:gap-7 lg:py-16 xl:gap-10 xl:py-20 maxlg:flex-col">
        {isDesktop ? (
          <>
            <div className="tab-buttons flex flex-col gap-2 lg:w-[50%] maxlg:order-2">
              {faqs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center justify-between rounded-2xl border border-[rgba(0,0,0,0.15)] p-5 text-left font-semibold xl:p-6 xl:text-lg ${activeTab === tab.id ? 'active bg-b3 text-white' : 'text-b23'}`}
                  onClick={() => {
                    handleTabClick(tab.id);
                  }}
                >
                  <span>{tab.title}</span>
                  {activeTab === tab.id ? <FiChevronRight /> : ''}
                </button>
              ))}
            </div>
            <div className="tab-content w-full">
              <div className="flex flex-col gap-3 sm:gap-4">
                {faqs.map((tab) => activeTab === tab.id && tab.content.map((faq, index) => <FaqAccordion key={faq.id} title={faq.question} parent="gap-3 bg-[#F8FBFB] [&>div>h6]:maxmd:text-sm text-white p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-md text-b18" child="[&>p]:text-sm text-b18 font-normal" answer={faq.answer} />))}

                {/* <div className="text-center">No FAQ&apos;s Found!</div> */}
              </div>
            </div>
          </>
        ) : (
          <>
            {faqs.map((tab, index) => (
              <MobileFaqs
                key={index}
                title={tab.title}
                tabfaqs={tab.content}
                activeClass={tab.id === activeTab ? true : false}
                isOpen={tab.id === activeTab}
                onClick={() => {
                  handleTabClick(tab.id, 'mobile');
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
