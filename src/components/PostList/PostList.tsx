import Styles from "./PostList.module.scss";
import Image from "next/image";
import { format } from "date-fns/format";
import { Post, User } from "@prisma/client";

export type PostListItem = Post & {
  user: User;
};

export const PostList = ({ posts }: { posts: PostListItem[] }) => {
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
                src={post.user.image ?? ""}
                alt="user's icon"
                width={50}
                height={50}
              />
              <div className={Styles.userInfoText}>
                <div className={Styles.userName}>{post.user.name}</div>
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
