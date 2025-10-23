"use client";

import { useOrganization } from "@/lib/api/organizations";
import UpdateOrganizationCard from "./UpdateOrganizationCard";
import { Spinner } from "../ui/spinner";
import { ErrorState } from "../ui/error-state";

const OrganizationDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useOrganization(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  if (error) return <ErrorState />;
  if (!data) return null;

  const org = data.data.attributes;
  return <UpdateOrganizationCard organization={org} />;
};

export default OrganizationDetails;
