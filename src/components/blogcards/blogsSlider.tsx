"use client";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import BlogCard from "./blogCard";
import { toast } from "react-toastify";
import { error } from "console";

// interface for the paragraph
interface paragraphData {
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  position: string;
  createdAt: Number | null;
}
// interface for the whole blog
interface Blog {
  _id: string;
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  paragraph: paragraphData[];
  category: string;
}

const BlogsSlider = () => {
  // dummy value for categories original value will come from the backend
  // const blogs = [
  //   {
  //     name: 'Category 1',
  //     path: "#",
  //     bgColor: 'gray',
  //   },
  //   {
  //     name: 'Category 2',
  //     path: "#",
  //     bgColor: 'greenyellow',
  //   },
  //   {
  //     name: 'Category 3',
  //     path: "#",
  //     bgColor: 'brown',
  //   },
  //   {
  //     name: 'Category 4',
  //     path: "#",
  //     bgColor: 'orange',
  //   },
  //   {
  //     name: 'Category 5',
  //     path: "#",
  //     bgColor: 'yellow',
  //   },
  //   {
  //     name: 'Category 6',
  //     path: "#",
  //     bgColor: 'green',
  //   },
  //   {
  //     name: 'Category 7',
  //     path: "#",
  //     bgColor: 'blue',
  //   },
  // ]

  const [blogs, setBlogs] = useState<Blog[]>([]);

  
  // function for getting the latest blogs
  const get10LatestBlogs = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          setBlogs(response.message.blogs);
        } else {
          toast(response.message, {
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast(error.message, {
          type: "error",
        });
      });
  };

  useEffect(()=> {
    get10LatestBlogs();
  },[])
  console.log(blogs, "blogs");
  return (
    <div className="sliderout">
      <h1 >
        {" "}
        Latest Blogs
      </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {blogs.map((blog, index) => {
          return (
            <SwiperSlide key={index}>
              <BlogCard {...blog} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BlogsSlider;
