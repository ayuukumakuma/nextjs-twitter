import Styles from "./FollowingCard.module.scss";
import Image from "next/image";
import { FaUserLargeSlash, FaUserPlus } from "react-icons/fa6";
import { Following } from "../FollowingList";

type Props = {
  following: Following;
  handleClickUnFollowButton: ({ followerId }: { followerId: string }) => void;
  isFollowBack: boolean;
};

export const FollowingCard = ({
  following,
  handleClickUnFollowButton,
  isFollowBack,
}: Props) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.followerCard}>
        <div className={Styles.leftContent}>
          <Image
            className={Styles.icon}
            src={following.image ?? ""}
            alt="profile icon"
            width={50}
            height={50}
          />
          <div className={Styles.userInfo}>
            <div className={Styles.userName}>{following.name}</div>
            <div className={Styles.userId}>ID: {following.id}</div>
          </div>
        </div>
        <div className={Styles.rightContent}>
          <button
            className={Styles.unFollowButton}
            onClick={() =>
              handleClickUnFollowButton({ followerId: following.id })
            }
          >
            <FaUserLargeSlash size={"32"} />
            Unfollow
          </button>
          {isFollowBack && (
            <div className={Styles.followdText}>You are being followed</div>
          )}
        </div>
      </div>
    </div>
  );
};
