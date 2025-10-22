import { useQuery } from "@tanstack/react-query";
import { OrganizationsResponse } from "../types/organization";
import { apiRestify } from "./client";

async function fetchOrganizations(
  page: number
): Promise<OrganizationsResponse> {
  return apiRestify<OrganizationsResponse>(
    `/organizations?page=${page}&per_page=10`
  );
}

async function fetchAllOrganizations(): Promise<OrganizationsResponse> {
  return apiRestify<OrganizationsResponse>(`/organizations`);
}

export function useOrganizations(page: number) {
  return useQuery<OrganizationsResponse>({
    queryKey: ["organizations", page],
    queryFn: () => fetchOrganizations(page),
  });
}

export function useAllOrganizations() {
  return useQuery<OrganizationsResponse>({
    queryKey: ["organizations", "all"],
    queryFn: fetchAllOrganizations,
  });
}
