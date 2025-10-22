"use client";
import { OrganizationsTable } from "@/components/organizations-table";
import { OrganizationsPagination } from "@/components/organizations-pagination";
import { useOrganizations } from "@/lib/api/organizations";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const OrganizationsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("/organizations?page=1");
    }
  }, [searchParams, router]);

  const { data, isLoading, error } = useOrganizations(page);

  if (error) return <div>Error loading organizations</div>;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Organizations</h2>
      <OrganizationsTable
        organizations={data?.data || []}
        isLoading={isLoading}
      />

      {data?.meta && !isLoading && (
        <OrganizationsPagination
          currentPage={data.meta.current_page}
          totalPages={data.meta.last_page}
        />
      )}
    </div>
  );
};
export default OrganizationsPage;
