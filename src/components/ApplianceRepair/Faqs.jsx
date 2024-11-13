import React from 'react';
import FaqAccordion from '@/components/FaqAccordion';
import connect from '@/lib/db';
import Post from '@/models/posts';

const GetFaqs = async () => {
  await connect();
  const faqs = await Post.find({ postType: 'faq-appliance-repair' });
  return faqs;
};

const Faqs = async () => {
  const faqs = await GetFaqs();

  return (
    <>
      {faqs.length > 0 ? (
        <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px">
          <div className="mx-auto flex w-full max-w-[880px] flex-col gap-10 md:gap-14">
            <h2 className="text-center text-2xl font-bold text-b18 xl:text-[32px]">Common FAQs with Appliance Repair</h2>
            <div className="flex w-full flex-col gap-3 sm:gap-4">
              {faqs.map((faq, index) => (
                <FaqAccordion key={index} activeBg="!bg-b3" activeText="!text-white" title={faq.title} parent="gap-3 bg-[#F8FBFB] [&>div>h6]:maxmd:text-sm p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-md text-b18" child="[&>p]:text-sm text-b18 font-normal" answer={faq.content} />
              ))}
            </div>
            <p className="text-base text-b18 xs:text-xl xs:leading-8">There are lots of appliance repairs to avoid and lots of appliance repairs that are worth it vs replacing the appliance. Knowing this difference usually comes from an honest appliance repairman. That&apos;s why we recommend the good ones above! Hope this helps!</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Faqs;
