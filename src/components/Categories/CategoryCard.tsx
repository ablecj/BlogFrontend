import React from 'react'
import './CategoryCard.css'



// define the type of the data
interface Category {
  name: string;
  path: string;
  bgColor: string;
}


const CategoryCard = (data : Category) => {

  const {name, path, bgColor} = data;

  // console.log(bgColor, "color");

  return (
    <div className='categorycard'>
      <p
      style={{ fontSize: '14px'}}
      >{name}</p>
    </div>
  )
}

export default CategoryCard
