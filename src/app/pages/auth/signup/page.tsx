'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import '../auth.css';
import {toast} from 'react-toastify';
import React, { useState } from "react";
import BlogLogo from '@/assets/BLOG.png'
import { useRouter } from "next/navigation";



// creating a type for the formdata
interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export default function Signup() {

    // useRouter for the routing
    const router = useRouter()

    // creating a state for the formdata
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    // state for controlling the error
    const [errors, setErrors] = useState<Record<string , string>>({});

    // function for handling the changes inside the input values
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // sending the data tot the backend part
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        setErrors({});
        e.preventDefault();
        console.log(process.env.NEXT_PUBLIC_BACKEND_API)
        console.log(formData);
        const validationError: Record<string, string> ={}
        if(!formData.email){
            validationError.email = '* Email verification required !'
        }
        if(!formData.password){
            validationError.password = '* Password field is required !'
        }
        if(formData.password !== formData.confirmPassword){
            validationError.confirmPassword = '* password didnt match'
        }

        if(Object.keys(validationError).length > 0 ){
            setErrors(validationError);
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((res)=>{
            return res.json();
        })
        .then((response)=>{
            if(response.ok){
                toast(response.message,{
                    type: 'success',
                    position: 'top-right',
                    autoClose: 2000
                })
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                })
                // navigation
                router.push('/pages/auth/signin');
               
                
            }else{
                toast(response.message,{
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                })
            }
        })
        .catch((error)=>{
            toast(error.message,{
                type: 'error',
                position: 'top-right',
                autoClose: 2000
            })
        })

       
    }

  return (
    <div className="aouthout">
      <Navbar />
       <div className="authin">
        <div className="left">
            <Image src={BlogLogo} alt="logo" className="image" />
        </div>
        <div className="right">
            <form style={{
                display: "flex",
                flexDirection: "column",
            }} 
            onSubmit={handleSubmit}
            >
                <h1>Sign Up</h1>
                <div className="forminput_cont">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    />
                    {errors.name && (<span className="formerror">{errors.name}</span>)}
                </div>
                <div className="forminput_cont">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" 
                    name="email" value={formData.email}
                     onChange={handleChange} />
                     {errors.email && (<span className="formerror">{errors.email}</span>)}
                </div>
                <div className="forminput_cont">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" 
                    name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && (<span className="formerror">{errors.password}</span>)}
                </div>
                <div className="forminput_cont">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="re-enter your Password" 
                    name="confirmPassword" value={formData.confirmPassword}
                    onChange={handleChange} />
                    {errors.confirmPassword && (<span className="formerror">{errors.confirmPassword}</span>)}
                </div>

                <button type="submit" className="main_button">Register</button>
                <p className="authlink">Already have an account ? <Link href='/pages/auth/signin'>Login</Link></p>
            </form>
        </div>
       </div>
    </div>
  );
}
