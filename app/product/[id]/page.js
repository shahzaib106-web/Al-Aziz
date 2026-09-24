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
    <div dir={isUr ? 'rtl' : 'ltr'} className="mx-auto max-w-md md:max-w-none min-h-screen bg-cream pb-10 shadow-xl md:shadow-none app-page-container">
      <div className="md:grid md:grid-cols-2 md:gap-8 md:p-6 md:max-w-6xl md:mx-auto md:w-full">
      <div className="relative">
        <img
          src={item.image}
          alt={item.nameEn}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/img/spread.jpg';
          }}
          className="w-full h-72 md:h-[480px] md:rounded-2xl object-cover"
        />
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => router.back()}
          className="absolute top-4 start-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 backdrop-blur transition active:scale-95"
          aria-label="back"
        >
          <Icon name="back" className={`w-5 h-5 ${isUr ? 'scale-x-[-1]' : ''}`} />
        </button>
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setFav(toggleFav(item.id))}
          className={`absolute top-4 end-4 rounded-full p-2.5 backdrop-blur transition active:scale-95 ${fav ? 'bg-maroon text-white shadow-md' : 'bg-black/50 hover:bg-black/70 text-white'}`}
          aria-label="favorite"
        >
          <Icon name="heart" className="w-5 h-5" fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="bg-cream -mt-4 rounded-t-3xl relative p-5 md:mt-0 md:rounded-2xl md:border md:border-[#E8DCC3] md:shadow-card md:self-center">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className={`${isUr ? 'urdu text-xl' : 'text-xl'} font-extrabold text-ink ${isUr ? 'leading-loose' : 'leading-snug'}`}>{t(item.nameUr, item.nameEn)}</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
              <Star className="w-4 h-4 text-gold" />
              <span className="font-bold text-ink tabular-nums" dir="ltr">{item.rating}</span>
              <span className="tabular-nums">({item.reviews} {t('ریویوز', 'Reviews')})</span>
            </div>
          </div>
          <div className="text-maroon font-extrabold text-lg tabular-nums" dir="ltr">{fmt(price)}</div>
        </div>

        <p className={`${isUr ? 'urdu leading-relaxed' : 'leading-relaxed'} text-xs text-muted mt-3`}>{t(item.desc, item.descEn || item.desc)}</p>

        {item.options?.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-xs font-bold text-ink uppercase tracking-wider ${isUr ? 'urdu' : ''}`}>
                {t('سائز منتخب کریں (نصف یا فل)', 'Choose Portion (Half or Full)')}
              </h3>
              <span className="text-[10px] text-maroon font-bold bg-[#FBEDED] px-2 py-0.5 rounded-full">
                {t('لازمی انتخاب', 'Required')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {item.options.map((o) => {
                const isSelected = option?.label === o.label;
                const isHalf = o.label.toLowerCase().includes('half') || o.label === 'Half';
                const isFull = o.label.toLowerCase().includes('full') || o.label === 'Full';
                return (
                  <label
                    key={o.label}
                    onClick={() => setOption(o)}
                    className={`rounded-2xl border-2 p-3 text-start cursor-pointer transition active:scale-[.98] relative flex flex-col justify-between shadow-xs ${
                      isSelected
                        ? 'border-maroon bg-maroon/[.07] text-maroon ring-2 ring-maroon/25'
                        : 'border-[#E0D4BC] bg-white text-ink hover:border-maroon/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13.5px] font-extrabold flex items-center gap-1.5">
                        <span>{o.label}</span>
                        {isHalf && <span className="text-[11px] font-bold urdu text-muted px-1.5 py-0.5 rounded-full bg-[#EFE5D0]">نصف</span>}
                        {isFull && <span className="text-[11px] font-bold urdu text-muted px-1.5 py-0.5 rounded-full bg-[#EFE5D0]">فل</span>}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-maroon bg-maroon text-white' : 'border-[#C8BCA4]'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted font-medium mt-1">
                      {isHalf ? t('1 شخص کے لیے مناسب', '1 Person serving') : t('2-3 افراد کے لیے', '2-3 Persons')}
                    </span>
                    <span className="text-[14px] font-black mt-1.5 tabular-nums text-maroon" dir="ltr">
                      {fmt(o.price)}
                    </span>
                    <input type="radio" name="opt" className="hidden" checked={isSelected} onChange={() => setOption(o)} />
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {out && <p className={`${isUr ? 'urdu' : ''} text-xs text-maroon font-bold mt-4`}>{t('آج کے لیے اسٹاک ختم ہو گیا', 'Out of stock for today')}</p>}

        <div className="flex items-center gap-3 mt-6 pb-safe">
          <div dir="ltr">
            <Qty value={qty} onChange={setQty} max={Math.max(1, item.stock)} />
          </div>
          <button
            type="button"
            suppressHydrationWarning
            disabled={out}
            onClick={addToCart}
            className={`btn-maroon flex-1 min-w-0 h-11 text-[13px] md:text-sm tracking-wide disabled:opacity-50 flex items-center justify-center gap-2 ${isUr ? 'urdu' : ''}`}
          >
            <span>{t('کارٹ میں شامل کریں', 'ADD TO CART')}</span>
            <span>·</span>
            <span dir="ltr" className="tabular-nums font-extrabold">{fmt(price * qty)}</span>
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
