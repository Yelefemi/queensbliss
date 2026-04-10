import { NextResponse } from "next/server";
import {
  generateToken,
  hashPassword,
  type Address,
  validateEmail,
  validatePassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function normalizeAddress(address: unknown): Address | undefined {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return undefined;
  }

  const candidate = address as Record<string, unknown>;

  return {
    street: String(candidate.street ?? ""),
    city: String(candidate.city ?? ""),
    state: String(candidate.state ?? ""),
    zip: String(candidate.zip ?? ""),
  };
}

export async function POST(req: Request) {
  try {
    const { name, email, password, address } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { message: passwordValidation.error },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const normalizedAddress = normalizeAddress(address);
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address: normalizedAddress ?? undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
      },
    });

    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      address: normalizedAddress,
    });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          address: normalizedAddress,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}
