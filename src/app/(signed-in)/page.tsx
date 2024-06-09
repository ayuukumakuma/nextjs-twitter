import styles from "./page.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "home",
};
const Home = async () => {
  return <div className={styles.container}>Time Line</div>;
};

export default Home;
