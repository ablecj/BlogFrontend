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

// const width = window.innerWidth;
// const height = window.innerHeight;

const HomeSlider = () => {
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
        <SwiperSlide>
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
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
