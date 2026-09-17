'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, fmt, getMyOrderIds, STATUS_META, useLang, CartProvider } from '../../components/store';
import { PageHeader, BottomNav } from '../../components/customer';

const chipColor = (s) =>
  s === 'delivered'
    ? 'bg-leaf/10 text-leaf border-leaf/30'
    : s === 'cancelled'
    ? 'bg-maroon/10 text-maroon border-maroon/30'
    : 'bg-gold/15 text-[#8A6A10] border-gold/40';

function OrdersInner() {
  const { isUr, t } = useLang();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const ids = getMyOrderIds();
    Promise.all(ids.map((id) => api('orders/' + id).catch(() => null))).then((r) => setOrders(r.filter(Boolean)));
  }, []);

  return (
    <div dir="ltr" className="mx-auto max-w-md min-h-screen bg-cream pb-24 shadow-xl">
      <PageHeader title="My Orders" />
      <div className="p-4 space-y-3">
        {orders === null && <p className={`${isUr ? 'urdu' : ''} text-center text-sm text-muted py-10`}>{t('لوڈ ہو رہا ہے…', 'Loading…')}</p>}
        {orders && orders.length === 0 && (
          <div className="text-center py-16">
            <p className={`${isUr ? 'urdu' : ''} text-sm text-muted`}>{t('آپ نے ابھی کوئی آرڈر نہیں کیا', "You haven't placed any order yet")}</p>
            <Link href="/menu" className={`btn-maroon text-xs px-6 py-2.5 inline-block mt-4 ${isUr ? 'urdu' : 'tracking-wide font-semibold'}`}>
              {t('آرڈر کریں', 'Order Now')}
            </Link>
          </div>
        )}
        {orders &&
          orders.map((o) => (
            <div key={o.id} className="card p-4">
              <div className="flex items-center justify-between" dir="ltr">
                <span className="text-sm font-bold">#{o.id}</span>
                <span className={`text-[10px] font-bold border rounded-full px-2.5 py-1 ${chipColor(o.status)}`}>{STATUS_META[o.status]?.en}</span>
              </div>
              <div className={`${isUr ? 'urdu' : ''} text-[11px] text-muted mt-2 ${isUr ? 'leading-loose' : ''}`}>
                {o.items.map((i) => `${t(i.nameUr, i.nameEn)} ×${i.qty}`).join(isUr ? '، ' : ', ')}
              </div>
              <div className="flex items-center justify-between mt-3" dir="ltr">
                <span className="text-maroon font-bold text-sm">{fmt(o.total)}</span>
                <Link href={'/track/' + o.id} className="text-[11px] font-bold text-white bg-maroon rounded-lg px-4 py-2 tracking-wider hover:bg-maroon-dark">
                  TRACK
                </Link>
              </div>
            </div>
          ))}
      </div>
      <BottomNav active="orders" />
    </div>
  );
}

export default function Orders() {
  return (
    <CartProvider>
      <OrdersInner />
    </CartProvider>
  );
}
