"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar/Navbar";
import "./blogpage.css";
import Image from "next/image";
import BlogsSlider from "@/components/blogcards/blogsSlider";
import Footer from "@/components/Footer/Footer";
import { ClockLoader } from "react-spinners";

// interface for the paragraph
interface paragraphData {
  _id: string;
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
  imageUrl: string;
  paragraph: paragraphData[];
  category: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

const BlogPage = () => {
  // state for handling the loading
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const blogid = searchParams.get("blogid");
  console.log(blogid);

  const [blog, setBlog] = useState<Blog>({
    _id: "",
    title: "",
    description: "",
    imageUrl: "",
    paragraph: [],
    category: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
  });
  console.log(blog, "blog from blogapp page");
  //   state for createdat
  const [createdat, setCreatedAt] = useState<string>("");
  // function for gettig the blog by id
  const getBlogById = async () => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog/${blogid}`, {
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
        setLoading(false);
        if (response.ok) {
          console.log(response.data.blog, "resposne from fetch");
          setBlog(response.data.blog);
          const formattedDate = formatDate(response.data.blog.createdAt);
          setCreatedAt(formattedDate);
        } else {
          toast(response.message, {
            type: "error",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message, {
          type: "error",
        });
      });
  };

  useEffect(() => {
    getBlogById();
    window.scrollTo(0, 0);
  }, []);

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const MonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${date} ${MonthNames[monthIndex]} ${year}`;
  }

  return (
    <div className="blogpage_out">
      <Navbar />

      {loading && blog._id == '' ? (
        <div className="loaderfullpage">
          <ClockLoader
            color="#36d7b7"
            loading={loading}
            size={200}
            aria-label="Loading-Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="blogpage">
          <div className="c1">
            <p className="createdat">Created at {createdat}</p>
            <p className="title">{blog.title}</p>
            <p className="category">{blog.category}</p>

            {
              blog.imageUrl.length > 0 &&
              <Image
              src={blog.imageUrl}
              alt={blog.title}
              height={100}
              width={100}
              className="blogimg"
              unoptimized
            />
            }
            <p className="description">{blog.description}</p>
          </div>
          {blog.paragraph.map((paragraph: paragraphData, index) => (
            <div className={index % 2 === 0 ? "c2left" : "c2right"} key={index}>
              {paragraph.imageUrl.length > 0 && (
                <Image
                  src={paragraph.imageUrl}
                  alt={blog.title}
                  width={100}
                  height={100}
                  className="paraimg"
                  unoptimized
                />
              )}
              <div>
                <p className="title">{paragraph.title}</p>
                <p className="description">{paragraph.description}</p>
              </div>
            </div>
          ))}
          <BlogsSlider />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;
