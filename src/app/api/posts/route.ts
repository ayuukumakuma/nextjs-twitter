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
      data: { content: content, User: { connect: { id: user.id } } },
    });

    return Response.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 400 });
  }
};

export const GET = async () => {
  try {
    const user = await checkSession();
    const posts = await prisma.post.findMany({
      where: { userId: user.id },
    });

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json({ message: error });
  }
};
