"use client";

import { useOrganization } from "@/lib/api/organizations";
import UpdateOrganizationCard from "./update-organization-card";

const OrganizationDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useOrganization(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return null;

  const org = data.data.attributes;
  return <UpdateOrganizationCard organization={org} />;
};

export default OrganizationDetails;
