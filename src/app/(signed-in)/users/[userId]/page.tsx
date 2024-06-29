"use client";
import { auth, signOut } from "@/auth";
import Styles from "./page.module.scss";
import Image from "next/image";
import { Metadata } from "next";
import { Post, User as UserType } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PostList, PostListItem } from "@/components/PostList";

const User = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [myPosts, setMyPosts] = useState<PostListItem[]>([]);

  if (!params || !params.userId) router.push("/404");

  const fetchUser = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}`);
    const user = await res.json();

    setUser(user);
  };

  const fetchFollowers = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}/followers`);
    const followers = (await res.json()).data;
    setFollowerCount(followers.length);
  };

  const fetchFollowings = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}/followings`);
    const followings = (await res.json()).data;
    setFollowingCount(followings.length);
  };

  const fetchMyPosts = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}/posts`);
    const posts = await res.json();
    setMyPosts(posts);
  };

  useEffect(() => {
    fetchUser(params.userId);
    fetchFollowers(params.userId);
    fetchFollowings(params.userId);
    fetchMyPosts(params.userId);
  }, [params.userId]);

  return (
    <div className={Styles.container}>
      {user && (
        <div className={Styles.userInfoWrapperVertical}>
          <h1 className={Styles.userInfoTitle}>Login User</h1>
          <div className={Styles.userInfoWrapperHorizontal}>
            <div>
              <Image
                className={Styles.userInfoImage}
                src={user.image || ""}
                alt="Picture of the author"
                width={120}
                height={120}
              />
            </div>
            <div className={Styles.userInfoTextWrapper}>
              <div className={Styles.userInfoText}>name: {user.name}</div>
              <div className={Styles.userInfoText}>email: {user.email}</div>
              <div className={Styles.userInfoWrapperHorizontal}>
                <Link
                  className={Styles.followLink}
                  href={`/users/${user.id}/followers`}
                >
                  {`Followers: ${followerCount}`}
                </Link>
                <Link
                  className={Styles.followLink}
                  href={`/users/${user.id}/followings`}
                >
                  {`Followings: ${followingCount}`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={Styles.myTweets}>My Tweets</div>
      <PostList posts={myPosts} />
    </div>
  );
};

export default User;
