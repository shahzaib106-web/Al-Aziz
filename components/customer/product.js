'use client';
import { useEffect, useState } from 'react';
import { Icon, Star } from '../icons';
import { useCart, useLang, fmt, toast } from '../store';

const ING_LABELS = {
  chicken: 'Chicken', rice: 'Basmati Rice', mutton: 'Mutton', flour: 'Wheat Flour',
  yogurt: 'Yogurt', tomato: 'Tomatoes', spices: 'Special Masala', milk: 'Fresh Milk', oil: 'Cooking Oil',
};

const ADDONS = [
  { id: 'raita', label: 'Raita', ur: 'رائتہ', price: 50 },
  { id: 'salad', label: 'Fresh Salad', ur: 'تازہ سلاد', price: 80 },
  { id: 'extra', label: 'Extra Chicken', ur: 'اضافی چکن', price: 250 },
];
const ADDON_CATS = ['c1', 'c2', 'c3', 'c4'];
const SPICES = ['Mild', 'Medium', 'Hot'];
const SPICE_UR = { Mild: 'ہلکی', Medium: 'درمیان', Hot: 'تیز' };

/* ---------- Qty stepper (44px-class tap targets) ---------- */
export function Qty({ value, onChange, max = 99, light = false, size = 'default' }) {
  const isSm = size === 'sm';
  return (
    <div className={`inline-flex items-center rounded-xl border select-none ${light ? 'border-white/30 bg-white/10 text-white' : 'border-[#D8CCB4] bg-white text-ink'} ${isSm ? 'h-7.5' : 'h-9 sm:h-10'}`}>
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => onChange(Math.max(1, value - 1))}
        className={`${isSm ? 'w-7 h-7' : 'w-9 sm:w-10 h-full'} flex items-center justify-center active:bg-black/5 rounded-l-xl`}
        aria-label="decrease"
      >
        <Icon name="minus" className={isSm ? 'w-3 h-3' : 'w-4 h-4'} strokeWidth={2.2} />
      </button>
      <span className={`${isSm ? 'text-xs w-6' : 'text-sm w-7'} font-bold text-center tabular-nums`} dir="ltr">{value}</span>
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => onChange(Math.min(value + 1, max))}
        className={`${isSm ? 'w-7 h-7' : 'w-9 sm:w-10 h-full'} flex items-center justify-center active:bg-black/5 rounded-r-xl`}
        aria-label="increase"
      >
        <Icon name="plus" className={isSm ? 'w-3 h-3' : 'w-4 h-4'} strokeWidth={2.2} />
      </button>
    </div>
  );
}

/* ---------- Inline add-to-cart: only "Add to Cart" button -> opens modal with Half/Full options ---------- */
export function TileAdd({ item, disabled, onOpen }) {
  const { isUr, t } = useLang();

  return (
    <button
      type="button"
      suppressHydrationWarning
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpen) onOpen();
      }}
      className="h-8 px-2.5 sm:px-3 rounded-full bg-maroon hover:bg-maroon-dark text-white text-[10.5px] sm:text-[11px] font-extrabold flex items-center gap-1 sm:gap-1.5 shadow-[0_2px_8px_rgba(158,27,30,0.25)] active:scale-95 transition disabled:opacity-40 shrink-0 select-none"
      aria-label={t('کارٹ میں شامل کریں', 'Add to Cart')}
      title={t('کارٹ میں شامل کریں', 'Add to Cart')}
    >
      <Icon name="cart" className="w-3.5 h-3.5 shrink-0" strokeWidth={2.4} />
      <span className="whitespace-nowrap">{t('کارٹ میں شامل کریں', 'Add to Cart')}</span>
    </button>
  );
}

