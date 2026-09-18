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
  useEffect(() => {
    api('categories').then(setCats).catch(() => {}).finally(() => setLoaded(true));
  }, []);

  return (
    <CartProvider>
      <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-28 md:pb-10 shadow-xl">
        <PageHeader
          title="Categories"
          titleUr="اقسام"
          right={
            <Link href="/menu" className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg" aria-label="search">
              <Icon name="search" className="w-5 h-5" />
            </Link>
          }
        />
        {/* Card-style category grid (never rows) */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {!loaded ? (
            <TileSkeleton count={6} />
          ) : (
            cats.map((c) => (
              <Link
                key={c.id}
                href={`/menu?cat=${c.id}`}
                className="card overflow-hidden flex flex-col hover:border-maroon/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[.98] transition select-none"
              >
                <img src={c.image} alt={c.en} className="w-full h-24 md:h-32 object-cover" />
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <div className={`${isUr ? 'urdu leading-relaxed' : ''} text-[13px] font-bold text-ink`}>{t(c.ur, c.en)}</div>
                  <div className={`${isUr ? 'urdu leading-relaxed' : ''} text-[10px] text-muted line-clamp-2 mt-auto`}>{t(c.desc, c.descEn || c.en)}</div>
                </div>
              </Link>
            ))
          )}
        </div>
        <BottomNav active="menu" />
      </div>
    </CartProvider>
  );
}
