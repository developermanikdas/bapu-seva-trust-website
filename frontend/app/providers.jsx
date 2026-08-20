'use client';

import { useEffect } from "react";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function GlobalAlertInterceptor() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.alert = (message) => {
        const msg = String(message ?? "");
        const lower = msg.toLowerCase();
        if (
          lower.includes("fail") ||
          lower.includes("error") ||
          lower.includes("invalid") ||
          lower.includes("missing")
        ) {
          toast.error("Alert Notification", {
            description: msg,
            duration: 5000,
          });
        } else if (
          lower.includes("success") ||
          lower.includes("granted") ||
          lower.includes("recorded") ||
          lower.includes("thank")
        ) {
          toast.success("Success", {
            description: msg,
            duration: 5000,
          });
        } else if (lower.includes("warn") || lower.includes("please") || lower.includes("caution")) {
          toast.warning("Notice", {
            description: msg,
            duration: 5000,
          });
        } else {
          toast.info("System Message", {
            description: msg,
            duration: 5000,
          });
        }
      };
    }
  }, []);

  return null;
}

export function Providers({ children }) {
  return (
    <TooltipProvider>
      <GlobalAlertInterceptor />
      <Sonner />
      <Toaster />
      {children}
    </TooltipProvider>
  );
}
