import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export type Address = {
  street: string;
  city: string;
  state: string;
  zip?: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  address?: Address;
};

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

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

export async function generateToken(payload: AuthUser): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

    return {
      id: String(payload.id ?? ""),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      address:
        payload.address && typeof payload.address === "object" && !Array.isArray(payload.address)
          ? {
              street: String(payload.address.street ?? ""),
              city: String(payload.address.city ?? ""),
              state: String(payload.address.state ?? ""),
              zip: String(payload.address.zip ?? ""),
            }
          : undefined,
    };
  } catch {
    return null;
  }
}
