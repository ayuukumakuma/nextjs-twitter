import { auth, signOut } from "@/auth";
import Styles from "./page.module.scss";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "profile",
};

const Profile = async () => {
  const session = await auth();

  return (
    <div className={Styles.container}>
      {session && (
        <div className={Styles.userInfoWrapperVertical}>
          <h1 className={Styles.userInfoTitle}>Login User</h1>
          <div className={Styles.userInfoWrapperHorizontal}>
            <div>
              <Image
                src={session.user?.image || ""}
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </div>
            <div className={Styles.userInfoWrapperVertical}>
              <div>name: {session.user?.name}</div>
              <div>email: {session.user?.email}</div>
            </div>
          </div>
        </div>
      )}
      ここに投稿ユーザーが自分のものだけを表示する(現在のタイムラインのロジック)
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/hello" });
        }}
      >
        <button className={Styles.signOut} type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default Profile;
