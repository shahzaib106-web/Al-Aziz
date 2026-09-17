'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, useCart, fmt, toast, getFavs, toggleFav, useLang, CartProvider } from '../../../components/store';
import { Qty } from '../../../components/customer';
import { Icon, Star } from '../../../components/icons';

function ProductInner() {
  const { id } = useParams();
  const router = useRouter();
  const { add } = useCart();
  const { isUr, t } = useLang();
  const [item, setItem] = useState(null);
  const [option, setOption] = useState(null);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    api('menu/' + id)
      .then((m) => {
        setItem(m);
        setOption(m.options?.find((o) => o.price === m.price) || m.options?.[m.options.length - 1] || null);
        setFav(getFavs().includes(m.id));
      })
      .catch(() => {});
  }, [id]);

  if (!item) return <div className="mx-auto max-w-md min-h-screen bg-cream" />;

  const out = !item.available || item.stock <= 0;
  const price = option ? option.price : item.price;

  const addToCart = () => {
    add(item, option, qty);
    toast(t('کارٹ میں شامل ہو گیا', 'Added to cart'));
    router.push('/cart');
  };

  return (
    <div dir="ltr" className="mx-auto max-w-md md:max-w-5xl min-h-screen bg-cream pb-10 shadow-xl">
      <div className="md:grid md:grid-cols-2 md:gap-8 md:p-6">
      <div className="relative">
        <img src={item.image} alt={item.nameEn} className="w-full h-72 md:h-[480px] md:rounded-2xl object-cover" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 bg-black/40 text-white rounded-full p-2 backdrop-blur" aria-label="back">
          <Icon name="back" className="w-5 h-5" />
        </button>
        <button
          onClick={() => setFav(toggleFav(item.id))}
          className={`absolute top-4 right-4 rounded-full p-2 backdrop-blur ${fav ? 'bg-maroon text-white' : 'bg-black/40 text-white'}`}
          aria-label="favorite"
        >
          <Icon name="heart" className="w-5 h-5" fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="bg-cream -mt-4 rounded-t-3xl relative p-5 md:mt-0 md:rounded-2xl md:border md:border-[#E8DCC3] md:shadow-card md:self-center">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className={`${isUr ? 'urdu' : ''} text-xl font-bold text-ink ${isUr ? 'leading-loose' : 'leading-snug'}`}>{t(item.nameUr, item.nameEn)}</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted mt-1" dir="ltr">
              <Star className="w-4 h-4 text-gold" />
              <span className="font-semibold text-ink">{item.rating}</span>
              <span>({item.reviews} {t('ریویوز', 'Reviews')})</span>
            </div>
          </div>
          <div className="text-maroon font-extrabold text-lg" dir="ltr">{fmt(price)}</div>
        </div>

        <p className={`${isUr ? 'urdu' : ''} text-xs text-muted mt-3 ${isUr ? 'leading-loose' : 'leading-relaxed'}`}>{t(item.desc, item.descEn || item.desc)}</p>

        {item.options?.length > 0 && (
          <div className="mt-5">
            <h3 className="text-xs font-bold text-ink mb-2" dir="ltr">Options</h3>
            <div className="space-y-2">
              {item.options.map((o) => (
                <label key={o.label} className={`card flex items-center justify-between px-4 py-3 cursor-pointer ${option?.label === o.label ? '!border-maroon ring-1 ring-maroon/30' : ''}`}>
                  <span className="flex items-center gap-3 text-sm" dir="ltr">
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${option?.label === o.label ? 'border-maroon' : 'border-[#C8BCA4]'}`}>
                      {option?.label === o.label && <span className="w-2 h-2 rounded-full bg-maroon" />}
                    </span>
                    {o.label}
                  </span>
                  <span className="text-sm font-semibold" dir="ltr">{fmt(o.price)}</span>
                  <input type="radio" name="opt" className="hidden" checked={option?.label === o.label} onChange={() => setOption(o)} />
                </label>
              ))}
            </div>
          </div>
        )}

        {out && <p className={`${isUr ? 'urdu' : ''} text-xs text-maroon font-bold mt-4`}>{t('آج کے لیے اسٹاک ختم ہو گیا', 'Out of stock for today')}</p>}

        <div className="flex items-center gap-3 mt-6 pb-safe" dir="ltr">
          <Qty value={qty} onChange={setQty} max={Math.max(1, item.stock)} />
          <button disabled={out} onClick={addToCart} className="btn-maroon flex-1 min-w-0 h-11 text-[13px] md:text-sm tracking-wide disabled:opacity-50">
            ADD TO CART · {fmt(price * qty)}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function Product() {
  return (
    <CartProvider>
      <ProductInner />
    </CartProvider>
  );
}
