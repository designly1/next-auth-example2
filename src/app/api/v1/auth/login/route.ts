import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { exportPublicUser, getUserByEmail } from "@/data/users";
import { createUserSession } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { logServerError } from "@/lib/loggin/log-server-error";

import type { I_UserPublic } from "@/types/user";

export type I_ApiLoginResponse =
  | {
      success: true;
      user: I_UserPublic;
    }
  | {
      success: false;
      error: string;
    };

interface I_LoginPayload {
  email: string;
  password: string;
}

const errorMessages = {
  USER_NOT_FOUND: "User not found",
  INVALID_PASSWORD: "Invalid password",
  INVALID_REQUEST: "Invalid request body",
  DEFAULT: "An unknown error occurred",
};

export async function POST(
  request: NextRequest,
): Promise<NextResponse<I_ApiLoginResponse>> {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: errorMessages.INVALID_REQUEST },
        { status: 400 },
      );
    }

    const { email, password }: I_LoginPayload = body;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: errorMessages.USER_NOT_FOUND },
        { status: 401 },
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: errorMessages.INVALID_PASSWORD },
        { status: 401 },
      );
    }

    const userDataPublic = exportPublicUser(user);
    await createUserSession(userDataPublic);

    return NextResponse.json({ success: true, user: userDataPublic });
  } catch (err: unknown) {
    logServerError(err);

    const errorMessage =
      err instanceof Error
        ? Object.values(errorMessages).includes(err.message)
          ? err.message
          : errorMessages.DEFAULT
        : errorMessages.DEFAULT;

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
