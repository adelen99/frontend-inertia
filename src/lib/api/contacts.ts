import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactsResponse } from "../types/contacts";
import { apiRestify } from "./client";

async function fetchAllContacts(): Promise<ContactsResponse> {
  return apiRestify<ContactsResponse>("/contacts");
}

async function fetchContacts(page: number): Promise<ContactsResponse> {
  return apiRestify<ContactsResponse>(`/contacts?page=${page}&per_page=10`);
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
