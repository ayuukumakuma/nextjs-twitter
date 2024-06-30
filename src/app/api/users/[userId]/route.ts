import { prisma } from "@/lib/prisma/client";

export const GET = async (
  _: Request,
  { params }: { params: { userId: string } },
) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: params.userId },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
};
