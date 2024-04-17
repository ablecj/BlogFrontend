'use client'

import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import './addblog.css';
import { useEffect,useState,useRef } from 'react';
import {toast} from 'react-toastify';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ClockLoader } from 'react-spinners';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


// interface for paragaraph data
interface paragraphData {
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  position:   string;
  createdAt: Number | null;
}
// interface for form data
interface FormData {
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  paragraph: paragraphData[];
  category: string;
}



const AddBlog = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
// calling the checklogin function know the user is verified or not
const checkLogin = async () => {
   
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response)



      if (response.ok) {
      

      } else {
        
        router.push("/pages/auth/signin");
          
      }
    })
    .catch((error) => {
      router.push("/pages/auth/signin")

    })
};

useEffect(() => {
  checkLogin();
}, []);

// state for managing the blog 
const [blog, setBlog] = useState<FormData>({
  title: '',
  description: '',
  image: null,
  imageUrl: '',
  paragraph: [],
  category: '',
})
// state for handling the catogeries
const [categories, setCategories] = useState<string[]>([]);

// function for fetching the categotries from the backend
const getCategories = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
    .then((res) => {
      return res.json()
    })
    .then((response) => {
      // console.log(response.categories)
      setCategories(response.categories)
    })
    .catch((error) => {
      console.log(error)
    })
}
useEffect(() => {
  getCategories()
}, []);

// state for paragraph 
const [paragraphForm, setParagraphForm] = useState<paragraphData>({
  title: '',
  description: '',
  image: null,
  imageUrl: '',
  position: '',
  createdAt: null
})
// function for push the blogs paragraph
const pushParagraphToBlog  = ()=>{
  let tempPg = paragraphForm;
  tempPg.createdAt = new Date().getTime();
  setBlog({
    ...blog,
    paragraph: [
      ...blog.paragraph, paragraphForm
    ]
  })

  let nextPosition = String(parseInt(paragraphForm.position) + 1);
  setParagraphForm({
    ...paragraphForm,
    title: '',
    description: '',
    position: nextPosition,
    createdAt: null
  })
}

// function for deleting the paragraph
const deleteParagraph = (paragraph: paragraphData)=>{}

  return (
    <div>
        <Navbar />
        <div className='adblog_in'>
          <h1 className='head1'>Add Blog</h1>
          <form style={{
            width: '70%',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div className='forminput_cont'>
              <label >Blog Name</label>
              <input type="text" placeholder='Enter the Blog title' />
            </div>
            <div className='forminput_cont'>
            <label>Blog Category</label>
            <select
              value={blog.category} // Set the selected category value
              onChange={(e) => setBlog({ ...blog, category: e.target.value })} // Update the selected category
            >
              <option value="">Select a category</option> {/* Default option */}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
            <div className='forminput_cont'>
              <label >Blog description</label>
              <textarea placeholder='Enter Blog Description' />
            </div>
            <div className='forminput_cont'>
                <label>Blog Image</label>
                <input type='file' />
              </div>
              {/* blog paragrapg */}
              <div className='paragraph'>
                <div className='forminput_cont'>
                  <label >Paragraph Position</label>
                  <input type="number"
                  value={paragraphForm.position}
                  placeholder='Enter the paragraph position'
                  onChange={(e)=> setParagraphForm({...paragraphForm , position: e.target.value})} />
                </div>
                <div className='forminput_cont'>
                  <label >Paragraph Title</label>
                  <input type="text"
                  value={paragraphForm.title}
                  placeholder='Enter the paragraph position'
                  onChange={(e)=> setParagraphForm({...paragraphForm , title: e.target.value})} />
                </div>
                <div className='forminput_cont'>
                  <label >Paragraph Description</label>
                  <textarea 
                  value={paragraphForm.description}
                  placeholder='Enter the paragraph position'
                  onChange={(e)=> setParagraphForm({...paragraphForm , description: e.target.value})} />
                </div>
                <div className='forminput_cont'>
                  <label >Paragraph Image</label>
                  <input type="file" id='pgimg'
                  onChange={(e)=> {
                    const selectedImage = e.target.files?.[0];
                    if(selectedImage){
                      // const imageUrl = URL.createObjectURL(selectedImage); 
                      setParagraphForm({...paragraphForm, image: selectedImage})
                    }
                  }}
                  />
                </div>
              </div>

              <button type="submit" className='main_button'
              onClick={(e)=> {
                e.preventDefault();
                pushParagraphToBlog();
              }}>Add Paragraph To Blog</button>

              <button type="submit" className='main_button'>Submit</button>
          </form>
        </div>
    </div>
  )
}

export default AddBlog
