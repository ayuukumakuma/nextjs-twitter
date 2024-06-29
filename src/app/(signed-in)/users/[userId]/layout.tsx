import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "profile",
};
const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
