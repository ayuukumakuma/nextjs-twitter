import { ReactNode } from "react";
import styles from "./layout.module.scss";
import { FaArrowRightToBracket, FaHouse, FaUser } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

type Props = {
  children: ReactNode;
};
const Layout = async ({ children }: Props) => {
  const session = await auth();
  if (!session) return;
  return (
    <div className={styles.container}>
      <div className={styles.leftSideBar}>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/">
            Home
            <FaHouse size={"30"} color={"#373a40"} />
          </Link>
          <Link className={styles.link} href="/profile">
            Profile
            <FaUser size={"30"} color={"#373a40"} />
          </Link>
        </div>
        <div className={styles.profileCard}>
          <Link href="/profile">
            <div className={styles.profileCardUserInfo}>
              <Image
                className={styles.profileImage}
                src={session.user?.image || ""}
                alt="Picture of the author"
                width={50}
                height={50}
              />
              <div className={styles.profileUserName}>{session.user?.name}</div>
            </div>
          </Link>
          <form
            className={styles.form}
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/hello" });
            }}
          >
            <button type="submit">
              <FaArrowRightToBracket size={"30"} color={"#373a40"} />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
      <div className={styles.rightSideBar}></div>
    </div>
  );
};

export default Layout;
