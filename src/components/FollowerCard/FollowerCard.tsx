import Styles from "./FollowerCard.module.scss";
import Image from "next/image";
import { FaUserLargeSlash, FaUserPlus } from "react-icons/fa6";
import { Follower } from "@/components/FollowerList";

type Props = {
  follower: Follower;
  handleClickUnFollowButton: ({ followerId }: { followerId: string }) => void;
  handleClickFollowButton: ({ followerId }: { followerId: string }) => void;
  isFollowBack: boolean;
};

export const FollowerCard = ({
  follower,
  handleClickUnFollowButton,
  handleClickFollowButton,
  isFollowBack,
}: Props) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.followerCard}>
        <div className={Styles.leftContent}>
          <Image
            className={Styles.icon}
            src={follower.image ?? ""}
            alt="profile icon"
            width={50}
            height={50}
          />
          <div className={Styles.userInfo}>
            <div className={Styles.userName}>{follower.name}</div>
            <div className={Styles.userId}>ID: {follower.id}</div>
          </div>
        </div>
        <div className={Styles.rightContent}>
          {isFollowBack ? (
            <button
              className={Styles.unFollowButton}
              onClick={() =>
                handleClickUnFollowButton({ followerId: follower.id })
              }
            >
              <FaUserLargeSlash size={"32"} />
              Unfollow
            </button>
          ) : (
            <button
              className={Styles.followButton}
              onClick={() =>
                handleClickFollowButton({ followerId: follower.id })
              }
            >
              <FaUserPlus size={"32"} />
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
