import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersResponse, SingleUserResponse } from "../types/users";
import { apiRestify } from "./client";
import { UserFormValues } from "../validations/users";

async function fetchAllUsers(): Promise<UsersResponse> {
  return apiRestify<UsersResponse>("/users");
}

async function fetchUsers(page: number): Promise<UsersResponse> {
  return apiRestify<UsersResponse>(`/users?page=${page}&per_page=5`);
}
async function fetchUser(id: string): Promise<SingleUserResponse> {
  return apiRestify<SingleUserResponse>(`/users/${id}`);
}

async function createUser(data: UserFormValues): Promise<SingleUserResponse> {
  return apiRestify<SingleUserResponse>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function updateUser({
  id,
  data,
}: {
  id: string;
  data: UserFormValues;
}): Promise<SingleUserResponse> {
  return apiRestify<SingleUserResponse>(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function deleteUser(id: string): Promise<void> {
  return apiRestify<void>(`/users/${id}`, { method: "DELETE" });
}

export function useAllUsers() {
  return useQuery<UsersResponse>({
    queryKey: ["users", "all"],
    queryFn: () => fetchAllUsers(),
  });
}

export function useUsers(page: number) {
  return useQuery<UsersResponse>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
  });
}

export function useUser(id: string) {
  return useQuery<SingleUserResponse>({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserFormValues) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormValues }) =>
      updateUser({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });
}
