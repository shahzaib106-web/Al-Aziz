import './globals.css';
import { Toaster, LangProvider } from '../components/store';
import { PWA } from '../components/pwa';
import { InstallPrompt } from '../components/customer/overlays';
import { ChunkErrorRecovery } from '../components/error-recovery';

export const metadata = {
  title: 'Al Aziz Restaurant',
  description: 'اصلی ذائقہ، ہماری پہچان — Order biryani, karahi, BBQ, and authentic Pakistani food online.',
  openGraph: {
    title: 'Al Aziz Restaurant',
    description: 'اصلی ذائقہ، ہماری پہچان — Order biryani, karahi, BBQ, and authentic Pakistani food online.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#9E1B1E',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.matchMedia('(display-mode: fullscreen)').matches ||
                       window.matchMedia('(display-mode: minimal-ui)').matches ||
                       window.navigator.standalone === true ||
                       (document.referrer && document.referrer.indexOf('android-app://') !== -1) ||
                       (location.search && (location.search.indexOf('source=pwa') !== -1 || location.search.indexOf('pwa=1') !== -1)) ||
                       sessionStorage.getItem('agh_pwa_standalone') === '1' ||
                       localStorage.getItem('agh_pwa_installed') === '1';

    var minScreen = Math.min(window.screen.width || 9999, window.screen.height || 9999);
    var isPhone = minScreen < 650;
    var innerW = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || 0;
    var screenW = window.screen.width || 390;

    var isDesktopSiteForced = innerW >= 768 && isPhone;

    if (isStandalone || isDesktopSiteForced) {
      sessionStorage.setItem('agh_pwa_standalone', '1');
      document.documentElement.setAttribute('data-pwa', 'standalone');
      document.documentElement.classList.add('pwa-standalone-mode', 'force-mobile-view');

      // Normalize wide 980px viewport on mobile phones so mobile app fills screen with 1:1 scale
      if (innerW > 600 && isPhone) {
        var ratio = innerW / Math.min(screenW, 430);
        if (ratio > 1.2 && ratio < 4.0) {
          document.documentElement.classList.add('pwa-desktop-forced');
          document.documentElement.style.zoom = String(ratio);
        }
      }
    }
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(regs) {
        for (var i = 0; i < regs.length; i++) regs[i].unregister();
      }).catch(function() {});
    }
    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys().then(function(keys) {
        for (var i = 0; i < keys.length; i++) caches.delete(keys[i]);
      }).catch(function() {});
    }
  } catch(e) {}
})();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#9E1B1E" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Al Aziz" />
        <link rel="apple-touch-icon" href="/icons/icon-180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
      </head>
      <body className="bg-cream text-ink font-sans antialiased" suppressHydrationWarning>
        <LangProvider>
          {children}
          <InstallPrompt />
          <Toaster />
        </LangProvider>
        <ChunkErrorRecovery />
        <PWA />
      </body>
    </html>
  );
}
