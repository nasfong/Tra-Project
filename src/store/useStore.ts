import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  id: string;
  username?: string;
}

interface Store {
  token: string | null;        // access token
  userProfile: UserProfile | null;
  login: (token: string) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      token: null,
      userProfile: null,

      login: (token) => {
        let profile: UserProfile | null = null;
        try {
          profile = jwtDecode<UserProfile>(token);
        } catch (err) {
          console.error('Failed to decode JWT:', err);
        }

        set({ token, userProfile: profile });
      },

      logout: async () => {
        try {
          await axios.post('/logout', {}, { withCredentials: true });
        } catch (error) {
          console.error('Logout failed:', error);
        }
        set({ token: null, userProfile: null });
      },

      refreshAccessToken: async () => {
        try {
          // No need to pass refresh token; it's in HttpOnly cookie
          const response = await axios.post(
            '/refresh',
            {},
            { withCredentials: true }
          );

          const newToken = response.data.token;
          const profile = jwtDecode<UserProfile>(newToken);

          set({ token: newToken, userProfile: profile });
        } catch (error) {
          console.error('Refresh token failed:', error);
          set({ token: null, userProfile: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
