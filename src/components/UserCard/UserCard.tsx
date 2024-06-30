import Styles from "./UserCard.module.scss";
import Image from "next/image";
import { FaUserLargeSlash, FaUserPlus } from "react-icons/fa6";
import { User } from "@prisma/client";
import Link from "next/link";

type Props = {
  user: User;
  handleClickUnFollowButton: ({ followerId }: { followerId: string }) => void;
  handleClickFollowButton: ({ followerId }: { followerId: string }) => void;
  isFollowing: boolean;
  isFollowBack: boolean;
};

export const UserCard = ({
  user,
  handleClickUnFollowButton,
  handleClickFollowButton,
  isFollowing,
  isFollowBack,
}: Props) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.followerCard}>
        <div className={Styles.leftContent}>
          <Image
            className={Styles.icon}
            src={user.image ?? ""}
            alt="profile icon"
            width={50}
            height={50}
          />
          <Link href={`/users/${user.id}`} className={Styles.userInfo}>
            <div className={Styles.userName}>{user.name}</div>
            <div className={Styles.userId}>ID: {user.id}</div>
          </Link>
        </div>
        <div className={Styles.rightContent}>
          {isFollowing ? (
            <button
              className={Styles.unFollowButton}
              onClick={() => handleClickUnFollowButton({ followerId: user.id })}
            >
              <FaUserLargeSlash size={"32"} />
              Unfollow
            </button>
          ) : (
            <button
              className={Styles.followButton}
              onClick={() => handleClickFollowButton({ followerId: user.id })}
            >
              <FaUserPlus size={"32"} />
              Follow
            </button>
          )}
          {isFollowBack && (
            <div className={Styles.followdText}>You are being followed</div>
          )}
        </div>
      </div>
    </div>
  );
};
