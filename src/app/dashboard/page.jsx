"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardIndex() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const role = session?.user?.role;
    if (!role) return;
    router.replace(`/dashboard/${role}-home`);
  }, [session, router]);

  return null;
}