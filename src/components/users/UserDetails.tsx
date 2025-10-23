"use client";
import { useUser } from "@/lib/api/users";
import UpdateUserCard from "./UpdateUserCard";
import { Spinner } from "../ui/spinner";
import { ErrorState } from "../ui/error-state";

const UserDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useUser(id);
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  if (error) return <ErrorState />;
  if (!data) return null;

  const user = data.data.attributes;
  return <UpdateUserCard user={user} />;
};

export default UserDetails;
