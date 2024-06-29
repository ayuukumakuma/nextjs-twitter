import { FollowerList } from "@/components/FollowerList";
import checkSession from "@/utils/checkSession";
import { redirect } from "next/navigation";
import Styles from "./page.module.scss";

const Followers = async () => {
  const userId = (await checkSession()).id;

  if (!userId) redirect("/404");

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Followers</h1>
      <FollowerList userId={userId} />
    </div>
  );
};

export default Followers;
