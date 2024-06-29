import { prisma } from "@/lib/prisma/client";
import checkSession from "@/utils/checkSession";

export const GET = async (
  _: Request,
  { params }: { params: { userId: string } },
) => {
  try {
    const signInUser = await checkSession();
    const userId = params.userId;

    if (signInUser.id !== userId) throw new Error("Unauthorized");

    const followers = (
      await prisma.follow.findMany({
        where: {
          userId: {
            equals: userId,
          },
        },
        include: {
          follower: {
            include: {
              following: true,
            },
          },
        },
      })
    ).map((follow) => follow.follower);

    return Response.json({ data: followers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error }, { status: 500 });
  }
};
