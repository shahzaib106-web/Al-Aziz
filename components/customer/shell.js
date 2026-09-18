'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon, LogoMark } from '../icons';
import { useCart, useLang } from '../store';

/* ---------- Language toggle button ---------- */
export function LangToggle({ light = false }) {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')}
      title="Switch language"
      className={`text-[10px] font-bold rounded-md border px-2 py-1 leading-none transition ${
        light ? 'border-white/40 text-white hover:bg-white/10' : 'border-[#D8CCB4] bg-white text-ink hover:border-maroon'
      }`}
    >
      {lang === 'ur' ? 'EN' : 'اردو'}
    </button>
  );
}

/* ---------- Home header (mobile) — brand + language only; nav lives in BottomNav ---------- */
export function HomeHeader({ settings }) {
  const { isUr, t } = useLang();
  return (
    <header className="bg-maroon text-white pt-safe md:hidden sticky top-0 z-40">
      <div className="flex items-center gap-2 px-4 pt-3 pb-3">
        <Link href="/" className="flex-1 flex items-center gap-2.5 min-w-0" aria-label={t('العزيز ریسٹورنٹ', 'Al Aziz Restaurant')}>
          <LogoMark className="w-8 h-8 shrink-0" />
          <span className={`min-w-0 truncate ${isUr ? 'urdu text-lg leading-relaxed' : 'text-[15px] font-extrabold tracking-wide'} drop-shadow-sm`}>
            {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
          </span>
        </Link>
        <LangToggle light />
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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white border-t border-[#E8DCC3] md:hidden pb-safe">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const on = active === tab.id;
          return (
            <Link key={tab.id} href={tab.href} className={`relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${on ? 'text-maroon' : 'text-muted hover:text-ink'}`}>
              {on && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-maroon rounded-full" />}
              <span className="relative h-5">
                <Icon name={tab.icon} className="w-5 h-5" strokeWidth={on ? 2.2 : 1.8} />
                {tab.badge > 0 && (
                  <span key={tab.badge} className="pop absolute -top-1.5 -right-2 bg-maroon text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] px-0.5 flex items-center justify-center tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </span>
              <span className={isUr ? 'urdu text-[11px] leading-none' : ''}>{t(tab.ur, tab.en)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
