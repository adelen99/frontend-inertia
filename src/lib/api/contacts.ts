import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactsResponse, SingleContactData } from "../types/contacts";
import { apiRestify } from "./client";
import { ContactFormValues } from "../validations/contacts";

async function fetchAllContacts(): Promise<ContactsResponse> {
  return apiRestify<ContactsResponse>("/contacts");
}

async function fetchContacts(page: number): Promise<ContactsResponse> {
  return apiRestify<ContactsResponse>(`/contacts?page=${page}&per_page=10`);
}

async function fetchContact(id: string): Promise<SingleContactData> {
  return apiRestify<SingleContactData>(`/contacts/${id}`);
}

async function createContact(
  data: ContactFormValues
): Promise<SingleContactData> {
  const payload = {
    ...data,
    organization_id: parseInt(data.organization_id, 10),
  };
  return apiRestify<SingleContactData>(`/contacts`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateContact({
  id,
  data,
}: {
  id: string;
  data: ContactFormValues;
}): Promise<SingleContactData> {
  const payload = {
    ...data,
    organization_id: parseInt(data.organization_id, 10),
  };
  return apiRestify<SingleContactData>(`/contacts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

async function deleteContact(id: string): Promise<void> {
  return apiRestify<void>(`/contacts/${id}`, {
    method: "DELETE",
  });
}

export function useAllContact() {
  return useQuery<ContactsResponse>({
    queryKey: ["contacts", "all"],
    queryFn: () => fetchAllContacts(),
  });
}

export function useContacts(page: number) {
  return useQuery<ContactsResponse>({
    queryKey: ["contacts", page],
    queryFn: () => fetchContacts(page),
  });
}

export function useContact(id: string) {
  return useQuery<SingleContactData>({
    queryKey: ["contacts", id],
    queryFn: () => fetchContact(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContactFormValues) => createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContactFormValues }) =>
      updateContact({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useDeleteContact() {
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
  });
}
