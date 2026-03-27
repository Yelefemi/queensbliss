import fs from "fs/promises";
import path from "path";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip?: string;
  };
}

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveUsers(users: User[]) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}
