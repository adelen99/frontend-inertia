"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuthStore } from "@/lib/store/authStore";
import { DropdownMenuUser } from "@/components/dropdown";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex h-16 items-center gap-4 border-b px-4">
          <SidebarTrigger />

          {/* Desktop - full header */}
          <div className="hidden md:flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold">
              <Link href="/">BinarCode</Link>
            </h1>
            <div>
              <span className="flex">
                <DropdownMenuUser user={user} />
              </span>
            </div>
          </div>

          {/* Mobile - compact header */}
          <div className="flex md:hidden items-center  justify-between w-full">
            <h1 className="text-lg font-semibold">
              <Link href="/">BinarCode</Link>
            </h1>

            <div>
              <span className="flex">
                <DropdownMenuUser user={user} />
              </span>
            </div>
          </div>
        </header>

        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
