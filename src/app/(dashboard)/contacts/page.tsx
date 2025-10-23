"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContacts } from "@/lib/api/contacts";
import ContactsTable from "@/components/contacts-table";
import ContactsPagination from "@/components/contacts-pagination";

const ContactsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("/contacts?page=1");
    }
  }, [searchParams, router]);

  const { data, isLoading, error } = useContacts(page);

  if (error) return <div>Error loading contacts</div>;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Contacts</h2>
      <ContactsTable contacts={data?.data || []} isLoading={isLoading} />
      {data?.meta && !isLoading && (
        <ContactsPagination
          currentPage={data.meta.current_page}
          totalPages={data.meta.last_page}
        />
      )}
    </div>
  );
};
export default ContactsPage;
