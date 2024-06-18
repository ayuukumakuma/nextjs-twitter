import { signIn } from "@/auth";
import Styles from "./GoogleSignInButton.module.scss";

const GoogleSignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className={Styles.button} type="submit" />
    </form>
  );
};

export default GoogleSignInButton;
