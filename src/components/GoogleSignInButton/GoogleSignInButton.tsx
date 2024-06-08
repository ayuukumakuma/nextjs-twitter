import { signIn } from "@/auth";
import styles from "./styles.module.scss";

const GoogleSignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className={styles.button} type="submit" />
    </form>
  );
};

export default GoogleSignInButton;
