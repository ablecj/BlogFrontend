import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import HomeSlider from "@/components/Homeslider/HomeSlider";
import CategorieSlider from "@/components/Categories/CategoriesSlider";
import BlogsSlider from "@/components/blogcards/blogsSlider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeSlider />
      <CategorieSlider />
      <BlogsSlider />
      <h1>----Footer----</h1>
    </main>
  );
}
