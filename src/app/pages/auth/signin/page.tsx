'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import "../auth.css";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlogLogo from '@/assets/BLOG.png'


// interface for formData
interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
 
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, 'name');
    console.log(value, 'val')
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(setFormData, 'setform')
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors({});
    e.preventDefault();

    const validationError: Record<string, string> = {};
    console.log(validationError, "valerr")

    if (!formData.email) {
      validationError.email = "* Email is a required field";
    }
    if (!formData.password) {
      validationError.password = "* Password is a required field";
    }
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(async (response) => {
        if (response.ok) {
          toast(response.message, {
            type: "success",
            position: "top-right",
            autoClose: 2000,
          });

          checkLogin();
        } else {
          toast(response.message, {
            type: "error",
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast(error.message, {
          type: "error",
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  const router = useRouter();
  const checkLogin = async ()=> {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then((res)=>{
      return res.json();
    })
    .then((response)=>{
      if(response.ok){
        console.log(response);
        router.push('/');
      }else{
        // toast(response.message, {
        //   type: 'error',
        //   position: 'top-right',
        //   autoClose: 2000
        // })
      }
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  return (
    <div className="aouthout">
      <Navbar />
      <div className="authin">
        <div className="left">
          <Image src={BlogLogo} alt="logo" className="image"/>
        </div>
        <div className="right">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <h1>Sign In</h1>

            <div className="forminput_cont">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your name"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="formerror">{errors.email}</span>
              )}
            </div>
            <div className="forminput_cont">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your name"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="formerror">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="main_button">
              Login
            </button>
            <p className="authlink">
              Don't have an account ?{" "}
              <Link href="/pages/auth/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
