"use client"
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';
import BlogCard from './blogCard';

const BlogsSlider = () => {

     // dummy value for categories original value will come from the backend
  const blogs = [
    {
      name: 'Category 1',
      path: "#",
      bgColor: 'gray',
    },
    {
      name: 'Category 2',
      path: "#",
      bgColor: 'greenyellow',
    },
    {
      name: 'Category 3',
      path: "#",
      bgColor: 'brown',
    },
    {
      name: 'Category 4',
      path: "#",
      bgColor: 'orange',
    },
    {
      name: 'Category 5',
      path: "#",
      bgColor: 'yellow',
    },
    {
      name: 'Category 6',
      path: "#",
      bgColor: 'green',
    },
    {
      name: 'Category 7',
      path: "#",
      bgColor: 'blue',
    },
  ]

    return (
    <div>
         <h1
      style={{fontSize: "20px",
      fontWeight: "400",
      margin: "10px 5px"
      }}
      > Last Blogs</h1>
       <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          blogs.map((blog, index) =>{
            return (
              <SwiperSlide key={index}>
                <BlogCard {...blog} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default BlogsSlider
