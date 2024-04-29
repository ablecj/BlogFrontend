'use client'
import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import CategoryCard from './CategoryCard';
// import path from 'path';

// interface for the category slider
type Category = {
  name: string;
  path: string;
  bgColor: string;
}

const CategorieSlider = () => {

  // state for handling the categories
  const [categories, setCategories] = useState<Category[]>([]);
// function for getting all the categories from the backend
  const getCategories = () =>{
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
    .then((res)=>{
      return res.json();
    })
    .then( async (response)=> {
      const tempCate = await Promise.all(
        response.categories.map(async(category: string)=> ({
          name: category,
          path: category,
          bgColor: 'white'
        }))
      )

      setCategories(tempCate);
    })
    .catch((error) => {
      console.log(error, 'error in category loging')
    })
  }

useEffect(() => {
  getCategories();
},[]);

  // dummy value for categories original value will come from the backend
  // const categories = [
  //   {
  //     name: 'Category 1',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  //   {
  //     name: 'Category 2',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  //   {
  //     name: 'Category 3',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  //   {
  //     name: 'Category 4',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  //   {
  //     name: 'Category 5',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  //   {
  //     name: 'Category 6',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  //   {
  //     name: 'Category 7',
  //     path: "#",
  //     bgColor: generate(),
  //   },
  // ]

  // function for creating the heax color
  // function createHex() {
  //   var hexCode1 = "";
  //   var hexValues1 = "0123456789abcdef";

  //   for(var i=0; i<6; i++){
  //       hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
  //   }
  //   return hexCode1; 
  // }
  // function for generating the heax color
  // function generate(){
  //   var deg = Math.floor(Math.random() * 360);

  //   var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" +  createHex() + ")";
  //   // console.log(gradient, "gradient");
  //   return gradient;
  // }


  return (
    <div className='sliderout'>
      <h1> Categories</h1>
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
          categories.map((category, index) =>{
            return (
              <SwiperSlide key={index}>
                <CategoryCard {...category} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default CategorieSlider
