import { hash, verify } from "@node-rs/argon2";
import authConfig from "@/config/auth-config";

export async function verifyPassword(password: string, hash: string) {
  return await verify(hash, password, authConfig.argon2);
}

export async function hashPassword(password: string) {
  return await hash(password, authConfig.argon2);
}
