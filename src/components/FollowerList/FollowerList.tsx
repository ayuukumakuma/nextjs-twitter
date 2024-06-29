"use client";
import { Follow, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FollowerCard } from "../FollowerCard";

type Props = {
  userId: string;
};

export type Follower = User & {
  following: Follow[];
};

export const FollowerList = ({ userId }: Props) => {
  const [followers, setFollowers] = useState<Follower[]>([]);

  const fetchFollower = async () => {
    try {
      const res = await fetch(`/api/users/${userId}/followers`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch followers");
      }
      const data: Follower[] = (await res.json()).data;

      setFollowers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickFollowButton = async ({
    followerId,
  }: {
    followerId: string;
  }) => {
    try {
      await fetch(`/api/users/${followerId}/follow/?followerId=${userId}`, {
        method: "POST",
      });
      fetchFollower();
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

  const isFollowBack = ({ following }: { following: Follow[] }) => {
    console.log(following);
    if (!following) return false;
    return following.some((following) => following.followerId === userId);
  };

  useEffect(() => {
    fetchFollower();
  }, []);

  return (
    <div>
      <ul>
        {followers.map((follower) => (
          <FollowerCard
            key={follower.id}
            follower={follower}
            handleClickFollowButton={handleClickFollowButton}
            handleClickUnFollowButton={handleClickUnFollowButton}
            isFollowBack={isFollowBack({ following: follower.following })}
          />
        ))}
      </ul>
    </div>
  );
};
