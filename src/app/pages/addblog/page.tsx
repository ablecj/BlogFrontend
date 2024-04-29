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
const deleteParagraph = (paragraph: paragraphData)=>{
  const updateParagraph = blog.paragraph.filter((p)=> p.createdAt !== paragraph.createdAt);
  setBlog({
    ...blog,
    paragraph: updateParagraph,
  })
}

// sorting the paragraph 
const sortParagraphs = (a: paragraphData, b: paragraphData) => {
  if (a.position === b.position) {
    return b.createdAt! - a.createdAt!;
  }
  return a.position.localeCompare(b.position);
}

// this function is used to create the image into a url for saving inside the database 
const uploadImage = async(image: File)=>{
  try {
    const formData = new FormData();
    formData.append('myimage', image);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image/uploadimage`, {
      method: 'POST',
      body: formData,
    });
    if(response.ok){
      const data = await response.json();
      console.log('image uploaded sucessfully', data);
      return data.imageUrl;
    }else{
      // Handle the case where the request failed
      console.error('Failed to upload the image:');
      return null;
    }


  } catch (error) {
    console.log('ERROR:', error);
    return null;
  }
}
// upload the blog to the database
const uploadBlog = async()=>{
  checkLogin();
  // checking the all fields are added
  if(!blog.title || !blog.description || !blog.category){
    toast('Please fill in all required fields. ');
    return;
  }

  setLoading(true);
  const tempBlog = blog;
  if(blog.image){
    let imgUrl = await uploadImage(blog.image);
    tempBlog.imageUrl = imgUrl;
    // console.log('temp blog', tempBlog);
  }
  for( let i = 0; i < tempBlog.paragraph.length; i++ ){
    let tempImg = tempBlog.paragraph[i].image;
    if(tempImg){
      let ImgURL = await uploadImage(tempImg);
      tempBlog.paragraph[i].imageUrl = ImgURL;
    }
  }
// calling the backend to post the datas from the frontend to the datbase
const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(blog),
  credentials: 'include'
});
if(response.ok){
  const data = await response.json();
  toast('Blog Post Created Successfully !');
  setLoading(false);
}else{
  toast('Failed To Create The Blog Post !');
  setLoading(false);
}

}

  return (
    <div>
      {
        loading &&
        <div className='loaderfullpage'>
          <ClockLoader 
            color='#36d7b7'
            loading= {loading}
            size={200}
            aria-label='Loading-Spinner'
            data-testid='loader'
          />
        </div>
      }
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
              <input type="text" 
              placeholder='Enter the Blog title' 
              value={blog.title}
              onChange={(e)=> setBlog({...blog, title: e.target.value})}/>
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
              <textarea placeholder='Enter Blog Description'
                value={blog.description}
                onChange={(e)=> setBlog({...blog, description: e.target.value})}
              />
            </div>
            <div className='forminput_cont'>
                <label>Blog Image</label>
                <input type='file'
                  onChange={(e)=> {
                    const selectedImage = e.target.files?.[0] //get the selected image files
                    if(selectedImage){
                      setBlog({...blog, image: selectedImage});
                    }
                  }}
                />
              </div>

              {/* sorting the temp blog paragraphs that we are added */}
              <div className='blogtempparagraphs'>
                {
                  blog.paragraph.sort(sortParagraphs).map((paragraph)=> (
                    <div key={String(paragraph.createdAt)}>
                      <AiFillCloseCircle 
                      className='closebtn'
                      onClick={()=> {deleteParagraph(paragraph)}}
                      />

                      <div className='section1'>
                        <h1>{paragraph.title}</h1>
                        <p>{paragraph.description}</p>
                      </div>
                      {paragraph.image && <img src={URL.createObjectURL(paragraph.image)} alt={`Image for ${paragraph.title}`} />}
                    </div>
                  ))
                }
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
                  placeholder='Enter the paragraph title'
                  onChange={(e)=> setParagraphForm({...paragraphForm , title: e.target.value})} />
                </div>
                <div className='forminput_cont'>
                  <label >Paragraph Description</label>
                  <textarea 
                  value={paragraphForm.description}
                  placeholder='Enter the paragraph description'
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

              <button type="submit" className='main_button'
              onClick={(e)=> {
                e.preventDefault();
                uploadBlog()
              }}
              >Submit</button>
          </form>
        </div>
    </div>
  )
}

export default AddBlog
