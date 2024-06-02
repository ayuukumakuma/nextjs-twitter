import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma/client";

const isValidCredentials = (
  credentials: Record<"email" | "password", string> | undefined,
): credentials is Record<"email" | "password", string> => {
  return (
    typeof credentials?.email === "string" &&
    typeof credentials?.password === "string"
  );
};

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "user",
      name: "User",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!isValidCredentials(credentials)) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
};
