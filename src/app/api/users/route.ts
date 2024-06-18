import { prisma } from "@/lib/prisma/client";
import checkSession from "@/utils/checkSession";

export const GET = async () => {
  try {
    await checkSession();

    const users = await prisma.user.findMany();

    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
};
