import { prisma } from "@/lib/prisma/client";

export const GET = async (
  _: Request,
  { params }: { params: { userId: string } },
) => {
  try {
    const userId = params.userId;

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
