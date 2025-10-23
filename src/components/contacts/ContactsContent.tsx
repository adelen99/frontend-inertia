"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContacts } from "@/lib/api/contacts";
import ContactsTable from "./ContactsTable";
import ContactsPagination from "./ContactsPagination";
import { Spinner } from "../ui/spinner";
import { ErrorState } from "../ui/error-state";

export default function ContactsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("/contacts?page=1");
    }
  }, [searchParams, router]);

  const { data, isLoading, error } = useContacts(page);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  if (error) return <ErrorState />;

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-6rem)]">
      <h2 className="text-2xl font-bold">Contacts</h2>
      <div className="flex-1 overflow-auto">
        <ContactsTable contacts={data?.data || []} isLoading={isLoading} />
      </div>
      {data?.meta && !isLoading && (
        <div className="pt-4 border-t mt-4">
          {" "}
          <ContactsPagination
            currentPage={data.meta.current_page}
            totalPages={data.meta.last_page}
          />
        </div>
      )}
    </div>
  );
}
