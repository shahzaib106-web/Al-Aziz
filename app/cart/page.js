'use client';
import Link from 'next/link';
import { useCart, fmt, useLang, CartProvider } from '../../components/store';
import { PageHeader, BottomNav, Qty } from '../../components/customer';

function CartInner() {
  const { items, setQty, clear, subtotal } = useCart();
  const { isUr, t } = useLang();

  return (
    <div dir="ltr" className="mx-auto max-w-md md:max-w-5xl min-h-screen bg-cream pb-24 md:pb-10 shadow-xl flex flex-col">
      <PageHeader title="Your Cart" right={items.length > 0 ? <button onClick={clear} className="text-[11px] font-semibold tracking-wide hover:underline px-1">Clear</button> : null} />

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center py-16">
          <div className="w-20 h-20 rounded-full bg-[#EFE3C8] flex items-center justify-center text-maroon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-9 h-9"><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.6 12h10.2l2.2-8H6" /></svg>
          </div>
          <p className={`${isUr ? 'urdu' : ''} text-sm text-muted`}>{t('آپ کا کارٹ خالی ہے', 'Your cart is empty')}</p>
          <Link href="/menu" className={`btn-maroon text-xs px-6 py-2.5 ${isUr ? 'urdu' : 'tracking-wide font-semibold'}`}>{t('مینیو دیکھیں', 'View Menu')}</Link>
        </div>
      ) : (
        <div className="p-4 md:grid md:grid-cols-3 md:gap-6 md:items-start flex-1">
          <div className="space-y-3 md:col-span-2">
            {items.map((i) => (
              <div key={i.key} className="card p-3 flex items-center gap-3">
                <img src={i.image} alt={i.nameEn} className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-[#E8DCC3]" />
                <div className="flex-1 min-w-0">
                  <div className={`${isUr ? 'urdu' : ''} text-sm font-semibold text-ink ${isUr ? 'leading-relaxed' : ''}`}>{t(i.nameUr, i.nameEn)}</div>
                  {i.option && <div className="text-[11px] text-muted" dir="ltr" style={{ textAlign: 'left' }}>{i.option}</div>}
                  <div className="text-maroon font-bold text-sm mt-0.5" dir="ltr" style={{ textAlign: 'left' }}>{fmt(i.price)}</div>
                </div>
                <Qty value={i.qty} onChange={(v) => setQty(i.key, v)} max={i.stock} />
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-0 md:sticky md:top-20">
            <div className="card p-4 space-y-2 text-sm" dir="ltr">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span className="text-ink font-semibold">{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-muted"><span>Delivery Fee</span><span className="text-ink font-semibold">—</span></div>
              <div className="flex justify-between font-bold text-ink border-t border-[#EFE5D0] pt-2"><span>Total</span><span>{fmt(subtotal)}</span></div>
            </div>
            <Link href="/checkout" className="btn-maroon w-full py-3.5 text-sm tracking-widest mt-3 block text-center" dir="ltr">
              PROCEED TO CHECKOUT
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
