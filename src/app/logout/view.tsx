"use client";

import { CheckCircle, Loader2, LogOut } from "lucide-react";
import { useRouter } from "nextjs13-progress";
import { useEffect, useState } from "react";
import type { I_ApiAuthLogoutGetResponse } from "@/app/api/v1/auth/logout/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LogoutState = "logging-out" | "complete" | "error";

export default function LogoutView() {
  const router = useRouter();
  const [state, setState] = useState<LogoutState>("logging-out");
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout");

      const result = (await response.json()) as I_ApiAuthLogoutGetResponse;

      if (result.success) {
        setState("complete");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setState("error");
        setError(result.error);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 dark:from-gray-900 to-indigo-100 dark:to-gray-800 p-4 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {state === "logging-out" && (
              <div className="relative">
                <LogOut className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                <Loader2 className="-top-1 -right-1 absolute w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            )}
            {state === "complete" && (
              <div className="relative">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
            )}
            {state === "error" && (
              <div className="relative">
                <LogOut className="w-12 h-12 text-red-600 dark:text-red-400" />
              </div>
            )}
          </div>
          <CardTitle className="text-xl">
            {state === "logging-out" && "Logging out..."}
            {state === "complete" && "Logout successful"}
            {state === "error" && "Logout failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {state === "logging-out" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Please wait while we securely log you out
              </p>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="bg-blue-600 dark:bg-blue-400 rounded-full w-2 h-2 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="bg-blue-600 dark:bg-blue-400 rounded-full w-2 h-2 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="bg-blue-600 dark:bg-blue-400 rounded-full w-2 h-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          {state === "complete" && (
            <div className="space-y-4">
              <p className="font-medium text-green-700 dark:text-green-300">
                You have been successfully logged out
              </p>
              <p className="text-muted-foreground text-sm">
                Redirecting to login page...
              </p>
            </div>
          )}
          {state === "error" && (
            <div className="space-y-4">
              <p className="font-medium text-red-700 dark:text-red-300">
                {error || "An error occurred during logout"}
              </p>
              <p className="text-muted-foreground text-sm">
                Redirecting to login page...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
