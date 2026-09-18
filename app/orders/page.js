'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, fmt, getMyOrderIds, STATUS_META, useLang, CartProvider } from '../../components/store';
import { PageHeader, BottomNav } from '../../components/customer';
import { Icon } from '../../components/icons';

const pillTone = (s) =>
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
    <div dir="ltr" className="mx-auto max-w-md md:max-w-none min-h-screen bg-cream pb-28 md:pb-10 shadow-xl md:shadow-none">
      <PageHeader title="My Orders" titleUr="میرے آرڈرز" />
      <div className="p-4 md:p-6 md:max-w-6xl md:mx-auto md:w-full">
        <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0 md:items-start">
          {orders === null && (
            <p className={`${isUr ? 'urdu' : ''} text-center text-sm text-muted py-10 md:col-span-2`}>{t('لوڈ ہو رہا ہے…', 'Loading…')}</p>
          )}
          {orders && orders.length === 0 && (
            <div className="text-center py-16 md:col-span-2 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE3C8] flex items-center justify-center text-maroon">
                <Icon name="receipt" className="w-7 h-7" strokeWidth={1.6} />
              </div>
              <p className={`${isUr ? 'urdu' : ''} text-sm text-muted`}>{t('آپ نے ابھی کوئی آرڈر نہیں کیا', "You haven't placed any order yet")}</p>
              <Link href="/menu" className={`btn btn-primary ${isUr ? 'urdu' : ''}`}>
                {t('آرڈر کریں', 'Order Now')}
              </Link>
            </div>
          )}
          {orders &&
            orders.map((o) => (
              <div key={o.id} className="card p-4">
                <div className="flex items-center justify-between gap-2" dir="ltr">
                  <span className="text-sm font-extrabold text-ink tabular-nums">#{o.id}</span>
                  <span className={`pill ${pillTone(o.status)} ${isUr ? 'urdu !text-[11px] leading-relaxed' : ''}`}>
                    {t(STATUS_META[o.status]?.ur, STATUS_META[o.status]?.en)}
                  </span>
                </div>
                <div className={`${isUr ? 'urdu' : ''} text-[11px] text-muted mt-2.5 ${isUr ? 'leading-loose' : 'leading-relaxed'}`}>
                  {o.items.map((i) => `${t(i.nameUr, i.nameEn)} ×${i.qty}`).join(isUr ? '، ' : ', ')}
                </div>
                <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[#EFE5D0]" dir="ltr">
                  <span className="text-maroon font-extrabold text-sm tabular-nums">{fmt(o.total)}</span>
                  <Link href={'/track/' + o.id} className={`btn btn-sm btn-primary ${isUr ? 'urdu' : '!tracking-wider'}`}>
                    {t('ٹریک کریں', 'TRACK')}
                  </Link>
                </div>
              </div>
            ))}
        </div>
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
