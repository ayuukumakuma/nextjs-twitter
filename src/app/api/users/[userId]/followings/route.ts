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

    const followings = (
      await prisma.follow.findMany({
        where: {
          followerId: {
            equals: userId,
          },
        },
        include: {
          user: {
            include: {
              followers: true,
            },
          },
        },
      })
    ).map((follow) => follow.user);

    return Response.json({ data: followings }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error }, { status: 500 });
  }
};
