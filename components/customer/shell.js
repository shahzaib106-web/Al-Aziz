'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon, LogoMark } from '../icons';
import { useCart, useLang } from '../store';
import { useIsPWA } from '../pwa';

/* ---------- Language toggle button ---------- */
export function LangToggle({ light = false, dark = false }) {
  const { lang, setLang } = useLang();
  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')}
      title="Switch language"
      aria-label="Switch language"
      className={`h-9 min-w-[44px] px-3 rounded-full border text-[11px] font-bold leading-none transition active:scale-95 ${
        light
          ? 'border-white/40 text-white hover:bg-white/10'
          : dark
          ? 'border-[#E4D9C2] bg-white text-ink hover:border-maroon hover:text-maroon'
          : 'border-[#D8CCB4] bg-white text-ink hover:border-maroon'
      }`}
    >
      {lang === 'ur' ? 'EN' : 'اردو'}
    </button>
  );
}

/* ---------- Home header (mobile) — clean white: brand + language only ---------- */
export function HomeHeader({ settings }) {
  const { isUr, t } = useLang();
  const isPWA = useIsPWA();
  return (
    <header className={`bg-white/95 backdrop-blur text-ink pt-safe ${isPWA ? 'block' : 'md:hidden'} mobile-home-header sticky top-0 z-40 border-b border-[#EFE5D0] shadow-[0_1px_10px_rgba(38,33,28,0.04)]`}>
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        <Link href="/" className="flex-1 flex items-center gap-2.5 min-w-0" aria-label={t('العزيز ریسٹورنٹ', 'Al Aziz Restaurant')}>
          <span className="w-9 h-9 rounded-xl bg-maroon flex items-center justify-center shrink-0 shadow-sm">
            <LogoMark className="w-6 h-6" />
          </span>
          <span className={`min-w-0 truncate ${isUr ? 'urdu text-lg leading-relaxed' : 'text-[16px] font-extrabold tracking-tight'} text-ink`}>
            {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
          </span>
        </Link>
        <LangToggle dark />
      </div>
    </header>
  );
}

/* ---------- Desktop top nav ---------- */
export function TopNav({ active }) {
  const isPWA = useIsPWA();
  const router = useRouter();
  const cart = useCart();
  const count = cart ? cart.count : 0;
  const { isUr, t } = useLang();
  const [deskQ, setDeskQ] = useState('');

  // If in PWA standalone / mobile enforcement, never render desktop top navigation
  if (isPWA) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (deskQ.trim()) {
      router.push('/menu?q=' + encodeURIComponent(deskQ.trim()));
    } else {
      router.push('/menu');
    }
  };

  const links = [
    { id: 'home', en: 'Home', ur: 'ہوم', href: '/' },
    { id: 'menu', en: 'Menu', ur: 'مینیو', href: '/categories' },
    { id: 'cart', en: 'Cart', ur: 'کارٹ', href: '/cart', badge: count },
    { id: 'orders', en: 'Orders', ur: 'آرڈرز', href: '/orders' },
    { id: 'profile', en: 'Profile', ur: 'پروفائل', href: '/profile' },
  ];
  return (
    <header className="hidden md:block bg-maroon text-white sticky top-0 z-40 shadow-md desktop-top-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0 focus-visible:ring-2 focus-visible:ring-white/80 rounded-lg">
          <LogoMark className="w-9 h-9" />
          <span className={`${isUr ? 'urdu text-base leading-relaxed' : 'font-extrabold tracking-wide text-sm'}`}>
            {t('العزيز ریسٹورنٹ', 'Al Aziz Restaurant')}
          </span>
        </Link>

        {/* Desktop search bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md ml-4" role="search">
          <Icon name="search" className="w-4 h-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            suppressHydrationWarning
            value={deskQ}
            onChange={(e) => setDeskQ(e.target.value)}
            placeholder={t('کھانے تلاش کریں (جیسے بریانی، کڑاہی)…', 'Search dishes (e.g. biryani, karahi)…')}
            className={`w-full h-10 rounded-full bg-white/15 border border-white/20 pl-10 pr-9 text-xs text-white placeholder:text-white/60 outline-none focus:bg-white focus:text-ink focus:border-white focus:ring-2 focus:ring-white/30 transition-all ${isUr ? 'urdu' : ''}`}
          />
          {deskQ && (
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setDeskQ('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-0.5"
              aria-label="Clear search"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        <nav className="flex items-center gap-1 ml-auto">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={`relative px-4 py-2 rounded-lg text-[13px] font-semibold transition ${active === l.id ? 'bg-white text-maroon shadow-sm' : 'text-white/85 hover:bg-white/10'} ${isUr ? 'urdu' : ''}`}
            >
              {t(l.ur, l.en)}
              {l.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-leaf text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-sm">
                  {l.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <LangToggle light />
      </div>
    </header>
  );
}

/* ---------- Sub page header (mobile) + desktop nav ---------- */
export function PageHeader({ title, titleUr, right }) {
  const router = useRouter();
  const { isUr, t } = useLang();
  const isPWA = useIsPWA();
  return (
    <>
      {!isPWA && <TopNav />}
      <header className={`${isPWA ? 'block' : 'md:hidden'} mobile-page-header bg-maroon text-white pt-safe sticky top-0 z-30 shadow-[0_2px_8px_rgba(38,33,28,0.12)]`}>
        <div className="flex items-center gap-1 px-3 py-2.5 min-h-[50px]">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 active:scale-95 rounded-xl transition shrink-0"
            aria-label="back"
          >
            <Icon name="back" className={`w-5 h-5 ${isUr ? 'scale-x-[-1]' : ''}`} />
          </button>
          <h1 className={`flex-1 text-center font-bold px-2 truncate ${isUr ? 'urdu text-base leading-relaxed' : 'text-[15px] tracking-wide'}`}>
            {titleUr ? t(titleUr, title) : title}
          </h1>
          <div className="flex items-center gap-1.5 shrink-0">
            {right}
            <LangToggle light />
          </div>
        </div>
      </header>
    </>
  );
}

/* ---------- Bottom nav (mobile): 5 refined tabs ---------- */
export function BottomNav({ active }) {
  const isPWA = useIsPWA();
  const cart = useCart();
  const count = cart ? cart.count : 0;
  const { isUr, t } = useLang();
  const tabs = [
    { id: 'home', en: 'Home', ur: 'ہوم', icon: 'home', href: '/' },
    { id: 'menu', en: 'Menu', ur: 'مینیو', icon: 'grid', href: '/categories' },
    { id: 'cart', en: 'Cart', ur: 'کارٹ', icon: 'cart', href: '/cart', badge: count },
    { id: 'orders', en: 'Orders', ur: 'آرڈرز', icon: 'receipt', href: '/orders' },
    { id: 'profile', en: 'Profile', ur: 'پروفائل', icon: 'user', href: '/profile' },
  ];
  return (
    <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40 bg-white/95 backdrop-blur-md border-t border-[#EDE3CF] ${isPWA ? 'block' : 'md:hidden'} mobile-bottom-nav pb-safe shadow-[0_-6px_20px_rgba(38,33,28,0.06)]`}>
      <div className="grid grid-cols-5 h-[68px]">
        {tabs.map((tab) => {
          const on = active === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={on ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 transition-colors select-none ${on ? 'text-maroon' : 'text-[#645A4B] active:text-ink'}`}
            >
              <span className={`relative flex items-center justify-center h-8 px-4 rounded-full transition-all duration-200 ${on ? 'bg-maroon/[.10]' : ''}`}>
                <Icon name={tab.icon} className="w-[22px] h-[22px]" strokeWidth={on ? 2.3 : 1.8} />
                {tab.badge > 0 && (
                  <span key={tab.badge} className="pop absolute -top-0.5 -right-0.5 bg-maroon text-white text-[9px] font-extrabold rounded-full min-w-[16px] h-[16px] px-0.5 flex items-center justify-center tabular-nums shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </span>
              <span className={`text-[10px] leading-none ${on ? 'font-extrabold' : 'font-semibold'} ${isUr ? 'urdu !text-[11px]' : ''}`}>
                {t(tab.ur, tab.en)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
