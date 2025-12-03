// Google Analytics utility functions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-1F83FL4LLC', {
      page_path: url,
    });
  }
};
