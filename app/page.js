'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, CartProvider, useLang } from '../components/store';
import { Splash, Onboarding, HomeHeader, BottomNav, MenuItemTile, TopNav, ProductModal } from '../components/customer';
import { Icon } from '../components/icons';

// Module-level flag: survives client-side navigation (Home button etc.),
// resets only on a fresh page load / app open.
let splashPlayed = false;

function Home() {
  const router = useRouter();
  const { isUr, t } = useLang();
  const [settings, setSettings] = useState(null);
  const [cats, setCats] = useState([]);
  const [menu, setMenu] = useState([]);
  const [splash, setSplash] = useState(!splashPlayed);
  const [onb, setOnb] = useState(false);
  const [selected, setSelected] = useState(null);

  // Splash plays once per app/site open; navigating back to Home never replays it.
  useEffect(() => {
    if (splashPlayed) return;
    splashPlayed = true;
    const tm = setTimeout(() => setSplash(false), 1600);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('agh_onboarded')) setOnb(true);
    api('settings').then(setSettings).catch(() => {});
    api('categories').then(setCats).catch(() => {});
    api('menu').then(setMenu).catch(() => {});
  }, []);

  const popular = [...menu].sort((a, b) => b.reviews - a.reviews).slice(0, 3);

  return (
    <CartProvider>
      <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-28 md:pb-10 shadow-xl relative">
        <TopNav active="home" />
        <HomeHeader settings={settings} />

        {/* Promo banner */}
        <div className="px-4 mt-4">
          <div className="card overflow-hidden flex items-stretch">
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
              <h2 className={`${isUr ? 'urdu text-lg md:text-xl' : 'text-xl md:text-2xl font-extrabold'} text-ink ${isUr ? 'leading-loose' : 'leading-snug'}`}>
                {t(settings?.promoTitle || 'اصل ذائقہ اب آپ کے قریب', settings?.promoTitleEn || 'Authentic taste, now near you')}
              </h2>
              <Link href="/menu?cat=c1" className={`btn btn-leaf-c btn-sm w-max mt-3.5 ${isUr ? 'urdu' : ''}`}>
                {t('ابھی آرڈر کریں', 'Order Now')}
              </Link>
            </div>
            <img src="/img/biryani.jpg" alt="biryani" className="w-28 sm:w-36 md:w-64 h-full object-cover" />
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-7 px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`section-title ${isUr ? 'urdu !tracking-normal' : ''}`}>{t('ہماری خصوصیات', 'Our Specialties')}</h3>
            <Link href="/categories" className={`flex items-center gap-0.5 text-[11px] font-bold text-maroon hover:underline ${isUr ? 'urdu' : ''}`}>
              {t('سب دیکھیں', 'View All')} <Icon name="chevR" className="w-3.5 h-3.5" strokeWidth={2.4} />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2.5">
            {cats.slice(0, 4).map((c) => (
              <Link key={c.id} href={`/menu?cat=${c.id}`} className="card p-2 flex flex-col items-center gap-1.5 hover:border-maroon/40 hover:-translate-y-0.5 transition">
                <img src={c.image} alt={c.en} className="w-full aspect-square rounded-lg object-cover border border-[#E8DCC3]" />
                <span className={`${isUr ? 'urdu text-[12px] leading-relaxed' : 'text-[11px] text-center leading-tight'} font-semibold text-ink line-clamp-1 w-full`}>{t(c.ur, c.en)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Gold deal banner */}
        <div className="px-4 mt-6">
          <div className="gold-banner rounded-xl p-4 flex items-center justify-between gap-3 shadow-card border border-[#C9971C]/40">
            <div className="text-left min-w-0">
              <div className={`${isUr ? 'urdu leading-relaxed' : 'font-extrabold'} text-[13px] text-[#5C430A]`}>
                {t('آج کی خصوصی ڈیل', "Today's Special Deal")}
              </div>
              <div className={`${isUr ? 'urdu leading-relaxed' : ''} text-[11px] text-[#6B520F] mt-0.5`}>{t(settings?.discountNote || 'تمام آرڈرز پر', settings?.discountNoteEn || 'on all orders')}</div>
            </div>
            <span className="text-2xl font-extrabold text-[#4A3608] shrink-0 tabular-nums">{settings?.discountPercent ?? 10}% OFF</span>
          </div>
        </div>

        {/* Popular */}
        <div className="mt-7 px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`section-title ${isUr ? 'urdu !tracking-normal' : ''}`}>{t('آج مقبول', 'Popular Today')}</h3>
            <span className={`${isUr ? 'urdu leading-relaxed' : ''} text-[10px] text-muted text-right max-w-[45%]`}>{t('سب سے زیادہ آرڈر کیے جانے والے', 'Most ordered dishes')}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popular.map((m) => (
              <MenuItemTile key={m.id} item={m} onOpen={() => setSelected(m)} />
            ))}
          </div>
        </div>

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
