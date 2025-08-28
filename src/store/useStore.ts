import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  id: string;
  username?: string;
  myUserId?: string;
  exp?: number; // JWT expiration timestamp
}

interface AuthState {
  token: string | null;
  userProfile: UserProfile | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userProfile: null,

      login: async (token) => {
        try {
          const profile = jwtDecode<UserProfile>(token);
          set({ token, userProfile: profile });
        } catch (err: any) {
          console.error('Login failed:', err.response?.data?.message || err.message);
          throw err;
        }
      },

      logout: async () => {
        try {
          await axios.post('/logout', {}, { withCredentials: true });
        } catch (err) {
          console.error('Logout failed:', err);
        } finally {
          set({ token: null, userProfile: null });
        }
      },

      refreshToken: async () => {
        try {
          const res = await axios.post('/refresh', {}, { withCredentials: true });
          const token = res.data.accessToken;
          const profile = jwtDecode<UserProfile>(token);
          set({ token, userProfile: profile });
        } catch (err) {
          console.error('Refresh token failed:', err);
          set({ token: null, userProfile: null });
        }
      },

      isTokenExpired: () => {
        const profile = get().userProfile;
        if (!profile?.exp) return true; // no token → expired

        const now = Math.floor(Date.now() / 1000); // current timestamp in seconds
        return now >= profile.exp; // true if current time >= exp
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
