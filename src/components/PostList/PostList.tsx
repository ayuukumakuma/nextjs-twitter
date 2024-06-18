"use client";

import { Post, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Styles from "./PostList.module.scss";
import Image from "next/image";
import { format } from "date-fns/format";

type PostListItem = Post & {
  userIconUrl: string;
  userName: string;
};

export const PostList = () => {
  const [posts, setPosts] = useState<PostListItem[]>([]);

  // TODO: 差分だけ更新したい
  const fetchPosts = async () => {
    try {
      const postResponse = await fetch("/api/posts", {
        method: "GET",
      });
      const postData: Post[] = await postResponse.json();

      // Promise.allで非同期処理をまとめて実行
      const data: PostListItem[] = await Promise.all(
        postData.map(async (data: Post) => {
          const userResponse = await fetch(`/api/users/${data.userId}`, {
            method: "GET",
          });
          const userData: User = await userResponse.json();

          return {
            ...data,
            userIconUrl: userData.image || "",
            userName: userData.name || "",
          };
        }),
      );

      // 投稿日時の降順にソート
      data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      setPosts(data);
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

  const convertDate = (date: Date) => {
    return format(date, "yyyy/MM/dd HH:mm:ss");
  };

  return (
    <div className={Styles.container}>
      {posts.map((post) => (
        <div className={Styles.tweetCard} key={post.id}>
          <div className={Styles.info}>
            <div className={Styles.leftWrapper}>
              <Image
                className={Styles.userIcon}
                src={post.userIconUrl}
                alt="user's icon"
                width={50}
                height={50}
              />
              <div className={Styles.userInfoText}>
                <div className={Styles.userName}>{post.userName}</div>
                <div className={Styles.userId}>ID: {post.userId}</div>
              </div>
            </div>
            <div className={Styles.rightWrapper}>
              Posted At: {convertDate(post.createdAt)}
            </div>
          </div>
          <div className={Styles.content}>{post.content}</div>
        </div>
      ))}
    </div>
  );
};
