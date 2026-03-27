import type { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword } from "@/lib/auth"; // Your bcrypt verify function
import fs from "fs";
import path from "path";

type User = {
  name: string;
  email: string;
  password: string; // hashed password
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    // Load users JSON - replace this with your actual user DB or data source
    const filePath = path.join(process.cwd(), "data", "users.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const users: User[] = JSON.parse(jsonData);

    // Find user by email
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password with bcrypt
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // TODO: Generate and return JWT or session if using authentication tokens

    // For now, return success and user info (excluding password)
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
