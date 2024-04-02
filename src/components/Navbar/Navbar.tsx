import Link from "next/link";
import React from "react";
import { BiSearchAlt, BiPlus, BiSolidUserCircle } from "react-icons/bi";
import logo from "@/assets/logo.png";
import Image from "next/image";
import './Navbar.css';

const Navbar = () => {
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
      <div className="navbar-right">
        <Link href="/">Home</Link>
        <Link href="/pages/about">About</Link>
        <Link href="/pages/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
