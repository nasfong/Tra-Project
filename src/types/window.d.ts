// types/window.d.ts

export {};

interface EnvConfig {
  VITE_API_URL?: string;
  VITE_IMAGE_URL?: string
  // You can add more env vars here if needed
  // VITE_OTHER_ENV?: string;
}

declare global {
  interface Window {
    __ENV__?: EnvConfig;
  }
}
