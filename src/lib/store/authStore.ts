// lib/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: true, // Inițial true până se încarcă
      setAuth: (user, token) => set({ user, token, isLoading: false }),
      logout: () => set({ user: null, token: null }),
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        // Marchează ca loaded după hydration
        state?.setIsLoading(false);
      },
    }
  )
);
