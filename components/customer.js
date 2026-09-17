'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon, Star, LogoMark } from './icons';
import { useCart, fmt, useLang } from './store';

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

/* ---------- Splash ---------- */
export function Splash({ settings }) {
  const { isUr, t } = useLang();
  return (
    <div className="fixed inset-0 z-[90] pattern-maroon flex flex-col items-center justify-center text-white">
      <LogoMark className="w-16 h-16 mb-2 animate-pulse" />
      <div className={`${isUr ? 'urdu' : ''} text-3xl font-bold text-center leading-relaxed`}>
        {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
      </div>
      <div className={`${isUr ? 'urdu' : 'text-sm tracking-wide'} text-white/80 mt-1`}>
        {t(settings?.tagline || 'اصلی ذائقہ، ہماری پہچان', 'Authentic taste, our identity')}
      </div>
    </div>
  );
}

/* ---------- Onboarding ---------- */
export function Onboarding({ onDone }) {
  const { isUr, t } = useLang();
  const [slide, setSlide] = useState(0);
  const slides = [
    { img: '/img/spread.jpg', u: 'خوش آمدید!', e: 'Welcome!', us: 'اصلی دیسی کھانے، اب آپ کے موبائل پر', es: 'Authentic desi food, now on your mobile' },
    { img: '/img/biryani.jpg', u: 'مشہور بریانی', e: 'Famous Biryani', us: 'ہماری خصوصی بریانی، اصلی مصالحوں کے ساتھ', es: 'Our special biryani with authentic spices' },
    { img: '/img/kebab.jpg', u: 'تیز ترسیل', e: 'Fast Delivery', us: 'گرم کھانا، آپ کی دہلیز تک 35 منٹ میں', es: 'Hot food at your doorstep in 35 minutes' },
  ];
  const last = slide === slides.length - 1;
  return (
    <div className="fixed inset-0 z-[80] bg-cream flex flex-col">
      <div className={`flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center px-8 text-center ${isUr ? '' : ''}`}>
        <img src={slides[slide].img} alt="" className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-white" />
        <h2 className={`${isUr ? 'urdu' : ''} text-2xl font-bold mt-8 text-maroon`}>{t(slides[slide].u, slides[slide].e)}</h2>
        <p className={`${isUr ? 'urdu' : ''} text-sm text-muted mt-2`}>{t(slides[slide].us, slides[slide].es)}</p>
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-maroon' : 'w-2 bg-[#D8CCB4]'}`} />
          ))}
        </div>
      </div>
      <div className="max-w-md mx-auto w-full px-8 pb-10">
        <button onClick={() => (last ? onDone() : setSlide(slide + 1))} className={`btn-maroon w-full py-3 text-sm ${isUr ? 'urdu' : ''}`}>
          {last ? t('شروع کریں', "Let's Start") : t('آگے بڑھیں', 'Next')}
        </button>
        <button onClick={onDone} className="w-full text-center text-xs tracking-widest text-muted mt-4 py-1">
          SKIP
        </button>
      </div>
    </div>
  );
}

/* ---------- Home header ---------- */
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

/* ---------- Sub page header ---------- */
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

/* ---------- Bottom nav ---------- */
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

/* ---------- Menu item tile card ---------- */
export function MenuItemTile({ item, onOpen }) {
  const { add } = useCart();
  const { isUr, t } = useLang();
  const out = !item.available || item.stock <= 0;
  const quickAdd = (e) => {
    e.stopPropagation();
    if (out) return;
    const def = item.options?.find((o) => o.price === item.price) || item.options?.[item.options.length - 1] || null;
    add(item, def, 1);
  };
  return (
    <div onClick={onOpen} className="card overflow-hidden cursor-pointer transition hover:border-maroon/40 hover:shadow-md flex flex-col">
      <div className="relative">
        <img src={item.image} alt={item.nameEn} className={`w-full h-28 object-cover ${out ? 'grayscale opacity-70' : ''}`} />
        {out && (
          <span className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="bg-white text-maroon text-[10px] font-bold px-3 py-1 rounded-full">{t('ختم ہو گیا', 'SOLD OUT')}</span>
          </span>
        )}
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur rounded-md px-1.5 py-0.5 flex items-center gap-1 text-[10px] font-bold text-ink">
          <Star className="w-3 h-3 text-gold" /> {item.rating}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <div className={`${isUr ? 'urdu' : ''} text-[13px] font-semibold text-ink ${isUr ? 'leading-relaxed' : 'leading-snug'} line-clamp-2 min-h-[2.2em]`}>
          {t(item.nameUr, item.nameEn)}
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-maroon font-extrabold text-sm" dir="ltr">{fmt(item.price)}</span>
          {!out && (
            <button onClick={quickAdd} className="bg-leaf hover:bg-leaf-dark text-white rounded-lg p-1.5 transition active:scale-95" aria-label="add">
              <Icon name="plus" className="w-4 h-4" strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Qty stepper ---------- */
export function Qty({ value, onChange, max = 99, light = false }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border px-2 py-1 ${light ? 'border-white/30 bg-white/10 text-white' : 'border-[#D8CCB4] bg-white text-ink'}`}>
      <button onClick={() => onChange(value - 1)} className="p-1" aria-label="decrease">
        <Icon name="minus" className="w-4 h-4" />
      </button>
      <span className="text-sm font-semibold w-4 text-center" dir="ltr">{value}</span>
      <button onClick={() => onChange(Math.min(value + 1, max))} className="p-1" aria-label="increase">
        <Icon name="plus" className="w-4 h-4" />
      </button>
    </div>
  );
}
