import { prisma } from "@/lib/prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type SignUpRequestBody = {
  name: string;
  email: string;
  password: string;
};

export const POST = async (req: NextResponse) => {
  try {
    if (req.body === null) {
      return new Response("Request body is null", { status: 400 });
    }

    const data = (await req.json()) as SignUpRequestBody;
    const isExisting = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (isExisting) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword: hashedPassword,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 400 });
  }
};
