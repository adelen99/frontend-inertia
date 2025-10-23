"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationData } from "@/lib/types/organization";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface OrganizationsTableProps {
  organizations: OrganizationData[];
  isLoading?: boolean;
}

export function OrganizationsTable({
  organizations,
  isLoading = false,
}: OrganizationsTableProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const filteredOrganizations = useMemo(() => {
    if (!searchInput) return organizations;
    return organizations.filter((org) => {
      const searchLower = searchInput.toLowerCase();
      return org.attributes.name?.toLowerCase().includes(searchLower);
    });
  }, [organizations, searchInput]);

  const resetSearchInput = () => {
    setSearchInput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Input
            placeholder="Search organizations..."
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
            router.push("/organizations/create");
          }}
        >
          Create organization
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                </TableRow>
              ))
            : filteredOrganizations.map((org) => (
                <TableRow
                  key={org.id}
                  onClick={() => router.push(`/organizations/${org.id}/edit`)}
                >
                  <TableCell className="font-medium">
                    {org.attributes.name}
                  </TableCell>
                  <TableCell>{org.attributes.city || "-"}</TableCell>
                  <TableCell>{org.attributes.phone || "-"}</TableCell>
                  <TableCell>{org.attributes.email || "-"}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
