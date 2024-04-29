"use client";

import React, { useEffect, useState } from "react";
import img1 from "@/assets/sliderTemp/img1.jpg";
import img2 from "@/assets/sliderTemp/img2.webp";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { toast } from "react-toastify";

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


const HomeSlider = () => {

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


  // state for setting the dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensons = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight / 2,
      });
    };

    updateDimensons();

    // update dimensions when the window is resized
    window.addEventListener("resize", updateDimensons);

    // cleanup conde for the unmount
    return () => {
      window.removeEventListener("resize", updateDimensons);
    };
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <Image
            priority={true}
            src={img1}
            alt="slide"
            style={{
              objectFit: "cover",
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            priority={true}
            src={img2}
            alt="slide"
            style={{
              objectFit: "cover",
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
        </SwiperSlide> */}

        {
          blogs.length > 0 &&
          blogs.map((blog) =>{
            return (
              <SwiperSlide>
                <Image
            priority={true}
            src={blog.imageUrl}
            alt="slide"
            width={dimensions.width}
            height={dimensions.height}
            style={{
              objectFit: "cover",  
            }}
          />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
};

export default HomeSlider;
