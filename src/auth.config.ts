import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

export default {
  providers: [google],

  // idをsessionに含める
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
