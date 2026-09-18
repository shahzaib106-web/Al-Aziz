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

/* ---------- Mobile side drawer ---------- */
export function MobileDrawer({ open, onClose, settings }) {
  const { isUr, t } = useLang();
  const router = useRouter();
  const links = [
    { icon: 'home', en: 'Home', ur: 'ہوم', href: '/' },
    { icon: 'grid', en: 'Menu', ur: 'مینیو', href: '/categories' },
    { icon: 'cart', en: 'Cart', ur: 'کارٹ', href: '/cart' },
    { icon: 'receipt', en: 'My Orders', ur: 'میرے آرڈرز', href: '/orders' },
    { icon: 'user', en: 'Profile', ur: 'پروفائل', href: '/profile' },
  ];
  return (
    <div className={`fixed inset-0 z-[75] md:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-cream shadow-2xl flex flex-col transition-transform duration-250 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-maroon text-white px-5 pt-safe">
          <div className="flex items-center gap-3 py-5">
            <LogoMark className="w-10 h-10" />
            <div className="flex-1 min-w-0">
              <div className={`${isUr ? 'urdu leading-relaxed' : 'font-extrabold text-sm'} truncate`}>
                {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
              </div>
              <div className="text-[10px] text-white/70 truncate">{settings?.location || 'Sahiwal, Pakistan'}</div>
            </div>
            <LangToggle light />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-semibold text-ink hover:bg-maroon/5 active:bg-maroon/10"
            >
              <span className="w-9 h-9 rounded-full bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                <Icon name={l.icon} className="w-4 h-4" />
              </span>
              <span className={isUr ? 'urdu leading-relaxed' : ''}>{t(l.ur, l.en)}</span>
              <Icon name="chevR" className="w-4 h-4 text-muted ml-auto" />
            </Link>
          ))}
          <a
            href={'tel:' + (settings?.phone || '').replace(/\s/g, '')}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-semibold text-ink hover:bg-maroon/5"
          >
            <span className="w-9 h-9 rounded-full bg-leaf/10 text-leaf flex items-center justify-center shrink-0">
              <Icon name="phone" className="w-4 h-4" />
            </span>
            <span className={isUr ? 'urdu leading-relaxed' : ''}>{t('کال کریں', 'Call Us')}</span>
            <span className="ml-auto text-[11px] text-muted tabular-nums" dir="ltr">{settings?.phone}</span>
          </a>
        </nav>
        <div className="p-4 border-t border-[#E8DCC3] space-y-2.5">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-2 text-[11px] font-bold text-muted hover:text-maroon">
            <Icon name="gear" className="w-4 h-4" /> {t('ایڈمن پینل', 'Admin Panel')}
          </Link>
          <button onClick={() => { onClose(); router.push('/'); }} className="w-full btn btn-primary btn-sm">
            {t('ابھی آرڈر کریں', 'Order Now')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Home header (mobile) — hamburger / brand / profile+cart ---------- */
export function HomeHeader({ settings, onMenu }) {
  const cart = useCart();
  const count = cart ? cart.count : 0;
  const { isUr, t } = useLang();
  return (
    <header className="bg-maroon text-white pt-safe md:hidden sticky top-0 z-40">
      <div className="flex items-center gap-2 px-3 pt-3 pb-3">
        <button onClick={onMenu} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 active:bg-white/15" aria-label="open menu">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
        </button>
        <Link href="/" className="flex-1 flex items-center justify-center gap-2 min-w-0">
          <LogoMark className="w-7 h-7" />
          <span className={`${isUr ? 'urdu text-lg leading-relaxed' : 'text-[15px] font-extrabold tracking-wide'} truncate drop-shadow-sm`}>
            {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
          </span>
        </Link>
        <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10" aria-label="profile">
          <Icon name="user" className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10" aria-label="cart">
          <Icon name="cart" className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute top-1 right-1 bg-gold text-[#3E2C05] text-[9px] font-extrabold rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center tabular-nums">
              {count}
            </span>
          )}
        </Link>
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
