import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import '../auth.css';

export default function Signin() {
  return (
    <div className="aouthout">
      <Navbar />
       <div className="authin">
        <div className="left"></div>
        <div className="right">
            <form style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <h1>Sign In</h1>
               
                <div className="forminput_cont">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your name" />
                </div>
                <div className="forminput_cont">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your name" />
                </div>
             

                <button type="button" className="main_button">Login</button>
                <p className="authlink">Don't have an account ? <Link href='/auth/signup'>Register</Link></p>
            </form>
        </div>
       </div>
    </div>
  );
}
