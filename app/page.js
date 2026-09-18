'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, CartProvider, useLang } from '../components/store';
import { Splash, Onboarding, HomeHeader, BottomNav, MenuItemTile, TopNav, ProductModal, TileSkeleton, MobileDrawer } from '../components/customer';
import { Icon } from '../components/icons';

// Module-level flag: survives client-side navigation (Home button etc.),
// resets only on a fresh page load / app open.
let splashPlayed = false;

function Home() {
  const { isUr, t } = useLang();
  const [settings, setSettings] = useState(null);
  const [cats, setCats] = useState([]);
  const [menu, setMenu] = useState([]);
  const [splash, setSplash] = useState(!splashPlayed);
  const [onb, setOnb] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState('');
  const [slide, setSlide] = useState(0);

  // Splash plays once per app/site open; navigating back to Home never replays it.
  useEffect(() => {
    if (splashPlayed) return;
    splashPlayed = true;
    const tm = setTimeout(() => setSplash(false), 1600);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('agh_onboarded')) setOnb(true);
    Promise.all([api('settings').catch(() => null), api('categories').catch(() => []), api('menu').catch(() => [])])
      .then(([s, c, m]) => {
        setSettings(s);
        setCats(c);
        setMenu(m);
      })
      .finally(() => setLoaded(true));
  }, []);

  // Hero carousel auto-advance
  useEffect(() => {
    const tm = setInterval(() => setSlide((s) => (s + 1) % 3), 4500);
    return () => clearInterval(tm);
  }, []);

  const popular = [...menu].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const results = q.trim() ? menu.filter((m) => (m.nameUr + m.nameEn).toLowerCase().includes(q.trim().toLowerCase())) : null;

  const slides = [
    {
      accent: t(settings?.tagline || 'اصلی ذائقہ، ہماری پہچان', 'Hot & Delicious'),
      title: t(settings?.promoTitle || 'اصل ذائقہ اب آپ کے قریب', settings?.promoTitleEn || 'Authentic taste, just for you!'),
      sub: t('پریمیم اجزاء۔ bold مصالحوں کے ساتھ لاجواب ذائقہ۔', 'Premium ingredients. Bold flavors. Perfect taste.'),
      img: '/img/biryani.jpg',
      href: '/menu?cat=c1',
    },
    {
      accent: t('خصوصی پیشکش', 'Special Offer'),
      title: `${settings?.discountPercent ?? 10}% ${t('رعایت', 'OFF')}`,
      sub: t(settings?.discountNote || 'تمام آرڈرز پر', settings?.discountNoteEn || 'on all orders this week'),
      img: '/img/spread.jpg',
      href: '/menu',
    },
    {
      accent: t('تندور سے گرم', 'Fresh from Tandoor'),
      title: t('کڑاہی اور باری بی کیو اسپیشلز', 'Karahi & BBQ Specials'),
      sub: t('کوئلوں کی خوشبو والا اصلی ذائقہ', 'Charcoal-smoked authentic taste'),
      img: '/img/kebab.jpg',
      href: '/menu?cat=c4',
    },
  ];
  const s = slides[slide];

  return (
    <CartProvider>
      <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-[calc(86px+env(safe-area-inset-bottom))] md:pb-10 shadow-xl relative">
        <TopNav active="home" />
        <HomeHeader settings={settings} onMenu={() => setDrawer(true)} />
        <MobileDrawer open={drawer} onClose={() => setDrawer(false)} settings={settings} />

        {/* Search bar */}
        <div className="px-4 mt-3.5 flex items-center gap-2.5">
          <div className="relative flex-1">
            <Icon name="search" className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('بریانی، کڑاہی، نان تلاش کریں…', 'Search biryani, karahi, naan…')}
              className={`field !rounded-full !pl-10 text-[13px] ${isUr ? 'urdu' : ''}`}
            />
          </div>
          <Link href="/categories" className="w-11 h-11 shrink-0 rounded-full bg-white border border-[#D8CCB4] flex items-center justify-center text-ink hover:border-maroon/50 hover:text-maroon transition" aria-label="filters">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M7 12h10M10 17h4" />
            </svg>
          </Link>
        </div>

        {results ? (
          /* ---- Search results ---- */
          <div className="px-4 mt-4">
            <h3 className={`section-title mb-3 ${isUr ? 'urdu !tracking-normal' : ''}`}>{t('نتائج', 'Results')} ({results.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {results.map((m) => (
                <MenuItemTile key={m.id} item={m} onOpen={() => setSelected(m)} />
              ))}
              {results.length === 0 && <p className={`${isUr ? 'urdu' : ''} col-span-2 text-center text-sm text-muted py-10`}>{t('کوئی ڈش نہیں ملی', 'No dishes found')}</p>}
            </div>
          </div>
        ) : (
          <>
            {/* ---- Hero carousel ---- */}
            <div className="px-4 mt-4">
              <div className="relative overflow-hidden rounded-2xl pattern-maroon text-white shadow-md">
                <div key={slide} className="flex items-stretch hero-in">
                  <div className="flex-1 p-4 pr-2 flex flex-col justify-center min-w-0">
                    <span className="text-gold text-[11px] font-bold italic tracking-wide">{s.accent}</span>
                    <h2 className={`${isUr ? 'urdu text-lg' : 'text-[22px] font-extrabold leading-tight'} mt-1 drop-shadow-sm`}>{s.title}</h2>
                    <p className={`text-[10px] text-white/75 mt-1.5 ${isUr ? 'urdu leading-relaxed' : 'leading-snug'}`}>{s.sub}</p>
                    <Link href={s.href} className={`btn btn-sm w-max mt-3 bg-gold text-[#3E2C05] hover:brightness-110 rounded-full px-4 ${isUr ? 'urdu' : '!tracking-wide'}`}>
                      {t('ابھی آرڈر کریں', 'ORDER NOW')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.6} />
                    </Link>
                  </div>
                  <img src={s.img} alt="" className="w-32 sm:w-40 md:w-64 h-full object-cover [mask-image:linear-gradient(to_left,black_75%,transparent)]" />
                </div>
                {/* dots */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)} aria-label={'slide ' + (i + 1)} className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-gold' : 'w-1.5 bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Category circles ---- */}
            <div className="mt-5 px-4">
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {!loaded &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 animate-pulse" aria-hidden="true">
                      <div className="w-16 h-16 rounded-full bg-[#EFE5D0]" />
                      <div className="h-2.5 w-10 bg-[#EFE5D0] rounded" />
                    </div>
                  ))}
                {loaded &&
                  cats.map((c, i) => (
                    <Link key={c.id} href={`/menu?cat=${c.id}`} className="flex flex-col items-center gap-1.5 shrink-0 group">
                      <span className={`w-16 h-16 rounded-full overflow-hidden border-2 transition group-active:scale-95 ${i === 0 ? 'border-maroon shadow-md' : 'border-[#E8DCC3]'}`}>
                        <img src={c.image} alt={c.en} className="w-full h-full object-cover" />
                      </span>
                      <span className={`${isUr ? 'urdu text-[12px] leading-relaxed' : 'text-[10px] font-semibold'} text-ink`}>{t(c.ur, c.en)}</span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* ---- Popular picks: horizontal snap cards ---- */}
            <div className="mt-5">
              <div className="flex items-center justify-between px-4 mb-3">
                <h3 className={`section-title ${isUr ? 'urdu !tracking-normal' : ''}`}>{t('آج مقبول', 'Popular Picks')}</h3>
                <Link href="/menu" className={`flex items-center gap-0.5 text-[11px] font-bold text-maroon hover:underline ${isUr ? 'urdu' : ''}`}>
                  {t('سب دیکھیں', 'View All')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.4} />
                </Link>
              </div>
              <div className="pl-4 pr-4 md:pr-4">
                <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 -mx-0 md:grid md:grid-cols-4 md:overflow-visible">
                  {!loaded ? (
                    <TileSkeleton count={4} />
                  ) : (
                    popular.map((m, i) => (
                      <MenuItemTile
                        key={m.id}
                        item={m}
                        onOpen={() => setSelected(m)}
                        className="w-40 md:w-auto shrink-0 snap-start"
                        badge={i === 0 ? { label: t('بیسٹ سیلر', 'BESTSELLER'), tone: 'gold' } : i === 1 ? { label: t('شیف کی پسند', "CHEF'S PICK"), tone: 'red' } : i === 2 ? { label: t('مقبول', 'POPULAR'), tone: 'leaf' } : null}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ---- Deal banner ---- */}
            <div className="px-4 mt-6">
              <div className="gold-banner rounded-2xl p-4 flex items-center gap-3 shadow-card border border-[#C9971C]/40 overflow-hidden">
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[10px] font-extrabold tracking-widest text-[#6B520F]">{t('ویکنڈ ڈیل', 'WEEKEND DEAL')}</div>
                  <div className={`${isUr ? 'urdu leading-relaxed' : 'font-extrabold text-lg'} text-[#4A3608] mt-0.5`}>
                    {settings?.discountPercent ?? 10}% {t('رعایت', 'OFF')}
                  </div>
                  <div className={`${isUr ? 'urdu leading-relaxed' : ''} text-[10px] text-[#6B520F]`}>{t(settings?.discountNote || 'تمام آرڈرز پر', settings?.discountNoteEn || 'on all orders')}</div>
                  <Link href="/menu" className={`btn btn-sm w-max mt-2.5 bg-maroon text-white rounded-full px-4 ${isUr ? 'urdu' : '!tracking-wide'}`}>
                    {t('ابھی آرڈر کریں', 'ORDER NOW')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.6} />
                  </Link>
                </div>
                <div className="w-14 h-14 shrink-0 rounded-full bg-maroon text-gold flex items-center justify-center text-center text-[11px] font-extrabold leading-tight shadow-md rotate-6">
                  {settings?.discountPercent ?? 10}%<br />
                </div>
                <img src="/img/tandoor.jpg" alt="" className="w-24 h-24 rounded-xl object-cover border-2 border-white/60 shadow-md -rotate-3 shrink-0" />
              </div>
            </div>
          </>
        )}

        <BottomNav active="home" />
        <ProductModal item={selected} onClose={() => setSelected(null)} />

        {splash && <Splash settings={settings} />}
        {onb && (
          <Onboarding
            onDone={() => {
              localStorage.setItem('agh_onboarded', '1');
              setOnb(false);
            }}
          />
        )}
      </div>
    </CartProvider>
  );
}

export default Home;
