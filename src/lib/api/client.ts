import { API_BASE_URL } from "../config/api";
import { useAuthStore } from "../store/authStore";

export async function apiRestify<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = useAuthStore.getState().token;
  const response = await fetch(`${API_BASE_URL}/api/restify${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!response.ok) {
    throw new Error("Api request failed");
  }
  return response.json();
}
