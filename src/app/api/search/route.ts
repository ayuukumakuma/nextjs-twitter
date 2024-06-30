import { Select } from "@/app/(signed-in)/search/page";
import { prisma } from "@/lib/prisma/client";

export const GET = async (req: Request) => {
  try {
    const params = new URL(req.url).searchParams;
    const q = params.get("q") ?? "";
    const target = params.get("target") as Select;

    if (target === "users") {
      const result = await prisma.user.findMany({
        where: {
          name: {
            contains: q,
          },
        },
        include: {
          followers: true,
          following: true,
        },
      });

      return Response.json({ data: result }, { status: 200 });
    } else {
      const result = await prisma.post.findMany({
        where: {
          content: {
            contains: q,
          },
        },
        include: {
          user: true,
        },
      });

      return Response.json({ data: result }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: error });
  }
};
