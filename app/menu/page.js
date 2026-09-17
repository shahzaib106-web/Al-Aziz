'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api, CartProvider, useLang } from '../../components/store';
import { PageHeader, BottomNav, MenuItemTile } from '../../components/customer';
import { Icon } from '../../components/icons';

function MenuInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { isUr, t } = useLang();
  const [cats, setCats] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cat, setCat] = useState(params.get('cat') || '');
  const [q, setQ] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    api('categories').then((c) => {
      setCats(c);
      setCat((cur) => cur || params.get('cat') || c[0]?.id || '');
    });
    api('menu').then(setMenu);
  }, []);

  const selectCat = (id) => {
    setCat(id);
    router.replace('/menu?cat=' + id, { scroll: false });
  };

  const list = q
    ? menu.filter((m) => (m.nameUr + m.nameEn).toLowerCase().includes(q.toLowerCase()))
    : menu.filter((m) => m.catId === cat);

  return (
    <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-24 md:pb-10 shadow-xl">
      <PageHeader
        title="Menu"
        right={
          <button onClick={() => setSearching((s) => !s)} className="p-1 hover:bg-white/10 rounded-lg" aria-label="search">
            <Icon name="search" className="w-5 h-5" />
          </button>
        }
      />
      {searching && (
        <div className="px-4 pt-3">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('کھانا تلاش کریں…', 'Search dishes…')} className={`field text-sm ${isUr ? 'urdu' : ''}`} />
        </div>
      )}
      {/* Category chips */}
      <div className="px-4 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <button key={c.id} onClick={() => selectCat(c.id)} className={`chip ${isUr ? 'urdu' : ''} text-xs ${cat === c.id && !q ? '!bg-maroon !text-white !border-maroon font-semibold' : ''}`}>
            {t(c.ur, c.en)}
          </button>
        ))}
      </div>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {list.map((m) => (
          <MenuItemTile key={m.id} item={m} onOpen={() => router.push('/product/' + m.id)} />
        ))}
        {list.length === 0 && <p className={`${isUr ? 'urdu' : ''} text-center text-sm text-muted py-10 col-span-2`}>{t('کوئی ڈش نہیں ملی', 'No dishes found')}</p>}
      </div>
      <BottomNav active="menu" />
    </div>
  );
}

export default function Menu() {
  return (
    <CartProvider>
      <MenuInner />
    </CartProvider>
  );
}
