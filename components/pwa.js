'use client';
import { useEffect } from 'react';

export function PWA() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // ?v= forces the browser to re-download the worker on deploy
        navigator.serviceWorker.register('/sw.js?v=2').catch(() => {});
      });
    }
  }, []);
  return null;
}
