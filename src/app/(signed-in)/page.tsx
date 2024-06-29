"use client";
import { PostForm } from "@/components/PostForm";
import Styles from "./page.module.scss";
import { PostList, PostListItem } from "@/components/PostList";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<PostListItem[]>([]);

  const fetchPosts = async () => {
    try {
      const postResponse = await fetch("/api/posts", {
        method: "GET",
      });
      const postData: PostListItem[] = await postResponse.json();

      setPosts(postData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const timer = setInterval(() => {
      fetchPosts();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.title}>Time Line</div>
      <PostForm />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
