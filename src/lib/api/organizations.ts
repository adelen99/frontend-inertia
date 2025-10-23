import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OrganizationsResponse,
  SingleOrganizationData,
} from "../types/organization";
import { apiRestify } from "./client";
import { OrganizationFormData } from "../validations/organization";

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

async function fetchOrganization(id: string): Promise<SingleOrganizationData> {
  return apiRestify<SingleOrganizationData>(`/organizations/${id}`);
}

async function updateOrganization(
  id: string,
  data: Partial<OrganizationFormData>
): Promise<SingleOrganizationData> {
  return apiRestify<SingleOrganizationData>(`/organizations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function deleteOrganization(id: string): Promise<void> {
  console.log("🗑️ Deleting organization ID:", id);
  console.log("🗑️ Full URL:", `/organizations/${id}`);
  return apiRestify<void>(`/organizations/${id}`, {
    method: "DELETE",
  });
}

async function createOrganization(
  data: OrganizationFormData
): Promise<SingleOrganizationData> {
  return apiRestify<SingleOrganizationData>(`/organizations`, {
    method: "POST",
    body: JSON.stringify(data),
  });
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
    queryFn: () => fetchAllOrganizations(),
  });
}

export function useOrganization(id: string) {
  return useQuery<SingleOrganizationData>({
    queryKey: ["organizations", id],
    queryFn: () => fetchOrganization(id),
    enabled: !!id,
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<OrganizationFormData>;
    }) => updateOrganization(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["organizations", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}
export function useDeleteOrganization() {
  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationFormData) => createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}
