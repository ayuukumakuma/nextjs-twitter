import { prisma } from "@/lib/prisma/client";
import checkSession from "@/utils/checkSession";
import { NextRequest } from "next/server";

const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const query = new URL(req.url).searchParams;
    const followerId = query.get("followerId") ?? "";
    const userId = params.userId;

    const followUser = await getUser(followerId);

    const user = await getUser(userId);

    if (!followUser) throw new Error("Follow User not found");
    if (!user) throw new Error("User not found");

    await prisma.follow.create({
      data: {
        userId: user.id,
        followerId: followUser.id,
      },
    });

    return Response.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const signInUser = await checkSession();

    const query = new URL(req.url).searchParams;
    const followerId = query.get("followerId") ?? "";
    const userId = params.userId;

    const followUser = await getUser(followerId);

    const user = await getUser(userId);

    if (!followUser) throw new Error("Follow User not found");
    if (!user) throw new Error("User not found");

    await prisma.follow.delete({
      where: {
        // 複合主キーの場合は、以下のように指定する
        userId_followerId: {
          userId: user.id,
          followerId: followUser.id,
        },
      },
    });

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error }, { status: 500 });
  }
};
