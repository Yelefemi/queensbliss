import { NextResponse } from "next/server";
import { validateEmail, validatePassword, hashPassword, generateToken } from "@/lib/auth";
import { getUsers, saveUsers } from "@/lib/users";

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
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { message: passwordValidation.error },
        { status: 400 }
      );
    }

    const users = await getUsers();

    if (users.some((u) => u.email === email)) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      address,
    };

    users.push(newUser);

    await saveUsers(users);

    const token = await generateToken({ id: newUser.id, email: newUser.email, name: newUser.name });

    return NextResponse.json(
      { user: { id: newUser.id, email: newUser.email, name: newUser.name, address: newUser.address }, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { message: "Signup failed" },
      { status: 500 }
    );
  }
}
