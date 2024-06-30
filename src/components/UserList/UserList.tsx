"use client";
import { UserCard } from "../UserCard";
import { useSession } from "next-auth/react";
import { UserType } from "@/app/(signed-in)/search/page";
import { Follow } from "@prisma/client";

type Props = {
  users: UserType[];
  onAction?: () => void;
};

export const UserList = ({ users, onAction }: Props) => {
  const session = useSession();
  const userId = session?.data?.user?.id ?? "";

  const handleClickFollowButton = async ({
    followerId,
  }: {
    followerId: string;
  }) => {
    try {
      await fetch(`/api/users/${followerId}/follow/?followerId=${userId}`, {
        method: "POST",
      });
      onAction?.();
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
      onAction?.();
    } catch (error) {
      console.error(error);
    }
  };

  const isFollowing = ({ following }: { following: Follow[] }) => {
    if (!following) return false;
    return following.some((following) => following.followerId === userId);
  };

  const isFollowBack = ({ followers }: { followers: Follow[] }) => {
    return followers.some((follower) => follower.userId === userId);
  };

  return (
    <ul>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          handleClickFollowButton={handleClickFollowButton}
          handleClickUnFollowButton={handleClickUnFollowButton}
          isFollowing={isFollowing({ following: user.following })}
          isFollowBack={isFollowBack({ followers: user.followers })}
        />
      ))}
    </ul>
  );
};
