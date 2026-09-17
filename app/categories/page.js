'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, CartProvider, useLang } from '../../components/store';
import { PageHeader, BottomNav } from '../../components/customer';
import { Icon } from '../../components/icons';

export default function Categories() {
  const { isUr, t } = useLang();
  const [cats, setCats] = useState([]);
  useEffect(() => {
    api('categories').then(setCats).catch(() => {});
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
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cats.map((c) => (
            <Link key={c.id} href={`/menu?cat=${c.id}`} className="card p-3.5 flex items-center gap-3.5 hover:border-maroon/40 hover:shadow-md transition group">
              <img src={c.image} alt={c.en} className="w-14 h-14 rounded-xl object-cover border border-[#E8DCC3] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className={`${isUr ? 'urdu leading-relaxed' : ''} text-[13px] font-bold text-ink`}>{t(c.ur, c.en)}</div>
                <div className={`${isUr ? 'urdu leading-relaxed' : ''} text-[11px] text-muted mt-0.5 line-clamp-1`}>{t(c.desc, c.descEn || c.en)}</div>
              </div>
              <Icon name="chevR" className="w-4 h-4 text-muted group-hover:text-maroon group-hover:translate-x-0.5 transition shrink-0" />
            </Link>
          ))}
        </div>
        <BottomNav active="menu" />
      </div>
    </CartProvider>
  );
}


