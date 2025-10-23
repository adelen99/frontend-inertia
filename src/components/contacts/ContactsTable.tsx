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
import { ContactData } from "@/lib/types/contacts";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ContactsTablePage {
  contacts: ContactData[];
  isLoading?: boolean;
}

const ContactsTable = ({ contacts, isLoading = false }: ContactsTablePage) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    if (!searchInput) return contacts;
    return contacts.filter((contact) => {
      const searchLower = searchInput.toLowerCase();
      return (
        contact.attributes.first_name?.toLowerCase().includes(searchLower) ||
        contact.attributes.last_name?.toLowerCase().includes(searchLower)
      );
    });
  }, [contacts, searchInput]);

  const resetSearchInput = () => {
    setSearchInput("");
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Input
            placeholder="Search contacts..."
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
            router.push("/contacts/create");
          }}
        >
          Create contact
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Phone</TableHead>
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
            : filteredContacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  onClick={() => router.push(`/contacts/${contact.id}/edit`)}
                >
                  <TableCell className="font-medium">
                    {contact.attributes.first_name}{" "}
                    {contact.attributes.last_name}
                  </TableCell>
                  <TableCell>
                    {contact.attributes.organization_name || "-"}
                  </TableCell>
                  <TableCell>{contact.attributes.city || "-"}</TableCell>
                  <TableCell>{contact.attributes.phone || "-"}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactsTable;
