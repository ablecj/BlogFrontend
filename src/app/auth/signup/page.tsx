import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import '../auth.css';

export default function Signup() {
  return (
    <div className="aouthout">
      <Navbar />
       <div className="authin">
        <div className="left"></div>
        <div className="right">
            <form style={{
                display: "flex",
                flexDirection: "column",
            }} >
                <h1>Sign Up</h1>
                <div className="forminput_cont">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" />
                </div>
                <div className="forminput_cont">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your name" />
                </div>
                <div className="forminput_cont">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your name" />
                </div>
                <div className="forminput_cont">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Enter your name" />
                </div>

                <button type="button" className="main_button">Register</button>
                <p className="authlink">Already have an account ? <Link href='/auth/signin'>Login</Link></p>
            </form>
        </div>
       </div>
    </div>
  );
}
