import './globals.css';
import { Toaster, LangProvider } from '../components/store';
import { PWA } from '../components/pwa';

export const metadata = {
  title: 'العزيز ریسٹورنٹ — Al Aziz Restaurant',
  description: 'اصلی ذائقہ، ہماری پہچان — Order biryani, karahi, BBQ and more online.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <head>
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
      <body className="bg-cream text-ink font-sans antialiased">
        <LangProvider>{children}</LangProvider>
        <PWA />
        <Toaster />
      </body>
    </html>
  );
}
