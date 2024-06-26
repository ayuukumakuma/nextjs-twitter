import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export const Provider = async ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
