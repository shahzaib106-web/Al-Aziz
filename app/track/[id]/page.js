'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, fmt, timeOf, STATUS_META, STATUS_FLOW, useLang } from '../../../components/store';
import { PageHeader } from '../../../components/customer';
import { Icon } from '../../../components/icons';

export default function Track() {
  const { id } = useParams();
  const { isUr, t } = useLang();
  const [order, setOrder] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const load = () => api('orders/' + id).then(setOrder).catch(() => {});
    load();
    api('settings').then(setSettings).catch(() => {});
    const tm = setInterval(load, 4000);
    return () => clearInterval(tm);
  }, [id]);

  const statusIdx = order ? STATUS_FLOW.indexOf(order.status) : -1;
  const cancelled = order?.status === 'cancelled';

  return (
    <div dir="ltr" className="mx-auto max-w-md md:max-w-5xl min-h-screen bg-cream pb-10 shadow-xl">
      <PageHeader title="Track Order" titleUr="آرڈر ٹریک کریں" />

      {!order ? (
        <p className={`${isUr ? 'urdu' : ''} text-center text-sm text-muted py-16`}>{t('لوڈ ہو رہا ہے…', 'Loading…')}</p>
      ) : (
        <div className="p-4">
          <div className="card p-4 flex items-center justify-between gap-3" dir="ltr">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-ink tabular-nums">Order #{order.id}</div>
              <div className={`text-[11px] text-muted mt-0.5 ${isUr ? 'urdu leading-relaxed' : ''}`}>{t('تخمینی ڈیلیوری وقت', 'Estimated Delivery Time')}</div>
            </div>
            <div className="text-maroon font-extrabold text-sm shrink-0">{cancelled ? '—' : settings?.eta || '35 - 45 min'}</div>
          </div>

          {cancelled && (
            <div className={`card p-4 mt-4 text-center text-sm font-bold text-maroon ${isUr ? 'urdu' : ''}`}>
              {t('یہ آرڈر منسوخ کر دیا گیا ہے', 'This order has been cancelled')}
            </div>
          )}

          <div className="mt-6 md:grid md:grid-cols-2 md:gap-8 md:items-start">
            {/* Timeline */}
            <div className="space-y-0 relative" dir="ltr">
              {STATUS_FLOW.map((s, i) => {
                const meta = STATUS_META[s];
                const done = !cancelled && statusIdx > i;
                const current = !cancelled && statusIdx === i;
                const ts = order.timeline?.[s];
                return (
                  <div key={s} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                          done ? 'bg-leaf border-leaf text-white' : current ? 'bg-maroon border-maroon text-white' : 'bg-white border-[#D8CCB4] text-muted'
                        }`}
                      >
                        <Icon name={done ? 'check' : meta.icon} className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      {i < STATUS_FLOW.length - 1 && <div className={`w-0.5 flex-1 min-h-[28px] ${done ? 'bg-leaf' : 'bg-[#E0D4BC]'}`} />}
                    </div>
                    <div className="pb-6 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${current ? 'text-maroon' : done ? 'text-ink' : 'text-muted'}`}>{t(meta.ur, meta.en)}</span>
                        <span className="text-[11px] text-muted">{timeOf(ts)}</span>
                      </div>
                      <p className={`${isUr ? 'urdu' : ''} text-[11px] mt-1 ${isUr ? 'leading-loose' : ''} ${current ? 'text-maroon' : 'text-muted'}`}>
                        {t(meta.ur, meta.enDesc)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items + call */}
            <div className="mt-2 md:mt-0 space-y-4">
              <div className="card p-4 text-sm space-y-1.5" dir="ltr">
                {order.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-muted">
                    <span>{isUr ? i.nameUr : i.nameEn} × {i.qty}</span>
                    <span className="text-ink font-semibold">{fmt(i.price * i.qty)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#EFE5D0] pt-2.5 mt-0.5 font-extrabold text-ink">
                  <span>{t('کل (ڈیلیوری سمیت)', 'Total (incl. delivery)')}</span>
                  <span className="tabular-nums">{fmt(order.total)}</span>
                </div>
              </div>

              <a href={`tel:${(settings?.phone || '03196526413').replace(/\s/g, '')}`} className={`btn btn-primary w-full text-sm ${isUr ? 'urdu' : 'tracking-widest'}`} dir="ltr">
                {t('ریسٹورنٹ کو کال کریں', 'CALL RESTAURANT')}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
