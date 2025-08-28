import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface JWTUserPayload {
  id: string;
  username: string;
}

interface Store {
  token: string | null;
  userInfo: JWTUserPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      login: (token) => {
        let decoded = null;
        try {
          decoded = jwtDecode<JWTUserPayload>(token);
        } catch (e) {
          console.error("Invalid JWT");
        }

        set({
          token,
          userInfo: decoded,
        });
      },
      logout: () => set({ token: null, userInfo: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
