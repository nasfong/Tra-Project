// src/analytics/RouteTracker.tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPage } from '@/lib/matomo';

export default function RouteTracker() {
  const location = useLocation();
  const lastUrlRef = useRef<string | null>(null);
  const lastHitTsRef = useRef<number>(0);

  useEffect(() => {
    const fullUrl = window.location.origin + location.pathname + location.search + location.hash;

    // De-dupe: same URL within 1s (handles React 18 StrictMode double effect in dev)
    const now = Date.now();
    if (lastUrlRef.current === fullUrl && now - lastHitTsRef.current < 1000) return;

    trackPage(fullUrl, document.title);

    lastUrlRef.current = fullUrl;
    lastHitTsRef.current = now;
  }, [location]);

  return null;
}
