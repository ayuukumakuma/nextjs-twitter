import { ReactNode } from "react";
import Styles from "./layout.module.scss";
import {
  FaArrowRightToBracket,
  FaHouse,
  FaMagnifyingGlass,
  FaUser,
} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "home",
};

const Layout = async ({ children }: Props) => {
  const session = await auth();
  if (!session || !session?.user) return;
  return (
    <div className={Styles.container}>
      <div className={Styles.leftSideBar}>
        <div className={Styles.linkWrapper}>
          <Link className={Styles.link} href="/">
            Home
            <FaHouse size={"30"} color={"#373a40"} />
          </Link>
          <Link className={Styles.link} href={`/users/${session.user.id}`}>
            Profile
            <FaUser size={"30"} color={"#373a40"} />
          </Link>
          <Link className={Styles.link} href="/search">
            Search
            <FaMagnifyingGlass size={"30"} color={"#373a40"} />
          </Link>
        </div>
        <div className={Styles.profileCard}>
          <Link href={`/users/${session.user.id}`}>
            <div className={Styles.profileCardUserInfo}>
              <Image
                className={Styles.profileImage}
                src={session.user?.image || ""}
                alt="Picture of the author"
                width={50}
                height={50}
              />
              <div className={Styles.profileUserName}>{session.user?.name}</div>
            </div>
          </Link>
          <form
            className={Styles.form}
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
      <div className={Styles.children}>{children}</div>
      <div className={Styles.rightSideBar}></div>
    </div>
  );
};

export default Layout;
