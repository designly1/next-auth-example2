import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import authConfig from "@/config/auth-config";
import { kv } from "@/lib/redis";
import type { I_AuthPayload } from "@/types/jwt";
import type { I_UserPublic } from "@/types/user";

type KeyMat = { key: Uint8Array; kid: string; alg: string };

const b64urlToBytes = (s: string) => {
  const p = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = p.length % 4 === 0 ? "" : "=".repeat(4 - (p.length % 4));
  return new Uint8Array(Buffer.from(p + pad, "base64"));
};

function getAccessKey(): KeyMat {
  const keyString = process.env.JWT_CURRENT_SECRET;
  const kid = process.env.JWT_CURRENT_KID;

  if (!keyString) throw new Error("JWT_CURRENT_SECRET not found");
  if (!kid) throw new Error("JWT_CURRENT_KID not found");

  return { key: b64urlToBytes(keyString), kid, alg: authConfig.jwt.algorithm };
}

export async function signJwtToken(payload: I_AuthPayload): Promise<string> {
  const { key, kid, alg } = getAccessKey();
  const jti = nanoid();

  await kv.set(`${authConfig.jwt.kvJtiPrefix}${jti}`, payload.id, {
    ex: authConfig.jwt.expires,
  });

  return new SignJWT(payload)
    .setProtectedHeader({ alg, kid, typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${authConfig.jwt.expires}s`)
    .setIssuer(authConfig.jwt.iss)
    .setAudience(authConfig.jwt.aud)
    .setJti(jti)
    .sign(key);
}

export async function getSignedJwtToken(user: I_UserPublic) {
  const data: I_AuthPayload = {
    sub: user.id,
    email: user.email,
  };
  return await signJwtToken(data);
}

export async function setJwt(user: I_UserPublic) {
  const token = await getSignedJwtToken(user);

  const cookieStore = await cookies();
  cookieStore.set({
    ...authConfig.jwt.cookieParams,
    value: token,
  });
}

async function verifyJwtTokenBase(
  token: string,
): Promise<I_AuthPayload | null> {
  try {
    const { key } = getAccessKey();
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

export async function verifyJwtToken(
  token: string,
): Promise<I_AuthPayload | null> {
  return await verifyJwtTokenBase(token);
}

export async function verifyJwtTokenWithJti(
  token: string,
): Promise<I_AuthPayload | null> {
  const payload = await verifyJwtTokenBase(token);
  if (!payload) return null;

  if (payload.jti) {
    const jtiExists = await kv.exists(
      `${authConfig.jwt.kvJtiPrefix}${payload.jti}`,
    );
    if (!jtiExists) {
      cookieStore.delete(authConfig.jwt.cookieParams.name);
      cookieStore.delete(authConfig.jwt.userDataCookieParams.name);
      return null;
    }
  }

  return payload;
}

async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(authConfig.jwt.cookieParams.name);
  return token?.value || null;
}

export async function getJwt(): Promise<I_AuthPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  try {
    const payload = await verifyJwtToken(token);
    if (payload) return payload;
  } catch {}
  return null;
}

export async function getJwtWithJti(): Promise<I_AuthPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return await verifyJwtTokenWithJti(token);
}

export async function revokeJwt(jti: string) {
  await kv.del(`${authConfig.jwt.kvJtiPrefix}${jti}`);
  cookieStore.delete(authConfig.jwt.cookieParams.name);
  cookieStore.delete(authConfig.jwt.userDataCookieParams.name);
}

export async function logout() {
  const cookieStore = await cookies();

  const token = cookieStore.get(authConfig.jwt.cookieParams.name);
  if (token) {
    try {
      const payload = await verifyJwtToken(token.value);
      if (payload?.jti) {
        await kv.del(`${authConfig.jwt.kvJtiPrefix}${payload.jti}`);
      }
    } catch {}
  }

  cookieStore.delete(authConfig.jwt.cookieParams.name);
  cookieStore.delete(authConfig.jwt.userDataCookieParams.name);

  return true;
}

export async function setUserDataCookie(userData: I_UserPublic) {
  const cookieStore = await cookies();
  cookieStore.set({
    value: JSON.stringify(userData),
    ...authConfig.jwt.userDataCookieParams,
  });
}

export async function getUserDataCookie(): Promise<I_UserPublic | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get(authConfig.jwt.userDataCookieParams.name);
  if (!userData) return null;
  return JSON.parse(userData.value) as I_UserPublic;
}

export async function getValidatedUserData(): Promise<I_UserPublic | null> {
  const jwt = await getJwt();
  const userData = await getUserDataCookie();
  if (!userData || jwt?.sub !== userData.id) return null;
  return userData;
}

export async function createUserSession(user: I_UserPublic) {
  await setJwt(user);
  await setUserDataCookie(user);
}
