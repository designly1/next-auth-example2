"use server";

import { exportPublicUser, getUserByEmail } from "@/data/users";
import { createUserSession } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { logServerError } from "@/lib/loggin/log-server-error";

import type { I_UserPublic } from "@/types/user";

export type ReturnType =
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

/**
 * Error messages available to the client
 */
const errorMessages = {
  USER_NOT_FOUND: "User not found",
  INVALID_PASSWORD: "Invalid password",
  DEFAULT: "An unknown error occurred",
};

export async function login(payload: I_LoginPayload): Promise<ReturnType> {
  try {
    const { email, password } = payload;

    /**
     * Get the user by email from fake database
     */
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, error: errorMessages.USER_NOT_FOUND };
    }

    /**
     * Verify the password using argon2
     */
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: errorMessages.INVALID_PASSWORD };
    }

    /**
     * This creates both the JWT and the user data cookie
     * the user data cookie is used to store the user data in the
     * auth context so it's always available to the child components
     */
    const userDataPublic = exportPublicUser(user);
    await createUserSession(userDataPublic);

    return { success: true, user: userDataPublic };
  } catch (err: unknown) {
    logServerError(err);

    /**
     * Only return the error message if it's one of the known error messages
     * otherwise return the default error message. This prevents leaking information
     * to the client.
     */
    const errorMessage =
      err instanceof Error
        ? Object.values(errorMessages).includes(err.message)
          ? err.message
          : errorMessages.DEFAULT
        : errorMessages.DEFAULT;

    return { success: false, error: errorMessage };
  }
}
