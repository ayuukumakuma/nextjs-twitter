import checkSession from "@/utils/checkSession";
import { redirect } from "next/navigation";
import Styles from "./page.module.scss";
import { FollowingList } from "@/components/FollowingList";

const Followings = async () => {
  const userId = (await checkSession()).id;

  if (!userId) redirect("/404");

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Followings</h1>
      <FollowingList userId={userId} />
    </div>
  );
};

export default Followings;
