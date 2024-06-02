import { prisma } from "@/lib/prisma/client";
import { NextRequest } from "next/server";
import * as bcrypt from "bcrypt";

type SignUpRequestBody = {
  name: string;
  email: string;
  password: string;
};

export const POST = async (req: NextRequest) => {
  try {
    if (req.body === null) return;
    const data = (await req.json()) as SignUpRequestBody;
    const isExisting = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (isExisting) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword: await bcrypt.hash(data.password, 10),
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
};
