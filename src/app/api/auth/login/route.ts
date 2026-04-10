import { NextResponse } from "next/server";
import { generateToken, type Address, validateEmail, verifyPassword } from "@/lib/auth";
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
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        address: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await verifyPassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const normalizedAddress = normalizeAddress(user.address);
    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      address: normalizedAddress,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          address: normalizedAddress,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
