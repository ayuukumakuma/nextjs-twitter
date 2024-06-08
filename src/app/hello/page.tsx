import GoogleSignInButton from "@/components/GoogleSignInButton";
import styles from "./styles.module.scss";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Hello = async () => {
  const session = await auth();

  // 認証されている場合はリダイレクト
  if (session) redirect("/");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello!!</h1>
      <div className={styles.description}>
        To view the timeline, you need to sign in! :)
      </div>
      <GoogleSignInButton />
    </div>
  );
};

export default Hello;
