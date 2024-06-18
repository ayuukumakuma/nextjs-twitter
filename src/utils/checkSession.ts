import { auth } from "@/auth";

const checkSession = async () => {
  const session = await auth();
  const currentUser = session?.user;

  if (!session || !currentUser) throw new Error("Unauthorized");

  return currentUser;
};

export default checkSession;
