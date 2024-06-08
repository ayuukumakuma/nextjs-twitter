import { auth, signOut } from "@/auth";
import styles from "./styles.module.scss";
import Image from "next/image";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className={styles.container}>
      {session && (
        <div className={styles.userInfoWrapperVertical}>
          <h1 className={styles.userInfoTitle}>Login User</h1>
          <div className={styles.userInfoWrapperHorizontal}>
            <div>
              <Image
                src={session.user?.image || ""}
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.userInfoWrapperVertical}>
              <div>name: {session.user?.name}</div>
              <div>email: {session.user?.email}</div>
            </div>
          </div>
        </div>
      )}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.signOut} type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default Home;
