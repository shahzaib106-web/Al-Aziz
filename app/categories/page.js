'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, CartProvider, useLang } from '../../components/store';
import { PageHeader, BottomNav, TileSkeleton } from '../../components/customer';
import { Icon } from '../../components/icons';

export default function Categories() {
  const { isUr, t } = useLang();
  const [cats, setCats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    api('categories').then(setCats).catch(() => {}).finally(() => setLoaded(true));
  }, []);

  const filteredCats = q.trim()
    ? cats.filter((c) => (c.ur + c.en + (c.desc || '') + (c.descEn || '')).toLowerCase().includes(q.trim().toLowerCase()))
    : cats;

  return (
    <CartProvider>
      <div dir={isUr ? 'rtl' : 'ltr'} className="mx-auto max-w-md md:max-w-none min-h-screen bg-cream pb-28 md:pb-10 shadow-xl md:shadow-none flex flex-col">
        <PageHeader
          title="Categories"
          titleUr="اقسام"
          right={
            <Link href="/menu" className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg" aria-label="search">
              <Icon name="search" className="w-5 h-5" />
            </Link>
          }
        />

        {/* Quick filter search */}
        <div className="px-4 pt-3.5 md:px-6 md:max-w-7xl md:mx-auto md:w-full">
          <div className="relative">
            <Icon name="search" className="w-4 h-4 text-[#A79E8C] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              suppressHydrationWarning
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('کیٹیگری تلاش کریں…', 'Search categories…')}
              className={`w-full h-11 rounded-xl border border-[#D8CCB4] bg-white ps-10 pe-10 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15 shadow-sm transition ${isUr ? 'urdu' : ''}`}
            />
            {q && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setQ('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EFE5D0] hover:bg-[#DDD2BC] text-ink flex items-center justify-center transition active:scale-90"
                aria-label="Clear"
              >
                <Icon name="x" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Card-style category grid */}
        <div className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 md:max-w-7xl md:mx-auto md:w-full flex-1">
          {!loaded ? (
            <TileSkeleton count={6} />
          ) : (
            filteredCats.map((c) => (
              <Link
                key={c.id}
                href={`/menu?cat=${c.id}`}
                className="card overflow-hidden flex flex-col hover:border-maroon/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[.98] transition select-none group rounded-xl"
              >
                <div className="relative overflow-hidden h-28 md:h-36">
                  <img
                    src={c.image}
                    alt={c.en}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/img/spread.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-3.5 flex flex-col gap-1 flex-1">
                  <div className={`${isUr ? 'urdu text-[14px]' : 'text-[13px]'} font-extrabold text-ink`}>
                    {t(c.ur, c.en)}
                  </div>
                  <div className={`${isUr ? 'urdu leading-relaxed' : 'leading-snug'} text-[11px] text-muted line-clamp-2 mt-auto`}>
                    {t(c.desc, c.descEn || c.en)}
                  </div>
                </div>
              </Link>
            ))
          )}
          {loaded && filteredCats.length === 0 && (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 card p-8 text-center flex flex-col items-center justify-center gap-2">
              <p className={`text-sm text-muted ${isUr ? 'urdu' : ''}`}>
                {t('کوئی کیٹیگری نہیں ملی', 'No categories match your search')}
              </p>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setQ('')}
                className="btn btn-sm btn-outline text-maroon text-xs"
              >
                {t('تمام کیٹیگریز دکھائیں', 'Show All Categories')}
              </button>
            </div>
          )}
        </div>
        <BottomNav active="menu" />
      </div>
    </CartProvider>
  );
}
