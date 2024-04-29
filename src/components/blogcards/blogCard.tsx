import { useRouter } from 'next/navigation';
import React from 'react'
import './blogCard.css'

interface paragraphData {
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
  image: File | null;
  imageUrl: string;
  paragraph: paragraphData[];
  category: string;
}


const BlogCard = (data: Blog) => {

    const {_id, imageUrl, title, } = data;

    const router = useRouter();
   console.log(_id, "id ")

  return (
    <div
    className='blogcard'
    onClick={() => {
        // router.push(`/pages/blogpage?blogid=${_id}`)
        window.location.href = `/pages/blogpage?blogid=${_id}`
    }}
>
    <div className='blogimg'
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
    >

    </div>
    <p >
        {title}
    </p>
</div>
  )
}

export default BlogCard
