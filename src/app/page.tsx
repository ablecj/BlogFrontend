'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import HomeSlider from "@/components/Homeslider/HomeSlider";
import CategorieSlider from "@/components/Categories/CategoriesSlider";
import BlogsSlider from "@/components/blogcards/blogsSlider";
import Footer from "@/components/Footer/Footer";
import { toast } from "react-toastify";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

// check login functionality for checking the user is authenticated or not
const checkLogin = () =>{
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin` , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then((res)=> {
    return res.json();
  })
  .then((response)=> {
    console.log(response);
    if(response.ok){
      // toast(response.message, {
      //   type: "success",
      //   position: 'top-right',
      //   autoClose: 2000
      // });
      router.push('/');
    }
    else{
      // toast(response.message, {
      //   type: 'error',
      //   position: 'top-right',
      //   autoClose: 2000
      // });
      router.push( '/pages/auth/signin');
    }
  })
  .catch((error)=> {
    router.push('/pages/auth/signin');
  })
}

useEffect(()=>{
  checkLogin();
},[])

  return (
    <main>
      <Navbar />
      <HomeSlider />
      <CategorieSlider />
      <BlogsSlider />
      <Footer />
    </main>
  );
}
