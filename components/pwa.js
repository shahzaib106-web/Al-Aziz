'use client';
import { useEffect, useState } from 'react';

// Detect if app is running in PWA standalone mode or installed app context
export function checkIsPWA() {
  if (typeof window === 'undefined') return false;
  try {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      window.navigator.standalone === true ||
      (document.referrer && document.referrer.indexOf('android-app://') !== -1) ||
      (window.location && (window.location.search.indexOf('source=pwa') !== -1 || window.location.search.indexOf('pwa=1') !== -1)) ||
      sessionStorage.getItem('agh_pwa_standalone') === '1' ||
      localStorage.getItem('agh_pwa_installed') === '1';

    return Boolean(isStandalone);
  } catch (e) {
    return false;
  }
}

// React hook to determine if PWA / mobile view is enforced
export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const detected = checkIsPWA();
    if (detected) {
      setIsPWA(true);
      try {
        sessionStorage.setItem('agh_pwa_standalone', '1');
        document.documentElement.setAttribute('data-pwa', 'standalone');
        document.documentElement.classList.add('pwa-standalone-mode', 'force-mobile-view');
        if (document.body) {
          document.body.classList.add('pwa-standalone-mode', 'force-mobile-view');
        }
      } catch (e) {}
    }
  }, []);

  return isPWA;
}

// Normalizes viewport and layout on mobile devices, especially when Chrome's
// "Request Desktop Site" has been enabled in the mobile browser
export function normalizeMobilePWAViewport() {
  if (typeof window === 'undefined') return;

  try {
    const isStandalone = checkIsPWA();
    const minScreen = Math.min(window.screen.width || 9999, window.screen.height || 9999);
    const isPhoneScreen = minScreen < 650;
    const innerW = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || 0;
    const screenW = window.screen.width || 390;

    // Detect if Chrome Mobile "Desktop site" was forced on a phone device
    const isDesktopSiteForced = innerW >= 768 && isPhoneScreen;

    if (isStandalone || isDesktopSiteForced) {
      // Mark HTML and body as standalone mobile
      document.documentElement.setAttribute('data-pwa', 'standalone');
      document.documentElement.classList.add('pwa-standalone-mode', 'force-mobile-view');
      if (document.body) {
        document.body.classList.add('pwa-standalone-mode', 'force-mobile-view');
      }

      // Reinforce mobile viewport tag
      let vp = document.querySelector('meta[name="viewport"]');
      if (!vp) {
        vp = document.createElement('meta');
        vp.name = 'viewport';
        document.head.appendChild(vp);
      }
      vp.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');

      // If Chrome Mobile forced a wide viewport (e.g. 980px) on this phone:
      // Normalizing zoom ensures the mobile layout fills the physical screen with crisp, readable scaling
      if (innerW > 600 && isPhoneScreen) {
        const ratio = innerW / Math.min(screenW, 430);
        if (ratio > 1.2 && ratio < 4.0) {
          document.documentElement.classList.add('pwa-desktop-forced');
          document.documentElement.style.zoom = String(ratio);
        }
      } else {
        document.documentElement.classList.remove('pwa-desktop-forced');
        document.documentElement.style.zoom = '';
      }
    }
  } catch (e) {}
}

export function PWA() {
  useEffect(() => {
    // 1. Run viewport normalization immediately
    normalizeMobilePWAViewport();

    // 2. Listen for resize or orientation changes to keep viewport normalized
    window.addEventListener('resize', normalizeMobilePWAViewport);
    window.addEventListener('orientationchange', normalizeMobilePWAViewport);

    // 3. Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // ?v= forces the browser to re-download the worker on deploy
        navigator.serviceWorker.register('/sw.js?v=3').catch(() => {});
      });
    }

    return () => {
      window.removeEventListener('resize', normalizeMobilePWAViewport);
      window.removeEventListener('orientationchange', normalizeMobilePWAViewport);
    };
  }, []);

  return null;
}
