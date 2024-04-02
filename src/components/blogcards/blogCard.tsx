import React from 'react'


interface Blog {
    name: string;
    bgColor: string;
}

const BlogCard = (blog: Blog) => {

    const {name, bgColor} = blog;

  return (
    <div style={{
        width: '300px',
        height: '500px',
        background: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p
        style={{color: 'black', fontSize: '15px'}}
        >{name}</p>
      </div>
  )
}

export default BlogCard
