"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoLogin from "./LogoLogin";
import { LoginCard } from "./LoginCard";

export function LoginPageClient() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [isLoading, user, router]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <LogoLogin />
      <LoginCard />
    </div>
  );
}