/* ---------- Menu item tile card (compact, scannable, mobile-responsive) ---------- */
export function MenuItemTile({ item, onOpen, badge, className = '' }) {
  const { isUr, t } = useLang();
  const cart = useCart();

  const out = !item.available || item.stock <= 0;
  const hasOptions = Array.isArray(item.options) && item.options.length > 0;
  const halfOpt = item.options?.find((o) => o.label?.toLowerCase().includes('half'));
  const fullOpt = item.options?.find((o) => o.label?.toLowerCase().includes('full')) || item.options?.[1];
  const halfPrice = halfOpt?.price;
  const fullPrice = fullOpt?.price || item.price;
  const basePrice = halfPrice || item.price;

  // Items in cart
  const cartLines = cart?.items?.filter((i) => i.menuId === item.id) || [];
  const totalQty = cartLines.reduce((s, i) => s + i.qty, 0);

  return (
    <div
      onClick={onOpen}
      className={`card overflow-hidden cursor-pointer select-none transition-all duration-200 hover:border-maroon/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[.99] flex flex-col rounded-2xl group border border-[#E8DFC9] bg-white ${className}`}
    >
      {/* Card Image Area */}
      <div className="relative overflow-hidden aspect-[4/3] bg-[#EFE5D0]">
        <img
          src={item.image}
          alt={item.nameEn}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/img/spread.jpg';
          }}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            out ? 'grayscale opacity-70' : ''
          }`}
        />

        {/* Sold out overlay */}
        {out && (
          <span className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-2">
            <span className="bg-white/95 text-maroon text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md tracking-wider">
              {t('ختم ہو گیا', 'SOLD OUT')}
            </span>
          </span>
        )}

        {/* In-cart indicator */}
        {!out && totalQty > 0 && (
          <span
            className="absolute bottom-2 start-2 bg-leaf text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10"
            dir="ltr"
          >
            <Icon name="check" className="w-2.5 h-2.5 stroke-[3]" />
            <span>{totalQty}</span>
          </span>
        )}

        {/* Promotional Badge (Bestseller, Chef's Pick) */}
        {badge && (
          <span
            className={`absolute top-2 start-2 text-white text-[8px] sm:text-[9px] font-extrabold tracking-wider px-2 py-0.5 sm:py-1 rounded-md shadow-xs ${
              badge.tone === 'red'
                ? 'bg-maroon'
                : badge.tone === 'gold'
                ? 'bg-gold text-[#3E2C05]'
                : 'bg-leaf'
            }`}
          >
            {badge.label}
          </span>
        )}

        {/* Rating */}
        <span
          className="absolute top-2 end-2 bg-white/95 backdrop-blur-xs rounded-md px-1.5 py-0.5 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-ink shadow-xs"
          dir="ltr"
        >
          <Star className="w-3 h-3 text-gold" />
          <span className="tabular-nums">{item.rating}</span>
        </span>
      </div>

      {/* Card Content Area */}
      <div className="p-3 sm:p-3.5 flex flex-col gap-1 flex-1">
        {/* Title */}
        <div
          className={`${
            isUr ? 'urdu text-[14px] sm:text-[15px]' : 'text-[13px] sm:text-[14px]'
          } font-extrabold text-ink ${isUr ? 'leading-relaxed' : 'leading-snug'} line-clamp-1`}
        >
          {t(item.nameUr, item.nameEn)}
        </div>

        {/* Description */}
        <div
          className={`${
            isUr ? 'urdu leading-relaxed' : 'leading-snug'
          } text-[11px] text-muted line-clamp-2`}
        >
          {t(item.desc, item.descEn || item.desc)}
        </div>

        {/* Bottom Price & Add Action */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2.5 border-t border-[#F2EAE0]">
          <span className="text-maroon font-black text-[14px] sm:text-[15px] tabular-nums truncate" dir="ltr">
            {fmt(basePrice)}
            {hasOptions && <span className="text-[10px] font-bold text-muted ml-0.5">+</span>}
          </span>
          {!out ? (
            <TileAdd
              item={item}
              onOpen={onOpen}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ---------- Loading skeleton tile ---------- */
export function TileSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden animate-pulse" aria-hidden="true">
          <div className="w-full h-32 md:h-36 bg-[#EFE5D0]" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-[#EFE5D0] rounded w-4/5" />
            <div className="h-3 bg-[#EFE5D0] rounded w-2/5" />
          </div>
        </div>
      ))}
    </>
  );
}

/* ---------- Premium product detail sheet ---------- */
export function ProductModal({ item, onClose }) {
  const { add } = useCart();
  const { isUr, t } = useLang();
  const [option, setOption] = useState(null);
  const [qty, setQty] = useState(1);
  const [spice, setSpice] = useState('Medium');
  const [addons, setAddons] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (item) {
      setOption(item.options?.[0] || null);
      setQty(1);
      setSpice('Medium');
      setAddons([]);
      setNote('');
      document.body.style.overflow = 'hidden';
      return () => (document.body.style.overflow = '');
    }
  }, [item]);

  if (!item) return null;
  const out = !item.available || item.stock <= 0;
  const sizePrice = option ? option.price : item.price;
  const addonSum = addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0), 0);
  const unit = sizePrice + addonSum;
  const showAddons = ADDON_CATS.includes(item.catId);
  const ingredients = Object.keys(item.recipe || {}).map((k) => ING_LABELS[k]).filter(Boolean);

  const toggleAddon = (id) => setAddons((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const addToCart = () => {
    const parts = [];
    if (option) parts.push(option.label);
    parts.push(isUr ? SPICE_UR[spice] : spice);
    addons.forEach((id) => parts.push('+' + (ADDONS.find((a) => a.id === id)?.label || '')));
    if (note.trim()) parts.push(note.trim());
    add(item, { label: parts.join(' · '), price: unit }, qty);
    toast(t('کارٹ میں شامل ہو گیا', 'Added to cart'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] flex items-end md:items-center justify-center fade-in" onClick={onClose}>
      <div className="bg-cream w-full max-w-md md:max-w-lg md:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92dvh] md:max-h-[85vh] sheet-in" onClick={(e) => e.stopPropagation()}>
        {/* Drag handle */}
        <div className="md:hidden flex justify-center pt-2.5 pb-1 shrink-0">
          <span className="w-10 h-1 rounded-full bg-[#D8CCB4]" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="relative shrink-0">
            <img src={item.image} alt={item.nameEn} className="w-full h-44 sm:h-52 md:h-60 object-cover" />
            <button type="button" suppressHydrationWarning onClick={onClose} className="absolute top-3 right-3 w-10 h-10 bg-black/45 text-white rounded-full flex items-center justify-center backdrop-blur active:scale-95" aria-label="close">
              <Icon name="x" className="w-5 h-5" />
            </button>
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1 text-[11px] font-bold text-ink shadow-sm">
              <Star className="w-3.5 h-3.5 text-gold" /> {item.rating} <span className="text-muted font-medium">({item.reviews})</span>
            </span>
          </div>

          <div className="px-5 pt-4 pb-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className={`${isUr ? 'urdu' : ''} text-lg font-extrabold text-ink ${isUr ? 'leading-loose' : 'leading-snug'}`}>{t(item.nameUr, item.nameEn)}</h2>
              <div className="text-maroon font-extrabold text-lg shrink-0 tabular-nums" dir="ltr">{fmt(sizePrice)}</div>
            </div>
            <p className={`${isUr ? 'urdu' : ''} text-xs text-muted mt-2 ${isUr ? 'leading-loose' : 'leading-relaxed'}`}>{t(item.desc, item.descEn || item.desc)}</p>

            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {ingredients.map((ing) => (
                  <span key={ing} className="text-[10px] font-semibold text-[#6E675C] bg-[#EFE5D0] rounded-full px-2.5 py-1">{ing}</span>
                ))}
              </div>
            )}

            {item.options?.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">
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
                      <button
                        type="button"
                        suppressHydrationWarning
                        key={o.label}
                        onClick={() => setOption(o)}
                        className={`rounded-2xl border-2 p-3 text-start transition active:scale-[.98] relative flex flex-col justify-between shadow-xs ${
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
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-5">
              <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">{t('مرچ مصالحو کی سطح', 'Spice level')}</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {SPICES.map((sp) => (
                  <button type="button" suppressHydrationWarning key={sp} onClick={() => setSpice(sp)} className={`h-10 rounded-xl border-2 text-[12px] font-bold transition active:scale-[.98] ${spice === sp ? 'border-maroon bg-maroon/[.06] text-maroon' : 'border-[#E0D4BC] bg-white text-ink'}`}>
                    {t(SPICE_UR[sp], sp)}
                  </button>
                ))}
              </div>
            </div>

            {showAddons && (
              <div className="mt-5">
                <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">{t('اضافہ کریں', 'Add-ons')}</h3>
                <div className="space-y-2">
                  {ADDONS.map((a) => {
                    const on = addons.includes(a.id);
                    return (
                      <button type="button" suppressHydrationWarning key={a.id} onClick={() => toggleAddon(a.id)} className={`w-full flex items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 transition active:scale-[.99] ${on ? 'border-maroon bg-maroon/[.06]' : 'border-[#E0D4BC] bg-white'}`}>
                        <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${on ? 'bg-maroon border-maroon text-white' : 'border-[#C8BCA4] text-transparent'}`}>
                          <Icon name="check" className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="flex-1 text-left text-[12px] font-bold text-ink">{t(a.ur, a.label)}</span>
                        <span className="text-[12px] font-semibold text-muted tabular-nums" dir="ltr">+ {fmt(a.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-5">
              <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">{t('خصوصی ہدایات', 'Special instructions')}</h3>
              <textarea
                suppressHydrationWarning
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder={t('مثلاً: تیل کم رکھیں', 'e.g. less oil, no green chillies')}
                className={`field !h-auto py-2.5 text-[12px] resize-none ${isUr ? 'urdu' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="shrink-0 border-t border-[#E8DCC3] bg-cream px-4 pt-3 pb-3 pb-safe md:rounded-b-2xl" dir="ltr">
          {out && <p className={`${isUr ? 'urdu' : ''} text-xs text-maroon font-bold pb-2`}>{t('آج کے لیے اسٹاک ختم ہو گیا', 'Out of stock for today')}</p>}
          <div className="flex items-center gap-3">
            <Qty value={qty} onChange={setQty} max={Math.max(1, item.stock)} />
            <button type="button" suppressHydrationWarning disabled={out} onClick={addToCart} className="btn-maroon flex-1 min-w-0 h-11 rounded-xl text-[13px] font-extrabold tracking-wide truncate disabled:opacity-50">
              ADD TO CART · {fmt(unit * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
