// lib/api/auth.ts
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

async function loginApi(data: LoginData) {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      const { attributes, meta } = response;
      setAuth(
        {
          id: attributes.id,
          firstName: attributes.first_name,
          lastName: attributes.last_name,
          email: attributes.email,
          role: attributes.role,
        },
        meta.token
      );
      router.push("/");
    },
  });
}
