"use client";

import { useUsers } from "@/lib/api/users";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import UsersTable from "./UsersTable";
import { UsersPagination } from "./UsersPagination";
import { Spinner } from "../ui/spinner";
import { ErrorState } from "../ui/error-state";

const UsersContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("/users?page=1");
    }
  }, [searchParams, router]);

  const { data, isLoading, error } = useUsers(page);
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  if (error) return <ErrorState />;
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-6rem)]">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <div className="flex-1 overflow-auto">
        <UsersTable users={data?.data || []} isLoading={isLoading} />
      </div>

      {data?.meta && !isLoading && (
        <div className="pt-4 border-t mt-4">
          <UsersPagination
            currentPage={data.meta.current_page}
            totalPages={data.meta.last_page}
          />
        </div>
      )}
    </div>
  );
};

export default UsersContent;
