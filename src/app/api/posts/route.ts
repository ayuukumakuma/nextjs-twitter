import { prisma } from "@/lib/prisma/client";
import checkSession from "@/utils/checkSession";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const user = await checkSession();
    const body = await req.json();
    const content = body.content;

    if (content === "") throw new Error("Content is required");

    const post = await prisma.post.create({
      data: { content: content, user: { connect: { id: user.id } } },
    });

    return Response.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 400 });
  }
};

export const GET = async () => {
  try {
    const currentUser = await checkSession();
    if (!currentUser || !currentUser.id) throw new Error("Unauthorized");

    const userIds = await prisma.follow
      .findMany({
        where: { followerId: currentUser.id },
        select: { userId: true },
      })
      .then((follows) => follows.map((follow) => follow.userId));

    userIds.push(currentUser.id);

    const posts = await prisma.post.findMany({
      where: { userId: { in: userIds } },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json({ message: error });
  }
};
