'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, CartProvider, useLang } from '../components/store';
import { Splash, Onboarding, HomeHeader, BottomNav, MenuItemTile, TopNav, ProductModal, TileSkeleton } from '../components/customer';
import { Icon } from '../components/icons';

// Module-level flag: survives client-side navigation, resets on fresh load.
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
  const [q, setQ] = useState('');
  const [slide, setSlide] = useState(0);
  const [cat, setCat] = useState('');
  const [stockOnly, setStockOnly] = useState(false);
  const [fOpen, setFOpen] = useState(false);

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

  useEffect(() => {
    const tm = setInterval(() => setSlide((s) => (s + 1) % 3), 4500);
    return () => clearInterval(tm);
  }, []);

  const activeFilters = (cat ? 1 : 0) + (stockOnly ? 1 : 0);
  const inStock = (m) => m.available && m.stock > 0;
  const base = q.trim()
    ? menu.filter((m) => (m.nameUr + m.nameEn).toLowerCase().includes(q.trim().toLowerCase()))
    : menu;
  const filtered = base.filter((m) => (!cat || m.catId === cat) && (!stockOnly || inStock(m)));
  const list = q.trim() ? filtered : [...filtered].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const catName = cats.find((c) => c.id === cat);

  const slides = [
    {
      accent: t('تندور سے گرم', 'Fresh from Tandoor'),
      title: t('کڑاہی اور باری بی کیو اسپیشلز', 'Karahi & BBQ Specials'),
      sub: t('کوئلوں کی خوشبو والا اصلی ذائقہ', 'Charcoal-smoked authentic taste'),
      img: '/img/kebab.jpg',
      href: '/menu?cat=c3',
    },
    {
      accent: t(settings?.tagline || 'اصلی ذائقہ، ہماری پہچان', 'Hot & Delicious'),
      title: t(settings?.promoTitle || 'اصل ذائقہ اب آپ کے قریب', settings?.promoTitleEn || 'Biryani made fresh, just for you'),
      sub: t('پریمیم اجزاء، اصلی مصالحوں کے ساتھ', 'Premium ingredients. Bold flavors. Perfect taste.'),
      img: '/img/biryani.jpg',
      href: '/menu?cat=c2',
    },
    {
      accent: t('خصوصی پیشکش', 'Special Offer'),
      title: `${settings?.discountPercent ?? 10}% ${t('رعایت تمام آرڈرز پر', 'OFF on all orders')}`,
      sub: t('اس ہفتے کی خصوصی ڈیل', "This week's weekend deal"),
      img: '/img/spread.jpg',
      href: '/menu',
    },
  ];
  const s = slides[slide];

  return (
    <CartProvider>
      <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-[calc(90px+env(safe-area-inset-bottom))] md:pb-10 shadow-xl relative flex flex-col">
        <TopNav active="home" />
        <HomeHeader settings={settings} />

        {/* ---------- Search ---------- */}
        <div className="px-4 mt-3 flex items-center gap-2.5">
          <div className="relative flex-1">
            <Icon name="search" className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('بریانی، کڑاہی، نان تلاش کریں…', 'Search biryani, karahi, naan…')}
              className={`w-full h-12 rounded-xl border border-[#E0D4BC] bg-white pl-10 pr-3 text-[13px] outline-none focus:border-maroon focus:ring-[3px] focus:ring-maroon/10 transition-shadow ${isUr ? 'urdu' : ''}`}
            />
          </div>
          <button
            onClick={() => setFOpen(true)}
            className="relative w-12 h-12 shrink-0 rounded-xl bg-white border border-[#E0D4BC] flex items-center justify-center text-ink hover:border-maroon/50 hover:text-maroon transition active:scale-95"
            aria-label="filters"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M7 12h10M10 17h4" />
            </svg>
            {activeFilters > 0 && (
              <span key={activeFilters} className="pop absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-maroon text-white text-[10px] font-extrabold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* ---------- Hero ---------- */}
        <div className="px-4 mt-4">
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <div key={slide} className="relative h-48 md:h-64 hero-in">
              <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
              <div className="relative h-full flex flex-col justify-center p-4 pr-[42%] md:pr-[46%]">
                <span className="text-gold text-[11px] font-bold italic tracking-wide drop-shadow">{s.accent}</span>
                <h2 className={`${isUr ? 'urdu text-base leading-loose' : 'text-[20px] font-extrabold leading-tight'} mt-1 text-white drop-shadow-md`}>{s.title}</h2>
                <p className={`text-[10px] text-white/85 mt-1.5 drop-shadow ${isUr ? 'urdu leading-relaxed' : 'leading-snug'}`}>{s.sub}</p>
                <Link href={s.href} className={`btn btn-sm w-max mt-3 bg-gold text-[#3E2C05] hover:brightness-110 rounded-full px-4 ${isUr ? 'urdu' : '!tracking-wide'}`}>
                  {t('ابھی آرڈر کریں', 'ORDER NOW')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.6} />
                </Link>
              </div>
            </div>
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} aria-label={'slide ' + (i + 1)} className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-gold' : 'w-1.5 bg-white/70'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Category carousel ---------- */}
        <div className="mt-5 px-4">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className={`section-title ${isUr ? 'urdu !tracking-normal' : ''}`}>{t('اقسام', 'Categories')}</h3>
            <Link href="/categories" className={`flex items-center gap-0.5 text-[11px] font-bold text-maroon hover:underline ${isUr ? 'urdu' : ''}`}>
              {t('سب دیکھیں', 'View All')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.4} />
            </Link>
          </div>
          <div className="-mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {!loaded &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-[88px] shrink-0 flex flex-col items-center gap-1.5 animate-pulse" aria-hidden="true">
                    <div className="w-16 h-16 rounded-full bg-[#EFE5D0]" />
                    <div className="h-2.5 w-12 bg-[#EFE5D0] rounded" />
                  </div>
                ))}
              {loaded &&
                cats.map((c) => {
                  const on = cat === c.id;
                  return (
                    <button key={c.id} onClick={() => setCat(on ? '' : c.id)} className="w-[88px] shrink-0 flex flex-col items-center gap-1.5 group">
                      <span className={`w-16 h-16 rounded-full overflow-hidden border-2 transition group-active:scale-95 ${on ? 'border-maroon ring-2 ring-maroon/25 shadow-md' : 'border-[#E8DCC3]'}`}>
                        <img src={c.image} alt={c.en} className="w-full h-full object-cover" />
                      </span>
                      <span className={`text-center leading-tight line-clamp-2 text-[10px] ${on ? 'text-maroon font-extrabold' : 'text-ink font-semibold'} ${isUr ? 'urdu text-[11px] leading-relaxed' : ''}`}>
                        {t(c.ur, c.en)}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* ---------- Product grid ---------- */}
        <div className="mt-5 px-4">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className={`section-title ${isUr ? 'urdu !tracking-normal' : ''}`}>
              {q.trim() ? t('نتائج', 'Results') : catName ? t(catName.ur, catName.en) : t('مقبول ترین', 'Popular Picks')}
            </h3>
            {!q.trim() && (
              <Link href="/menu" className={`flex items-center gap-0.5 text-[11px] font-bold text-maroon hover:underline ${isUr ? 'urdu' : ''}`}>
                {t('سب دیکھیں', 'View All')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.4} />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {!loaded ? (
              <TileSkeleton count={4} />
            ) : (
              list.map((m, i) => (
                <MenuItemTile
                  key={m.id}
                  item={m}
                  onOpen={() => setSelected(m)}
                  badge={i === 0 && m.reviews > 150 ? { label: t('بیسٹ سیلر', 'BESTSELLER'), tone: 'gold' } : i === 1 && m.rating >= 4.7 ? { label: t('شیف کی پسند', "CHEF'S PICK"), tone: 'red' } : null}
                />
              ))
            )}
            {loaded && list.length === 0 && (
              <p className={`${isUr ? 'urdu' : ''} col-span-2 text-center text-sm text-muted py-10`}>{t('کوئی ڈش نہیں ملی', 'No dishes found')}</p>
            )}
          </div>
        </div>

        {/* ---------- Compact deal banner ---------- */}
        <div className="px-4 pt-6 mt-auto">
          <div className="gold-banner rounded-xl p-3 flex items-center gap-3 shadow-card border border-[#C9971C]/40">
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-extrabold tracking-widest text-[#6B520F]">{t('ویکنڈ اسپیشل', 'WEEKEND SPECIAL')}</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`${isUr ? 'urdu' : ''} text-[15px] font-extrabold text-[#4A3608]`}>{settings?.discountPercent ?? 10}% {t('رعایت', 'OFF')}</span>
                <span className={`${isUr ? 'urdu leading-relaxed' : ''} text-[10px] text-[#6B520F] truncate`}>{t(settings?.discountNote || 'تمام آرڈرز پر', settings?.discountNoteEn || 'on all orders')}</span>
              </div>
              <Link href="/menu" className={`btn btn-sm !h-8 w-max mt-2 bg-maroon text-white rounded-full px-3.5 text-[11px] ${isUr ? 'urdu' : '!tracking-wide'}`}>
                {t('ابھی آرڈر کریں', 'ORDER NOW')} <Icon name="chevR" className="w-3 h-3" strokeWidth={2.6} />
              </Link>
            </div>
            <img src="/img/tandoor.jpg" alt="" className="w-16 h-16 rounded-lg object-cover border-2 border-white/70 shadow-sm -rotate-3 shrink-0" />
          </div>
        </div>

        {/* ---------- Filter sheet ---------- */}
        {fOpen && (
          <div className="fixed inset-0 z-[65] bg-black/50 flex items-end justify-center fade-in" onClick={() => setFOpen(false)}>
            <div className="bg-cream w-full max-w-md rounded-t-3xl sheet-in pb-safe" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-center pt-2.5 pb-1"><span className="w-10 h-1 rounded-full bg-[#D8CCB4]" /></div>
              <div className="px-5 pt-2 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-extrabold text-ink ${isUr ? 'urdu' : ''}`}>{t('فلٹرز', 'Filters')}</h3>
                  <button onClick={() => { setCat(''); setStockOnly(false); }} className="text-[11px] font-bold text-maroon hover:underline">{t('صاف کریں', 'Clear all')}</button>
                </div>
                <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mt-4 mb-2">{t('قسم', 'Category')}</h4>
                <div className="flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <button key={c.id} onClick={() => setCat(cat === c.id ? '' : c.id)} className={`chip !py-2 !px-3.5 text-[12px] font-semibold transition ${cat === c.id ? '!bg-maroon !text-white !border-maroon' : ''} ${isUr ? 'urdu' : ''}`}>
                      {t(c.ur, c.en)}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStockOnly((v) => !v)} className="w-full flex items-center justify-between mt-5 rounded-xl border border-[#E0D4BC] bg-white px-4 py-3">
                  <span className={`text-[13px] font-bold text-ink ${isUr ? 'urdu' : ''}`}>{t('صرف دستیاب آئٹمز', 'In-stock items only')}</span>
                  <span className={`w-11 h-6 rounded-full p-0.5 transition-colors ${stockOnly ? 'bg-leaf' : 'bg-[#D8CCB4]'}`}>
                    <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${stockOnly ? 'translate-x-5' : ''}`} />
                  </span>
                </button>
                <button onClick={() => setFOpen(false)} className="btn btn-primary w-full h-11 mt-5">{t('لاگو کریں', 'Apply Filters')}</button>
              </div>
            </div>
          </div>
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
