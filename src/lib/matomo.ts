// src/lib/matomo.ts
declare global { interface Window { _paq: any[] } }

export function trackPage(fullUrl: string, title?: string) {
  if (!window._paq) window._paq = [];
  window._paq.push(['setCustomUrl', fullUrl]);
  if (title) window._paq.push(['setDocumentTitle', title]);
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
}
