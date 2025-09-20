import { NextResponse } from "next/server";
import { getValidatedUserData } from "@/lib/auth/jwt";

import type { I_UserPublic } from "@/types/user";

export type I_ApiAuthGetResponse =
  | {
      authenticated: true;
      user: I_UserPublic;
    }
  | {
      authenticated: false;
    };

export async function GET(): Promise<NextResponse<I_ApiAuthGetResponse>> {
  /**
   * Get the user data from the cookie and validate it against the JWT
   * This is to ensure that the user data is always up to date
   * and that the user is logged in
   */
  const userData = await getValidatedUserData();
  if (!userData) {
    return NextResponse.json({ authenticated: false });
  }

  //! IDEA: update the user's last seen timestamp here :)

  return NextResponse.json({ authenticated: true, user: userData });
}
