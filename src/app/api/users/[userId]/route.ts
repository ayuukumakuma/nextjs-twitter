import { prisma } from "@/lib/prisma/client";
import checkSession from "@/utils/checkSession";
import { NextResponse } from "next/server";

export const GET = async (
  _: NextResponse,
  { params }: { params: { userId: string } },
) => {
  try {
    await checkSession();

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: params.userId },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
};
