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

/* ---------- Home header (mobile) ---------- */
export function HomeHeader({ settings }) {
  const { isUr, t } = useLang();
  return (
    <header className="bg-maroon text-white px-4 pt-4 pb-4 md:hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] leading-tight text-white/90 max-w-[100px]">
          <Icon name="pin" className="w-4 h-4 shrink-0" />
          <span>{settings?.location || 'Sahiwal, Pakistan'}</span>
        </div>
        <div className={`${isUr ? 'urdu text-xl' : 'text-base font-extrabold tracking-wide'} text-center flex-1 drop-shadow`}>
          {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
        </div>
        <div className="flex items-center gap-2">
          <LangToggle light />
          <Icon name="bell" className="w-5 h-5 text-white/90" />
        </div>
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
    { id: 'home', label: 'Home', href: '/' },
    { id: 'menu', label: 'Menu', href: '/categories' },
    { id: 'cart', label: 'Cart', href: '/cart', badge: count },
    { id: 'orders', label: 'Orders', href: '/orders' },
    { id: 'profile', label: 'Profile', href: '/profile' },
  ];
  return (
    <header className="hidden md:block bg-maroon text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <LogoMark className="w-9 h-9" />
          <span className={`${isUr ? 'urdu text-lg leading-none' : 'font-extrabold tracking-wide'}`}>
            {t('العزيز ریسٹورنٹ', 'Al Aziz Restaurant')}
          </span>
        </Link>
        <nav className="flex items-center gap-1 ml-auto">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition ${active === l.id ? 'bg-white text-maroon' : 'text-white/85 hover:bg-white/10'}`}
            >
              {l.label}
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
export function PageHeader({ title, right }) {
  const router = useRouter();
  return (
    <>
      <TopNav />
      <header className="md:hidden bg-maroon text-white px-3 py-3.5 flex items-center gap-2 sticky top-0 z-30">
        <button onClick={() => router.back()} className="p-1 hover:bg-white/10 rounded-lg" aria-label="back">
          <Icon name="back" className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold tracking-wide">{title}</h1>
        <div className="flex items-center gap-1.5">
          {right}
          <LangToggle light />
        </div>
      </header>
    </>
  );
}

/* ---------- Bottom nav (mobile) ---------- */
export function BottomNav({ active }) {
  const { count } = useCart();
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home', href: '/' },
    { id: 'menu', label: 'Menu', icon: 'grid', href: '/categories' },
    { id: 'cart', label: 'Cart', icon: 'cart', href: '/cart' },
    { id: 'orders', label: 'Orders', icon: 'receipt', href: '/orders' },
    { id: 'profile', label: 'Profile', icon: 'user', href: '/profile' },
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white border-t border-[#E8DCC3] md:hidden">
      <div className="grid grid-cols-5">
        {tabs.map((t) => (
          <Link key={t.id} href={t.href} className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${active === t.id ? 'text-maroon' : 'text-muted hover:text-ink'}`}>
            {active === t.id && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-maroon rounded-full" />}
            <span className="relative">
              <Icon name={t.icon} className="w-5 h-5" strokeWidth={active === t.id ? 2.2 : 1.8} />
              {t.id === 'cart' && count > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-leaf text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] px-0.5 flex items-center justify-center">{count}</span>
              )}
            </span>
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
