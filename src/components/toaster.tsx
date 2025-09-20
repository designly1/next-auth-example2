"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "@/contexts/theme-provider";

export function Toaster() {
  const { theme } = useTheme();

  return <ToastContainer position="bottom-right" theme={theme} />;
}
