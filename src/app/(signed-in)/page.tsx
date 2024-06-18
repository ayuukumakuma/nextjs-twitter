import { PostForm } from "@/components/PostForm";
import Styles from "./page.module.scss";
import { Metadata } from "next";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "home",
};
const Home = async () => {
  return (
    <div className={Styles.container}>
      <PostForm />
      <PostList />
    </div>
  );
};

export default Home;
