import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

interface Store {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      token: null,
      login: (token) => set({ token: token }),
      logout: () => set({ token: null })
    }),
    {
      name: "auth-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)
