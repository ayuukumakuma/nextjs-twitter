import { prisma } from "@/lib/prisma/client";
import checkSession from "@/utils/checkSession";

export const GET = async (
  _: Request,
  { params }: { params: { userId: string } },
) => {
  try {
    const userId = params.userId;

    const posts = await prisma.post.findMany({
      where: { userId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json({ message: error });
  }
};
