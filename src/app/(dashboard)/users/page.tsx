"use client";
import { UsersPagination } from "@/components/users-pagination";
import UsersTable from "@/components/users-table";
import { useUsers } from "@/lib/api/users";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const UsersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("/users?page=1");
    }
  }, [searchParams, router]);

  const { data, isLoading, error } = useUsers(page);
  if (error) return <div>Error loading users</div>;
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Users</h2>
      <UsersTable users={data?.data || []} isLoading={isLoading} />
      {data?.meta && !isLoading && (
        <UsersPagination
          currentPage={data.meta.current_page}
          totalPages={data.meta.last_page}
        />
      )}
    </div>
  );
};

export default UsersPage;
