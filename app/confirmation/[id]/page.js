'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, fmt, useLang } from '../../../components/store';
import { LangToggle } from '../../../components/customer';
import { Icon } from '../../../components/icons';

export default function Confirmation() {
  const { id } = useParams();
  const { isUr, t } = useLang();
  const [order, setOrder] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api('orders/' + id).then(setOrder).catch(() => {});
    api('settings').then(setSettings).catch(() => {});
  }, [id]);

  const dots = Array.from({ length: 26 });

  return (
    <div dir="ltr" className="mx-auto max-w-md min-h-screen bg-cream shadow-xl flex flex-col app-page-container">
      <div className="flex justify-end p-3">
        <LangToggle />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
        {dots.map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: ['#17703C', '#9E1B1E', '#D9A92F', '#7A1013'][i % 4],
              top: `${(i * 37) % 45}%`,
              left: `${(i * 53) % 100}%`,
              opacity: 0.7,
            }}
          />
        ))}
        <div className="w-20 h-20 rounded-full bg-leaf flex items-center justify-center text-white shadow-lg relative">
          <Icon name="check" className="w-10 h-10" strokeWidth={2.6} />
        </div>
        <h1 className={`${isUr ? 'urdu' : ''} text-base font-bold text-ink mt-6 ${isUr ? 'leading-loose' : ''}`}>
          {t('آپ کا آرڈر کامیابی سے ثبت ہو گیا!', 'Your order has been placed successfully!')}
        </h1>
        <div className="text-sm font-extrabold text-ink mt-3 tabular-nums" dir="ltr">Order #{id}</div>
        <p className={`${isUr ? 'urdu' : ''} text-xs text-muted mt-2 ${isUr ? 'leading-loose' : ''}`}>{t('ہم جلدی آپ کے آرڈر کی تصدیق کریں گے۔', 'We will confirm your order soon.')}</p>

        <div className="w-full card p-4 mt-8 text-sm space-y-2.5" dir="ltr">
          <div className="flex justify-between gap-3"><span className="text-muted">{t('ڈیلیوری وقت', 'Delivery Time')}</span><span className="font-bold text-ink">{settings?.eta || '35 - 45 min'}</span></div>
          <div className="flex justify-between gap-3"><span className="text-muted">{t('ادائیگی', 'Payment Method')}</span><span className="font-semibold text-ink capitalize text-right">{order?.payment === 'cod' ? t('کیش آن ڈیلیوری', 'Cash on Delivery') : order?.payment === 'bank' ? t('بینک ٹرانسفر', 'Bank Transfer') : 'JazzCash / Easypaisa'}</span></div>
          <div className="flex justify-between gap-3"><span className="text-muted">{t('کل رقم', 'Total Amount')}</span><span className="font-extrabold text-maroon tabular-nums">{fmt(order?.total)}</span></div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <Link href={'/track/' + id} className={`btn btn-primary w-full text-sm ${isUr ? 'urdu' : 'tracking-widest'}`} dir="ltr">
          {t('آرڈر ٹریک کریں', 'TRACK ORDER')}
        </Link>
        <Link href="/" className={`btn btn-outline w-full text-[12px] ${isUr ? 'urdu' : 'tracking-widest'}`} dir="ltr">
          {t('واپس ہوم پر', 'BACK TO HOME')}
        </Link>
      </div>
    </div>
  );
}
