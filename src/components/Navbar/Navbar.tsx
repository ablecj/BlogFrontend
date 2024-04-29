"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearchAlt, BiPlus, BiSolidUserCircle } from "react-icons/bi";
import logo from "@/assets/logo.png";
import Image from "next/image";
import "./Navbar.css";
import { toast } from "react-toastify";
// import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { cookies } from "next/headers";

const Navbar = () => {
  // state for checking the user is authenticted or not
  const [auth, setauth] = useState<Boolean>(false);
  console.log(auth, "auth from navbar");

  const router = useRouter();

  const handlelogout = async () => {
    try {
      // Make a POST request to the logout route in the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        }
      );

      // Check if the logout was successful
      if (response.ok) {
        console.log(Cookies, "cookies before remove from navbar handle logout")

        Cookies.remove("authToken"); 
        Cookies.remove("refreshToken"); 
        console.log(Cookies, "cookies from navbar handle logout")
        // console.log(localStorage, "localStorage before clearing");
        // localStorage.clear();
        // console.log(localStorage, "localStorage after clearing");
        // Update auth state to false
        setauth(false);

        // Redirect to the signin page
        router.push("/pages/auth/signin");
      } else {
        // Handle the error response
        console.error("Logout failed:", response.statusText);
        // Handle error message or show error to user
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error or show error to user
    }
  };

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
          setauth(true);
        } else {
          // toast(response.message, {
          //     type: 'error',
          //     position: 'top-right',
          //     autoClose: 2000
          // });
          setauth(false);
        }
      })
      .catch((err) => {
        toast(err.message, {
          type: "error",
          position: "top-right",
          autoClose: 2000,
        });
        setauth(false);
      });
  };

  useEffect(() => {
    console.log("useEffect hook called");
    checkLogin();
  }, []);

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
