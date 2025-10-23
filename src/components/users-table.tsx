"use client";
import { UserData } from "@/lib/types/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";

interface UsersTableProps {
  users: UserData[];
  isLoading?: boolean;
}

const UsersTable = ({ users, isLoading = false }: UsersTableProps) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchInput) return users;
    return users.filter((user) => {
      const searchLower = searchInput.toLowerCase();
      return (
        user.attributes.first_name?.toLowerCase().includes(searchLower) ||
        user.attributes.last_name?.toLowerCase().includes(searchLower) ||
        user.attributes.email?.toLowerCase().includes(searchLower)
      );
    });
  }, [users, searchInput]);
  const resetSearchInput = () => {
    setSearchInput("");
  };
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Input
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={resetSearchInput} variant="secondary">
            Reset
          </Button>
        </div>
        <Button
          onClick={() => {
            router.push("/users/create");
          }}
        >
          Create user
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              onClick={() => {
                router.push(`/users/${user.attributes.id}/edit`);
              }}
              key={user.attributes.id}
            >
              <TableCell className="font-medium">
                {user.attributes.first_name} {user.attributes.last_name}
              </TableCell>
              <TableCell>{user.attributes.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.attributes.role === "owner" ? "default" : "secondary"
                  }
                >
                  {user.attributes.role === "owner" ? "Owner" : "User"}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/users/${user.attributes.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
