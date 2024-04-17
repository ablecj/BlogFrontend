'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearchAlt, BiPlus, BiSolidUserCircle } from "react-icons/bi";
import logo from "@/assets/logo.png";
import Image from "next/image";
import "./Navbar.css";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // state for checking the user is authenticted or not
  const [auth, setAuth] = useState<Boolean>(false);

  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.ok) {
          // toast(response.message, {
          //     type: 'success',
          //     position: 'top-right',
          //     autoClose: 2000
          // })

          // window.location.href = "/auth/signin"
          setAuth(true);
        } else {
          // toast(response.message, {
          //     type: 'error',
          //     position: 'top-right',
          //     autoClose: 2000
          // });
          setAuth(false);
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

  useEffect(() => {
    checkLogin(); // Call the checkLogin function on route change
}, []);

  const router = useRouter();
  // handlelogout function logic 
  const handlelogout = async()=>{
    await deleteCookie('authToken');
    await deleteCookie('refreshToken');
    router.push('/pages/auth/signin');
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/pages/profile" className="link">
          <BiSolidUserCircle className="icon" />
        </Link>
        <Link href="/pages/addblog" className="link">
          <BiPlus className="icon" />
        </Link>
        <Link href="/search" className="link">
          <BiSearchAlt className="icon" />
        </Link>
      </div>
      <div className="navbar-middle">
        <Link href="/">
          <Image className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      {auth ? (
        <div className="navbar-right">
          <Link href="/">Home</Link>
          <Link href="/pages/about">About</Link>
          <Link href="/pages/contact">Contact</Link>

          <button onClick={handlelogout}>Logout</button>
        </div>
      ) : (
        <div className="navbar-right">
          <Link href="/pages/auth/signin">
            <button>Login</button>
          </Link>
          <Link href="/pages/auth/signup">
            <button>Signup</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
