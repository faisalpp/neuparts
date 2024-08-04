'use client';
import React, { useState, useEffect } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import HelpAndSupportCard from '@/components/HelpAndSupportCard';
import PaginationV2 from '@/components/Pagination/PaginationV2';
import Image from 'next/image';

const HelpAndSupport = () => {
  const [blogs, setBlogs] = useState([]);
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState('')

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);


  const FetchBlogs = async (cat, term) => {
    let category = activeTab;
    let search = '';
    if (cat) {
      category = cat;
    }
    if (term) {
      search = term
    }

    fetch(`/api/front/blog/help-support/by-category/?category=${category}&page=${page}&limit=${limit}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.blogs.length > 0) {
          setPageCount(data.pagination.pageCount)
          setBlogs(data.blogs)
        } else {
          setBlogs([])
        }
        setLoading(false)
      })
  }

  // get team members data
  useEffect(() => {
    FetchBlogs()
  }, [page])


  const FetchCats = async () => {
    setLoading(true)
    fetch('/api/front/blog/help-support/categories')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.cats.length > 0) {
          setCats(data.cats)
          FetchBlogs(data.cats[0]._id)
          setActiveTab(data.cats[0]._id)
        } else {
          setCats([])
        }
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    FetchCats()
  }, [])


  const handleTabClick = (tabId) => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => {
      setActiveTab(tabId);
    }, 200); // W
  };

  useEffect(() => {
    setFadeOut(false); // Reset fade-out animation after tab change
    setPageCount(0)
    setPage(1)
    setSearch('')
    FetchBlogs()
  }, [activeTab]);

  const handleEnterKey = async (e) => {
    setLoading(true)
    setTimeout(() => {
      FetchBlogs(null, e.target.value)
    }, 1000)
  };




  return (
    <>
      <div className="maincontainer flex flex-col gap-4 py-10">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b3" />
          <h5 className="text-xs text-black">Help & Support Center</h5>
        </div>
        {/* Bread Crumbs End */}
        <h1 className="text-32px font-bold text-b18 lg:text-40px">Help & Support</h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-[560px]">
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={(e) => handleEnterKey(e)} type="search" placeholder="What do you need help with?" className="w-full rounded-lg border border-[rgba(0,0,0,0.16)] py-4 pl-10 pr-4 outline-none placeholder:text-xs placeholder:text-[#777E90]" />
          <AiOutlineSearch className="absolute left-4 top-5 text-base" />
        </div>
      </div>
      {/* Help and Support */}
      <div className="maincontainer flex gap-10 pb-10 lg:gap-7 lg:pb-16 xl:gap-10 xl:pb-20 maxlg:flex-col">
        <div className="tab-buttons flex flex-col gap-2 lg:w-full lg:max-w-[250px] 2xl:max-w-xs maxlg:order-2">
          {cats.map((cat, index) => (<button key={index} className={`flex items-center justify-between rounded-2xl border border-[rgba(0,0,0,0.15)] px-5 py-4 text-left font-semibold xl:px-6 xl:text-lg ${activeTab === cat._id ? 'active bg-b3 text-white' : 'text-b23'}`} onClick={() => handleTabClick(cat._id)}>
            <span>{cat.title}</span>
            {activeTab === cat._id ? <FiChevronRight /> : ''}
          </button>)
          )}
        </div>
        <div className="flex w-full flex-col ">
          {loading ? (
            <div className="flex  w-full items-center justify-center">
              <Image width={200} height={200} quality={100} className="h-auto w-auto" alt="Loader" src="/loader2.gif" unoptimized />
            </div>
          ) : (
            <div className={`tab-content w-full ${fadeOut ? 'fade-out' : ''}`}>
              {blogs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{blogs.map((blog, index) => <HelpAndSupportCard key={index} title={blog.title} parent="gap-3 bg-[#F8FBFB] [&>div>h6]:maxmd:text-sm text-white p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-md text-b18" child="[&>p]:text-sm text-b18 font-normal" category="help-and-support" subcategory={blog.joinedCategory.slug} slug={blog.slug} shortDescription={blog.meta.description} />)}</div>
              ) : (
                <div className="mt-10 flex h-full w-full justify-center">
                  <Image width={400} height={400} quality={100} alt="Not Found" src="/not-found.webp" className="h-36 w-36" />
                </div>
              )}
            </div>
          )}
          {pageCount > 1 ? <div className='flex justify-center' ><PaginationV2 page={page} setPage={setPage} pageCount={pageCount} /></div> : null}
        </div>
      </div>
    </>
  );
};

export default HelpAndSupport;
