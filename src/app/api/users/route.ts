import { prisma } from "@/lib/prisma/client";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
};
