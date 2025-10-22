import {
  Building2,
  FileText,
  Home,
  LucideIcon,
  User,
  Users,
  LogOut,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface UserMenuItem {
  label: string;
  shortcut?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "destructive";
}

export const menuItems: MenuItem[] = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Organizations", href: "/organizations", icon: Building2 },
  { title: "Contacts", href: "/contacts", icon: Users },
  { title: "Reports", href: "/reports", icon: FileText },
];
export const userMenuItems: UserMenuItem[] = [
  {
    label: "My Profile",
    shortcut: "⌘P",
    icon: User,
  },
  {
    label: "Manage Users",
    shortcut: "⌘U",
    icon: Users,
  },
  {
    label: "Logout",
    shortcut: "⌘Q",
    icon: LogOut,
    variant: "destructive",
  },
];
