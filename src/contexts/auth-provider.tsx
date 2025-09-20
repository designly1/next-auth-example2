"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type { I_ApiAuthGetResponse } from "@/app/api/v1/auth/route";
import type { I_UserPublic } from "@/types/user";

type AuthProviderProps = {
  children: React.ReactNode;
  userData: I_UserPublic | null;
};

type AuthProviderState = {
  user: I_UserPublic | null;
  reloadUserData: () => Promise<void>;
};

const initialState: AuthProviderState = {
  user: null,
  reloadUserData: () => Promise.resolve(),
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, userData }: AuthProviderProps) {
  const pathname = usePathname();

  const [user, setUser] = useState<I_UserPublic | null>(userData);

  /**
   * Reload the user data from the server
   * This simply gets the user data cookie validated against the JWT
   * So no unnecessary database call!
   */
  async function reloadUserData() {
    const response = await fetch("/api/v1/auth");
    const data = (await response.json()) as I_ApiAuthGetResponse;

    if (data.authenticated) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }

  /**
   * Reload the user data when the pathname changes
   * This is to ensure that the user data is always up to date
   * and that the user is logged in
   */
  useEffect(() => {
    reloadUserData();
  }, [pathname]);

  return (
    <AuthProviderContext.Provider value={{ user, reloadUserData }}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthProviderContext);
};
