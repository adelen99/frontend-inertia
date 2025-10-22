"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userMenuItems } from "@/constants/menuItems";
import { useAuthStore, User } from "@/lib/store/authStore";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function DropdownMenuUser({ user }: { user: User | null }) {
  const { logout } = useAuthStore();
  const router = useRouter();
  const handleItemClick = (label: string) => {
    if (label === "Logout") {
      logout();
    } else if (label === "Manage Users") {
      router.push("/users");
    } else if (label === "My Profile") {
      router.push(`/users/${user?.id}/edit`);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {user?.firstName}{" "}
          <span className="hidden md:flex">{user?.lastName}</span>{" "}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {userMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.label}
                onClick={() => handleItemClick(item.label)}
                className={
                  item.variant === "destructive" ? "text-destructive" : ""
                }
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {item.label}
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
