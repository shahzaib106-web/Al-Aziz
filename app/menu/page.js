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
  const initialQ = params.get('q') || '';
  const [cats, setCats] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cat, setCat] = useState(params.get('cat') || '');
  const [q, setQ] = useState(initialQ);
  const [searching, setSearching] = useState(Boolean(initialQ));
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([api('categories'), api('menu')])
      .then(([c, m]) => {
        setCats(c);
        setMenu(m);
        if (!initialQ) {
          setCat((cur) => cur || params.get('cat') || c[0]?.id || '');
        }
      })
      .finally(() => setLoaded(true));
  }, [initialQ]);

  const selectCat = (id) => {
    setCat(id);
    if (q) setQ('');
    router.replace(id ? '/menu?cat=' + id : '/menu', { scroll: false });
  };

  const query = q.trim().toLowerCase();
  const list = query
    ? menu.filter((m) =>
        ((m.nameUr || '') + ' ' + (m.nameEn || '') + ' ' + (m.desc || '') + ' ' + (m.descEn || '')).toLowerCase().includes(query)
      )
    : cat
    ? menu.filter((m) => m.catId === cat)
    : menu;

  return (
    <div dir={isUr ? 'rtl' : 'ltr'} className="mx-auto max-w-md md:max-w-none min-h-screen bg-cream pb-28 md:pb-10 shadow-xl md:shadow-none flex flex-col">
      <PageHeader
        title="Menu"
        titleUr="مینیو"
        right={
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setSearching((s) => {
                if (s && q) setQ('');
                return !s;
              });
            }}
            className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg active:scale-95 transition"
            aria-label="search"
          >
            <Icon name={searching ? 'x' : 'search'} className="w-5 h-5" />
          </button>
        }
      />

      {/* Search Bar on Menu Page */}
      {searching && (
        <div className="px-4 pt-3.5 pb-2 md:max-w-7xl md:mx-auto md:w-full fade-in">
          <div className="relative flex items-center">
            <Icon name="search" className="w-4 h-4 text-[#A79E8C] absolute start-3.5 pointer-events-none" />
            <input
              type="text"
              suppressHydrationWarning
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setQ('');
                  setSearching(false);
                }
              }}
              placeholder={t('کھانا تلاش کریں (جیسے بریانی، کڑاہی، کباب)…', 'Search dishes (e.g. biryani, karahi, kebab)…')}
              className={`w-full h-11 rounded-xl border border-[#D8CCB4] bg-white ps-10 pe-10 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15 shadow-sm transition ${isUr ? 'urdu' : ''}`}
            />
            {q && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setQ('')}
                className="absolute end-3 w-6 h-6 rounded-full bg-[#EFE5D0] hover:bg-[#DDD2BC] text-ink flex items-center justify-center transition active:scale-90"
                aria-label="Clear search"
              >
                <Icon name="x" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {q.trim() && (
            <div className="flex items-center justify-between text-xs text-muted mt-2 px-1">
              <span>
                {t(`"${q.trim()}" کے لیے ${list.length} کھانے ملے`, `Found ${list.length} ${list.length === 1 ? 'dish' : 'dishes'} for "${q.trim()}"`)}
              </span>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setQ('')}
                className="text-maroon font-bold hover:underline"
              >
                {t('صاف کریں', 'Clear')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Category chips — sticky */}
      <div className="sticky top-[50px] md:top-16 z-20 bg-cream/95 backdrop-blur-md px-4 md:px-6 py-2.5 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#EFE5D0] md:max-w-7xl md:mx-auto md:w-full">
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => selectCat('')}
          className={`chip text-xs font-semibold shrink-0 transition ${!cat && !q ? '!bg-maroon !text-white !border-maroon shadow-sm' : 'hover:border-maroon/40'} ${isUr ? 'urdu' : ''}`}
        >
          {t('تمام مینیو', 'All Dishes')}
        </button>
        {cats.map((c) => (
          <button
            type="button"
            suppressHydrationWarning
            key={c.id}
            onClick={() => selectCat(c.id)}
            className={`chip text-xs font-semibold shrink-0 transition ${cat === c.id && !q ? '!bg-maroon !text-white !border-maroon shadow-sm' : 'hover:border-maroon/40'} ${isUr ? 'urdu' : ''}`}
          >
            {t(c.ur, c.en)}
          </button>
        ))}
      </div>

      <div className="p-3 sm:p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4 md:max-w-7xl md:mx-auto md:w-full flex-1">
        {!loaded ? (
          <TileSkeleton count={8} />
        ) : (
          list.map((m) => <MenuItemTile key={m.id} item={m} onOpen={() => setSelected(m)} />)
        )}
        {loaded && list.length === 0 && (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 card p-8 text-center flex flex-col items-center justify-center gap-3 my-4">
            <div className="w-14 h-14 rounded-full bg-[#EFE3C8] text-maroon flex items-center justify-center">
              <Icon name="search" className="w-6 h-6" />
            </div>
            <h4 className={`text-base font-extrabold text-ink ${isUr ? 'urdu' : ''}`}>
              {t('کوئی ڈش نہیں ملی', 'No dishes found')}
            </h4>
            <p className={`text-xs text-muted max-w-sm ${isUr ? 'urdu leading-relaxed' : 'leading-relaxed'}`}>
              {q.trim()
                ? t(`"${q.trim()}" سے ملتا جلتا کوئی کھانا دستیاب نہیں ہے۔`, `No dishes matched "${q.trim()}".`)
                : t('اس کیٹیگری میں فی الحال کوئی کھانا موجود نہیں ہے۔', 'No dishes in this category currently.')}
            </p>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => { setQ(''); setCat(''); }}
              className="btn btn-sm btn-primary mt-2"
            >
              {t('تمام مینیو دیکھیں', 'View All Dishes')}
            </button>
          </div>
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
      <Suspense fallback={<div className="mx-auto max-w-md md:max-w-none min-h-screen bg-cream" />}>
        <MenuInner />
      </Suspense>
    </CartProvider>
  );
}
