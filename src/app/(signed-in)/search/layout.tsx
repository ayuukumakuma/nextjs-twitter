import { auth } from "@/auth";
import { Provider } from "@/components/Provider";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "search",
};

const Layout = async ({ children }: Props) => {
  const session = await auth();
  return <Provider session={session}>{children}</Provider>;
};

export default Layout;
