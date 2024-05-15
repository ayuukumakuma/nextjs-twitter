import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    if (req.method !== "POST")
      return NextResponse.json({ message: "Bad Request" }, { status: 405 });

    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return NextResponse.json({ message: "Email taken" }, { status: 422 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};