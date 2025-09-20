import { jwtVerify } from "jose";
import authConfig from "@/config/auth-config";

import type { I_AuthPayload } from "@/types/jwt";

const b64urlToBytes = (s: string) => {
  const p = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = p.length % 4 === 0 ? "" : "=".repeat(4 - (p.length % 4));
  // Use atob for base64 decoding (edge-compatible)
  const binaryString = atob(p + pad);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export async function verifyJwtTokenEdge(
  token: string,
): Promise<I_AuthPayload | null> {
  try {
    const keyString = process.env.JWT_CURRENT_SECRET;
    if (!keyString) throw new Error("JWT_CURRENT_SECRET not found");
    const key = b64urlToBytes(keyString);
    const { payload } = (await jwtVerify(token, key, {
      issuer: authConfig.jwt.iss,
      audience: authConfig.jwt.aud,
      algorithms: [authConfig.jwt.algorithm],
      typ: "JWT",
      clockTolerance: authConfig.jwt.clockTolerance,
    })) as { payload: I_AuthPayload };
    return payload;
  } catch {
    return null;
  }
}
