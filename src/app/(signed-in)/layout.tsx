import { ReactNode } from "react";
import styles from "./layout.module.scss";
import { FaHouse, FaUser } from "react-icons/fa6";
import Link from "next/link";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
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
      </div>
      <div className={styles.children}>{children}</div>
      <div className={styles.rightSideBar}></div>
    </div>
  );
};

export default Layout;
