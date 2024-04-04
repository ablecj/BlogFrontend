import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import './addblog.css';

const AddBlog = () => {
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
                  <label >Paragraph Title</label>
                  <input type="text" placeholder='Enter Paragraph Description' />
                </div>
                <div className='forminput_cont'>
                  <label >Paragraph Description</label>
                  <textarea  placeholder='Enter paragraph description' />
                </div>
                <div className='forminput_cont'>
                  <label >Paragraph Image</label>
                  <input type="text" placeholder='Enter Paragraph Description' />
                </div>
                <button type="submit" className='main_button'>Add More Paragraph</button>
              </div>
              <button type="submit" className='main_button'>Submit</button>
          </form>
        </div>
    </div>
  )
}

export default AddBlog
