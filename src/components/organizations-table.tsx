// components/organizations-table.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationData } from "@/lib/types/organization";

interface OrganizationsTableProps {
  organizations: OrganizationData[];
  isLoading?: boolean;
}

export function OrganizationsTable({
  organizations,
  isLoading = false,
}: OrganizationsTableProps) {
  return (
    <Table>
      <TableCaption>A list of your organizations.</TableCaption>
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
          ? // Skeleton rows
            Array.from({ length: 10 }).map((_, i) => (
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
          : // Real data
            organizations.map((org) => (
              <TableRow key={org.id}>
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
  );
}
