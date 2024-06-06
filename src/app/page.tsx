"use client";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data } = useSession();
  return (
    <>
      <h1>Home</h1>
      {data && <h2>Login User: {data?.user?.email}</h2>}
      {!data && <h2>Not Login</h2>}
    </>
  );
};

export default Home;
