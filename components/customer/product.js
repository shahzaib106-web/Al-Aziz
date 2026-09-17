'use client';
import { useEffect, useState } from 'react';
import { Icon, Star } from '../icons';
import { useCart, useLang, fmt, toast } from '../store';

/* ---------- Qty stepper ---------- */
export function Qty({ value, onChange, max = 99, light = false }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border px-2 py-1 ${light ? 'border-white/30 bg-white/10 text-white' : 'border-[#D8CCB4] bg-white text-ink'}`}>
      <button onClick={() => onChange(value - 1)} className="p-1" aria-label="decrease">
        <Icon name="minus" className="w-4 h-4" />
      </button>
      <span className="text-sm font-semibold w-4 text-center" dir="ltr">{value}</span>
      <button onClick={() => onChange(Math.min(value + 1, max))} className="p-1" aria-label="increase">
        <Icon name="plus" className="w-4 h-4" />
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
      className="card overflow-hidden cursor-pointer transition duration-200 hover:border-maroon/40 hover:shadow-md hover:-translate-y-0.5 flex flex-col"
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
      <div className="p-3 flex flex-col gap-1 flex-1">
        <div className={`${isUr ? 'urdu' : ''} text-[13px] font-semibold text-ink ${isUr ? 'leading-relaxed' : 'leading-snug'} line-clamp-2 min-h-[2.2em]`}>
          {t(item.nameUr, item.nameEn)}
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-maroon font-extrabold text-sm" dir="ltr">{fmt(item.price)}</span>
          {!out && (
            <span className="bg-leaf/10 text-leaf rounded-lg p-1.5">
              <Icon name="plus" className="w-4 h-4" strokeWidth={2.4} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Product detail card modal ---------- */
export function ProductModal({ item, onClose }) {
  const { add } = useCart();
  const { isUr, t } = useLang();
  const [option, setOption] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (item) {
      setOption(item.options?.find((o) => o.price === item.price) || item.options?.[item.options.length - 1] || null);
      setQty(1);
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
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] flex items-end md:items-center justify-center" onClick={onClose}>
      <div
        className="bg-cream w-full max-w-md md:max-w-lg md:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={item.image} alt={item.nameEn} className="w-full h-52 md:h-64 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-2 backdrop-blur" aria-label="close">
            <Icon name="x" className="w-4 h-4" />
          </button>
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-md px-2 py-1 flex items-center gap-1 text-[11px] font-bold text-ink">
            <Star className="w-3.5 h-3.5 text-gold" /> {item.rating} <span className="text-muted font-medium">({item.reviews})</span>
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className={`${isUr ? 'urdu' : ''} text-lg font-bold text-ink ${isUr ? 'leading-loose' : 'leading-snug'}`}>{t(item.nameUr, item.nameEn)}</h2>
            <div className="text-maroon font-extrabold text-lg shrink-0" dir="ltr">{fmt(price)}</div>
          </div>

          <p className={`${isUr ? 'urdu' : ''} text-xs text-muted mt-2 ${isUr ? 'leading-loose' : 'leading-relaxed'}`}>{t(item.desc, item.descEn || item.desc)}</p>

          {item.options?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">{t('سائز منتخب کریں', 'Choose size')}</h3>
              <div className="grid grid-cols-2 gap-2">
                {item.options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => setOption(o)}
                    className={`rounded-lg border px-3 py-2.5 text-left text-[12px] font-semibold transition ${
                      option?.label === o.label ? 'border-maroon bg-maroon/5 text-maroon ring-1 ring-maroon/25' : 'border-[#E0D4BC] bg-white text-ink'
                    }`}
                  >
                    <span dir="ltr">{o.label}</span>
                    <span className="block text-[11px] font-bold mt-0.5" dir="ltr">{fmt(o.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {out && <p className={`${isUr ? 'urdu' : ''} text-xs text-maroon font-bold mt-4`}>{t('آج کے لیے اسٹاک ختم ہو گیا', 'Out of stock for today')}</p>}

          <div className="flex items-center gap-3 mt-5" dir="ltr">
            <Qty value={qty} onChange={(v) => setQty(Math.max(1, v))} max={Math.max(1, item.stock)} />
            <button disabled={out} onClick={addToCart} className="btn-maroon flex-1 py-3 text-sm tracking-widest disabled:opacity-50">
              ADD TO CART · {fmt(price * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
