import { NextResponse } from "next/server";
import { verifyPassword, validateEmail, generateToken } from "@/lib/auth";
import { getUsers } from "@/lib/users";

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

    const users = await getUsers();

    const user = users.find((u: any) => u.email === email);

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

    // Success (no password returned)
    const token = await generateToken({ id: user.id, email: user.email, name: user.name });
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          address: user.address,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
