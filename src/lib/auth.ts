import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Add to .env

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
} {
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }
  return { valid: true };
}

export async function generateToken(payload: any): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch {
    return null;
  }
}
