import { NextResponse } from "next/server";
import { logout } from "@/lib/auth/jwt";
import { logServerError } from "@/lib/loggin/log-server-error";

export type I_ApiAuthLogoutGetResponse =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

const errorMessages = {
  DEFAULT: "An unknown error occurred",
};

export async function GET(): Promise<NextResponse<I_ApiAuthLogoutGetResponse>> {
  try {
    await logout();
    return NextResponse.json({ success: true });
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
