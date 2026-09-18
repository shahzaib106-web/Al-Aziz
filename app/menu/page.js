'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api, CartProvider, useLang } from '../../components/store';
import { PageHeader, BottomNav, MenuItemTile, ProductModal, TileSkeleton } from '../../components/customer';
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
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([api('categories'), api('menu')])
      .then(([c, m]) => {
        setCats(c);
        setMenu(m);
        setCat((cur) => cur || params.get('cat') || c[0]?.id || '');
      })
      .finally(() => setLoaded(true));
  }, []);

  const selectCat = (id) => {
    setCat(id);
    router.replace('/menu?cat=' + id, { scroll: false });
  };

  const list = q
    ? menu.filter((m) => (m.nameUr + m.nameEn).toLowerCase().includes(q.toLowerCase()))
    : menu.filter((m) => m.catId === cat);

  return (
    <div dir="ltr" className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream pb-28 md:pb-10 shadow-xl">
      <PageHeader
        title="Menu"
        titleUr="مینیو"
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

      {/* Category chips — sticky */}
      <div className="sticky top-[52px] md:top-16 z-20 bg-cream/95 backdrop-blur px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#EFE5D0]/60">
        {cats.map((c) => (
          <button key={c.id} onClick={() => selectCat(c.id)} className={`chip ${isUr ? 'urdu' : ''} text-xs ${cat === c.id && !q ? '!bg-maroon !text-white !border-maroon font-semibold' : ''}`}>
            {t(c.ur, c.en)}
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {!loaded ? (
          <TileSkeleton count={8} />
        ) : (
          list.map((m) => <MenuItemTile key={m.id} item={m} onOpen={() => setSelected(m)} />)
        )}
        {loaded && list.length === 0 && (
          <p className={`${isUr ? 'urdu' : ''} text-center text-sm text-muted py-10 col-span-2`}>{t('کوئی ڈش نہیں ملی', 'No dishes found')}</p>
        )}
      </div>

      <BottomNav active="menu" />
      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function Menu() {
  return (
    <CartProvider>
      <Suspense fallback={<div className="mx-auto max-w-md md:max-w-6xl min-h-screen bg-cream" />}>
        <MenuInner />
      </Suspense>
    </CartProvider>
  );
}
