"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiFetch("/auth/me");
      } catch (err: any) {
        if (err.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [router]);

  return null;
}