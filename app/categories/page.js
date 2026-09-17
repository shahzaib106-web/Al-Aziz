'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, CartProvider, useLang } from '../../components/store';
import { PageHeader, BottomNav } from '../../components/customer';
import { Icon } from '../../components/icons';

function Categories() {
  const { isUr, t } = useLang();
  const [cats, setCats] = useState([]);
  useEffect(() => {
    api('categories').then(setCats).catch(() => {});
  }, []);

  return (
    <CartProvider>
      <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-24 md:pb-10 shadow-xl">
        <PageHeader
          title="Categories"
          right={
            <Link href="/menu" className="p-1 hover:bg-white/10 rounded-lg" aria-label="search">
              <Icon name="search" className="w-5 h-5" />
            </Link>
          }
        />
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cats.map((c) => (
            <Link key={c.id} href={`/menu?cat=${c.id}`} className="card p-3 flex items-center gap-3 hover:border-maroon/40 transition">
              <img src={c.image} alt={c.en} className="w-14 h-14 rounded-lg object-cover border border-[#E8DCC3]" />
              <div className="flex-1">
                <div className={`${isUr ? 'urdu' : ''} text-sm font-bold text-ink ${isUr ? 'leading-relaxed' : ''}`}>{t(c.ur, c.en)}</div>
                <div className={`${isUr ? 'urdu' : ''} text-[11px] text-muted ${isUr ? 'leading-relaxed' : ''}`}>{t(c.desc, c.descEn || c.en)}</div>
              </div>
              <Icon name="chevR" className="w-4 h-4 text-muted" />
            </Link>
          ))}
        </div>
        <BottomNav active="menu" />
      </div>
    </CartProvider>
  );
}

export default Categories;
