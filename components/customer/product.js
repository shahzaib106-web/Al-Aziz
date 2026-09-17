'use client';
import { useEffect, useState } from 'react';
import { Icon, Star } from '../icons';
import { useCart, useLang, fmt, toast } from '../store';

/* ---------- Qty stepper (44px-class tap targets) ---------- */
export function Qty({ value, onChange, max = 99, light = false }) {
  return (
    <div className={`inline-flex items-center rounded-xl border select-none ${light ? 'border-white/30 bg-white/10 text-white' : 'border-[#D8CCB4] bg-white text-ink'}`}>
      <button onClick={() => onChange(Math.max(1, value - 1))} className="w-10 h-10 flex items-center justify-center active:bg-black/5 rounded-l-xl" aria-label="decrease">
        <Icon name="minus" className="w-4 h-4" strokeWidth={2.2} />
      </button>
      <span className="text-sm font-bold w-7 text-center tabular-nums" dir="ltr">{value}</span>
      <button onClick={() => onChange(Math.min(value + 1, max))} className="w-10 h-10 flex items-center justify-center active:bg-black/5 rounded-r-xl" aria-label="increase">
        <Icon name="plus" className="w-4 h-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}

/* ---------- Menu item tile card ---------- */
export function MenuItemTile({ item, onOpen }) {
  const { isUr, t } = useLang();
  const out = !item.available || item.stock <= 0;
  return (
    <div
      onClick={onOpen}
      className="card overflow-hidden cursor-pointer select-none transition duration-200 hover:border-maroon/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[.98] flex flex-col"
    >
      <div className="relative">
        <img src={item.image} alt={item.nameEn} className={`w-full h-28 md:h-36 object-cover ${out ? 'grayscale opacity-70' : ''}`} />
        {out && (
          <span className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="bg-white text-maroon text-[10px] font-bold px-3 py-1 rounded-full">{t('ختم ہو گیا', 'SOLD OUT')}</span>
          </span>
        )}
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur rounded-md px-1.5 py-0.5 flex items-center gap-1 text-[10px] font-bold text-ink">
          <Star className="w-3 h-3 text-gold" /> {item.rating}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <div className={`${isUr ? 'urdu' : ''} text-[13px] font-semibold text-ink ${isUr ? 'leading-relaxed' : 'leading-snug'} line-clamp-2 min-h-[2.2em]`}>
          {t(item.nameUr, item.nameEn)}
        </div>
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <span className="text-maroon font-extrabold text-[13px] md:text-sm truncate" dir="ltr">{fmt(item.price)}</span>
          {!out && (
            <span className="bg-leaf text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0">
              <Icon name="plus" className="w-4 h-4" strokeWidth={2.4} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Product detail card modal ----------
   Mobile: bottom sheet with pinned action bar. Desktop: centered dialog. */
export function ProductModal({ item, onClose }) {
  const { add } = useCart();
  const { isUr, t } = useLang();
  const [option, setOption] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (item) {
      setOption(item.options?.find((o) => o.price === item.price) || item.options?.[item.options.length - 1] || null);
      setQty(1);
      document.body.style.overflow = 'hidden';
      return () => (document.body.style.overflow = '');
    }
  }, [item]);

  if (!item) return null;
  const out = !item.available || item.stock <= 0;
  const price = option ? option.price : item.price;

  const addToCart = () => {
    add(item, option, qty);
    toast(t('کارٹ میں شامل ہو گیا', 'Added to cart'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] flex items-end md:items-center justify-center fade-in" onClick={onClose}>
      <div
        className="bg-cream w-full max-w-md md:max-w-lg md:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col max-h-[90dvh] md:max-h-[85vh] sheet-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-2.5 pb-1 shrink-0">
          <span className="w-10 h-1 rounded-full bg-[#D8CCB4]" />
        </div>

        {/* Image */}
        <div className="relative shrink-0">
          <img src={item.image} alt={item.nameEn} className="w-full h-44 sm:h-52 md:h-60 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 bg-black/45 text-white rounded-full flex items-center justify-center backdrop-blur active:scale-95"
            aria-label="close"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1 text-[11px] font-bold text-ink shadow-sm">
            <Star className="w-3.5 h-3.5 text-gold" /> {item.rating} <span className="text-muted font-medium">({item.reviews})</span>
          </span>
        </div>

        {/* Scrollable middle */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className={`${isUr ? 'urdu' : ''} text-lg font-bold text-ink ${isUr ? 'leading-loose' : 'leading-snug'}`}>{t(item.nameUr, item.nameEn)}</h2>
            <div className="text-maroon font-extrabold text-lg shrink-0 tabular-nums" dir="ltr">{fmt(price)}</div>
          </div>

          <p className={`${isUr ? 'urdu' : ''} text-xs text-muted mt-2 ${isUr ? 'leading-loose' : 'leading-relaxed'}`}>{t(item.desc, item.descEn || item.desc)}</p>

          {item.options?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">{t('سائز منتخب کریں', 'Choose size')}</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {item.options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => setOption(o)}
                    className={`rounded-xl border-2 px-3 py-3 text-left transition active:scale-[.98] ${
                      option?.label === o.label ? 'border-maroon bg-maroon/[.06] text-maroon' : 'border-[#E0D4BC] bg-white text-ink'
                    }`}
                  >
                    <span className="block text-[12px] font-bold" dir="ltr">{o.label}</span>
                    <span className="block text-[12px] font-semibold mt-0.5 tabular-nums" dir="ltr">{fmt(o.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {out && <p className={`${isUr ? 'urdu' : ''} text-xs text-maroon font-bold mt-4`}>{t('آج کے لیے اسٹاک ختم ہو گیا', 'Out of stock for today')}</p>}
        </div>

        {/* Pinned action bar */}
        <div className="shrink-0 border-t border-[#E8DCC3] bg-cream px-4 pt-3 pb-3 pb-safe md:rounded-b-2xl" dir="ltr">
          <div className="flex items-center gap-3">
            <Qty value={qty} onChange={setQty} max={Math.max(1, item.stock)} />
            <button
              disabled={out}
              onClick={addToCart}
              className="btn-maroon flex-1 min-w-0 h-11 text-[13px] md:text-sm tracking-wide truncate disabled:opacity-50"
            >
              ADD TO CART · {fmt(price * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
