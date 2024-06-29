"use client";
import { Follow, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FollowingCard } from "../FollowingCard";
import Styles from "./FollowingList.module.scss";

type Props = {
  userId: string;
};

export type Following = User & {
  followers: Follow[];
};

export const FollowingList = ({ userId }: Props) => {
  const [followings, setFollowings] = useState<Following[]>([]);

  const fetchFollower = async () => {
    try {
      const res = await fetch(`/api/users/${userId}/followings`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch followers");
      }
      const data: Following[] = (await res.json()).data;

      setFollowings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickUnFollowButton = async ({
    followerId,
  }: {
    followerId: string;
  }) => {
    try {
      await fetch(`/api/users/${followerId}/follow/?followerId=${userId}`, {
        method: "DELETE",
      });
      fetchFollower();
    } catch (error) {
      console.error(error);
    }
  };

  const isFollowBack = ({ followers }: { followers: Follow[] }) => {
    return followers.some((follower) => follower.userId === userId);
  };

  useEffect(() => {
    fetchFollower();
  }, []);

  return (
    <ul className={Styles.followingList}>
      {followings.map((following) => (
        <FollowingCard
          key={following.id}
          following={following}
          handleClickUnFollowButton={handleClickUnFollowButton}
          isFollowBack={isFollowBack({ followers: following.followers })}
        />
      ))}
    </ul>
  );
};
