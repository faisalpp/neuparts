'use client'
import React, { useEffect, useState } from 'react'
import ApplianceDetail from '@/components/Appliances/ApplianceDetail'
import { RiArrowDropRightLine } from 'react-icons/ri'
import NewsLetterSection from '@/components/NewsLetterSection'
import RecentStories from '@/components/Blogs/RecentStories'
import { AiOutlineArrowDown } from 'react-icons/ai'

const Blogs = () => {
  const [page, setPage] = useState(1)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [moreLoading,setMoreLoading] = useState(false)
  const [pageCount,setPageCount] = useState(null)
  const [limit,setLimit] = useState(10)

  const FetchBlogs = async () => {

    if(!moreLoading){
      setLoading(true)
    }
  
    fetch(`/api/front/blog/general/all?page=${page}&limit=${limit}`)  
     .then((res) => res.json())
     .then((data) => {
      if(data.blogs.length > 0){
        setPageCount(data.pagination.pageCount)
        setBlogs((blogs)=>[...blogs,...data.blogs])
      }else{
        setBlogs([])
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
          <div className="mx-auto w-full px-4 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20 xl:py-20 2xl:px-120px 3xl:max-w-1680px">
            {/* Bread Crumbs Start */}
            <div className="flex items-center">
              <h5 className="text-xs text-b3">Home</h5>
              <RiArrowDropRightLine className="text-xl text-b19" />
              <h5 className="text-xs text-black">Blog</h5>
            </div>
            {/* Bread Crumbs End */}
            <ApplianceDetail title="Appliance Industry Blog" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phasellus non felis eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula." />

            <button type="button" className="mt-6 inline-flex items-center gap-1 rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3">
              See All Stories{' '}
              <span>
                <AiOutlineArrowDown className="text-base" />
              </span>
            </button>
          </div>

          {/* Recent Stories */}
          <RecentStories loading={loading} moreLoading={moreLoading} setMoreLoading={setMoreLoading} data={blogs} page={page} setPage={setPage} pageCount={pageCount} />

          <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  )
}

export default Blogs
