'use client';
import Link from 'next/link';
import { useCart, fmt, useLang, CartProvider } from '../../components/store';
import { PageHeader, BottomNav, Qty } from '../../components/customer';
import { Icon } from '../../components/icons';

function CartInner() {
  const { items, setQty, clear, subtotal } = useCart();
  const { isUr, t } = useLang();
  const freeAbove = 1500;
  const needed = Math.max(0, freeAbove - subtotal);
  const progress = Math.min(100, Math.round((subtotal / freeAbove) * 100));

  return (
    <div dir={isUr ? 'rtl' : 'ltr'} className="mx-auto max-w-md md:max-w-none min-h-screen bg-cream pb-28 md:pb-10 shadow-xl md:shadow-none flex flex-col">
      <PageHeader
        title="Your Cart"
        titleUr="آپ کا کارٹ"
        right={
          items.length > 0 ? (
            <button
              type="button"
              suppressHydrationWarning
              onClick={clear}
              className={`text-[12px] font-bold tracking-wide hover:underline px-2.5 py-1 rounded text-white/90 hover:text-white ${isUr ? 'urdu' : ''}`}
            >
              {t('صاف کریں', 'Clear')}
            </button>
          ) : null
        }
      />

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center py-16">
          <div className="w-20 h-20 rounded-full bg-[#EFE3C8] flex items-center justify-center text-maroon shadow-inner">
            <Icon name="cart" className="w-9 h-9" strokeWidth={1.6} />
          </div>
          <h2 className={`text-base font-extrabold text-ink ${isUr ? 'urdu' : ''}`}>
            {t('آپ کا کارٹ خالی ہے', 'Your cart is empty')}
          </h2>
          <p className={`${isUr ? 'urdu leading-relaxed' : ''} text-xs text-muted max-w-xs`}>
            {t('آپ نے ابھی تک کوئی ڈش شامل نہیں کی۔ ہمارے لذیذ کھانوں میں سے انتخاب کریں۔', 'Looks like you haven\'t added any delicious food yet. Check out our menu.')}
          </p>
          <Link href="/menu" className={`btn btn-primary mt-2 ${isUr ? 'urdu' : ''}`}>
            {t('مینیو دیکھیں', 'Explore Menu')}
          </Link>
        </div>
      ) : (
        <div className="p-4 md:p-6 md:max-w-6xl md:mx-auto md:w-full md:grid md:grid-cols-3 md:gap-6 md:items-start flex-1">
          <div className="space-y-3 md:col-span-2">
            {/* Free delivery indicator */}
            <div className="card p-3.5 bg-gradient-to-r from-cream-card to-white border border-[#E8DFC9]">
              <div className="flex items-center justify-between text-xs font-bold text-ink">
                <span className="flex items-center gap-1.5">
                  <Icon name="sparkle" className="w-4 h-4 text-leaf" />
                  {needed === 0
                    ? t('مفت ڈیلیوری کے اہل ہیں!', 'You qualified for FREE delivery!')
                    : t(`مفت ڈیلیوری کے لیے مزید ${fmt(needed)} کا آرڈر کریں`, `Add ${fmt(needed)} more for FREE delivery`)}
                </span>
                <span className="text-leaf tabular-nums font-extrabold" dir="ltr">{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFE5D0] mt-2 overflow-hidden">
                <div
                  className="h-full bg-leaf rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {items.map((i) => (
              <div key={i.key} className="card p-3.5 flex items-center gap-3">
                <img
                  src={i.image}
                  alt={i.nameEn}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/img/spread.jpg';
                  }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-[#E8DCC3] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className={`${isUr ? 'urdu text-[14px]' : 'text-sm'} font-extrabold text-ink line-clamp-1`}>
                    {t(i.nameUr, i.nameEn)}
                  </div>
                  {i.option && <div className="text-[11px] text-muted font-medium mt-0.5">{i.option}</div>}
                  <div className="text-maroon font-extrabold text-sm mt-1 tabular-nums" dir="ltr">
                    {fmt(i.price)}
                  </div>
                </div>
                <div className="shrink-0" dir="ltr">
                  <Qty value={i.qty} onChange={(v) => setQty(i.key, v)} max={i.stock} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-0 md:sticky md:top-20">
            <div className="card p-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-muted">
                <span>{t('ذیلی کل', 'Subtotal')}</span>
                <span className="text-ink font-semibold tabular-nums" dir="ltr">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>{t('ڈیلیوری فیس', 'Delivery Fee')}</span>
                <span className="text-xs font-semibold text-leaf">
                  {needed === 0 ? t('مفت', 'FREE') : t('چیک آؤٹ پر', 'Calculated at checkout')}
                </span>
              </div>
              <div className="flex justify-between font-extrabold text-ink border-t border-[#EFE5D0] pt-2.5 mt-2">
                <span>{t('کل رقم', 'Total')}</span>
                <span className="text-maroon font-extrabold text-base tabular-nums" dir="ltr">{fmt(subtotal)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className={`btn btn-primary w-full text-sm mt-3 ${isUr ? 'urdu' : 'tracking-widest'}`}
            >
              {t('چیک آؤٹ کریں', 'PROCEED TO CHECKOUT')}
            </Link>
          </div>
        </div>
      )}
      <BottomNav active="cart" />
    </div>
  );
}

export default function Cart() {
  return (
    <CartProvider>
      <CartInner />
    </CartProvider>
  );
}
