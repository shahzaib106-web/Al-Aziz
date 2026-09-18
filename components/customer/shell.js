'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon, LogoMark } from '../icons';
import { useCart, useLang } from '../store';

/* ---------- Language toggle button ---------- */
export function LangToggle({ light = false, dark = false }) {
  const { lang, setLang } = useLang();
  return (
    <button
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
  return (
    <header className="bg-white/95 backdrop-blur text-ink pt-safe md:hidden sticky top-0 z-40 border-b border-[#EFE5D0] shadow-[0_1px_10px_rgba(38,33,28,0.04)]">
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
  const cart = useCart();
  const count = cart ? cart.count : 0;
  const { isUr, t } = useLang();
  const links = [
    { id: 'home', en: 'Home', ur: 'ہوم', href: '/' },
    { id: 'menu', en: 'Menu', ur: 'مینیو', href: '/categories' },
    { id: 'cart', en: 'Cart', ur: 'کارٹ', href: '/cart', badge: count },
    { id: 'orders', en: 'Orders', ur: 'آرڈرز', href: '/orders' },
    { id: 'profile', en: 'Profile', ur: 'پروفائل', href: '/profile' },
  ];
  return (
    <header className="hidden md:block bg-maroon text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <LogoMark className="w-9 h-9" />
          <span className={`${isUr ? 'urdu text-base leading-relaxed' : 'font-extrabold tracking-wide text-sm'}`}>
            {t('العزيز ریسٹورنٹ', 'Al Aziz Restaurant')}
          </span>
        </Link>
        <nav className="flex items-center gap-1 ml-auto">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={`relative px-4 py-2 rounded-lg text-[13px] font-semibold transition ${active === l.id ? 'bg-white text-maroon' : 'text-white/85 hover:bg-white/10'} ${isUr ? 'urdu' : ''}`}
            >
              {t(l.ur, l.en)}
              {l.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-leaf text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
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
  return (
    <>
      <TopNav />
      <header className="md:hidden bg-maroon text-white pt-safe sticky top-0 z-30">
        <div className="flex items-center gap-1 px-2 py-2.5">
          <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg" aria-label="back">
            <Icon name="back" className="w-5 h-5" />
          </button>
          <h1 className={`flex-1 text-center ${isUr ? 'urdu text-base leading-relaxed' : 'text-[15px] font-bold tracking-wide'}`}>
            {titleUr ? t(titleUr, title) : title}
          </h1>
          <div className="flex items-center gap-1">
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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white border-t border-[#EDE3CF] md:hidden pb-safe shadow-[0_-6px_20px_rgba(38,33,28,0.06)]">
      <div className="grid grid-cols-5 h-[68px]">
        {tabs.map((tab) => {
          const on = active === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={on ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${on ? 'text-maroon' : 'text-[#9B948A] active:text-ink'}`}
            >
              <span className={`relative flex items-center justify-center h-7 px-4 rounded-full transition-all duration-200 ${on ? 'bg-maroon/[.09]' : ''}`}>
                <Icon name={tab.icon} className="w-[21px] h-[21px]" strokeWidth={on ? 2.2 : 1.8} />
                {tab.badge > 0 && (
                  <span key={tab.badge} className="pop absolute -top-1 -right-1 bg-maroon text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] px-0.5 flex items-center justify-center tabular-nums">
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
