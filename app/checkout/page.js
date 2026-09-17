'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, useCart, fmt, toast, getUser, pushMyOrderId, useLang, CartProvider } from '../../components/store';
import { PageHeader } from '../../components/customer';
import { Icon } from '../../components/icons';

const PAYMENTS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash' },
  { id: 'bank', label: 'Bank Transfer', icon: 'bank' },
  { id: 'jazzcash', label: 'JazzCash / Easypaisa', icon: 'wallet' },
];

function CheckoutInner() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const { isUr, t } = useLang();
  const [settings, setSettings] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [editAddr, setEditAddr] = useState(false);

  useEffect(() => {
    api('settings').then(setSettings).catch(() => {});
    const u = getUser();
    setName(u?.name || 'Ali Raza');
    setPhone(u?.phone || '0304 6721962');
    setAddress(u?.address || 'Street # 2, Near Al Aziz Restaurant, Sahiwal, Punjab, Pakistan');
  }, []);

  const fee = settings ? (subtotal >= (settings.freeDeliveryAbove || 1500) ? 0 : settings.deliveryFee || 50) : 50;
  const total = subtotal + fee;

  const place = async () => {
    if (!items.length) return toast(t('کارٹ خالی ہے', 'Cart is empty'));
    if (!name.trim() || !phone.trim() || !address.trim()) return toast(t('براہ کرم تمام معلومات درج کریں', 'Please fill in all details'));
    setPlacing(true);
    try {
      const order = await api('orders', {
        method: 'POST',
        body: {
          items: items.map((i) => ({ menuId: i.menuId, nameUr: i.nameUr, nameEn: i.nameEn, image: i.image, qty: i.qty, price: i.price, option: i.option })),
          customer: { name, phone, address },
          payment,
          subtotal,
          deliveryFee: fee,
          total,
        },
      });
      pushMyOrderId(order.id);
      clear();
      router.push('/confirmation/' + order.id);
    } catch (e) {
      toast(e.message);
      setPlacing(false);
    }
  };

  return (
    <div dir="ltr" className="mx-auto max-w-md md:max-w-5xl min-h-screen bg-cream pb-10 shadow-xl">
      <PageHeader title="Checkout" titleUr="چیک آؤٹ" />

      {items.length === 0 ? (
        <p className={`${isUr ? 'urdu' : ''} text-center text-sm text-muted py-16`}>
          {t('کوئی آئٹم نہیں — پہلے کارٹ میں کچھ شامل کریں', 'No items — add something to your cart first')}
        </p>
      ) : (
        <div className="p-4 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 md:items-start">
          <div className="space-y-4 md:col-span-2">
            {/* Address */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2" dir="ltr">
                <h3 className={`ctitle ${isUr ? 'urdu !text-[12px] leading-relaxed' : ''}`}>{t('ڈیلیوری ایڈریس', 'Delivery Address')}</h3>
                <span className={`pill bg-leaf/10 text-leaf border-leaf/30 ${isUr ? 'urdu !text-[11px] leading-relaxed' : ''}`}>{t('گھر', 'Home')}</span>
              </div>
              {editAddr ? (
                <div className="space-y-2 mt-2">
                  <input className="field" dir="ltr" placeholder={t('نام', 'Name')} value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="field" dir="ltr" placeholder={t('فون', 'Phone')} value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <textarea className="field !h-auto py-2.5" dir="ltr" rows={2} placeholder={t('پتہ', 'Address')} value={address} onChange={(e) => setAddress(e.target.value)} />
                  <button onClick={() => setEditAddr(false)} className={`btn btn-sm btn-leaf-c w-max ${isUr ? 'urdu' : ''}`} dir="ltr">{t('محفوظ کریں', 'Save')}</button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-muted leading-relaxed" dir="ltr">{address}</p>
                  <p className="text-xs text-muted mt-1" dir="ltr">{phone}</p>
                  <button onClick={() => setEditAddr(true)} className={`text-xs font-bold text-maroon mt-2 hover:underline ${isUr ? 'urdu' : ''}`} dir="ltr">{t('تبدیل کریں', 'Change')}</button>
                </>
              )}
            </div>

            {/* Payment */}
            <div className="card p-4">
              <h3 className={`ctitle mb-3 ${isUr ? 'urdu !text-[12px] leading-relaxed' : ''}`} dir="ltr">{t('ادائیگی کا طریقہ', 'Payment Method')}</h3>
              <div className="space-y-2 md:grid md:grid-cols-3 md:gap-2 md:space-y-0">
                {PAYMENTS.map((p) => (
                  <label key={p.id} className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer text-sm ${payment === p.id ? 'border-maroon ring-1 ring-maroon/25 bg-maroon/5' : 'border-[#E0D4BC] bg-white'}`}>
                    <Icon name={p.icon} className="w-5 h-5 text-leaf shrink-0" />
                    <span className="flex-1" dir="ltr">{p.label}</span>
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${payment === p.id ? 'border-maroon' : 'border-[#C8BCA4]'}`}>
                      {payment === p.id && <span className="w-2 h-2 rounded-full bg-maroon" />}
                    </span>
                    <input type="radio" name="pay" className="hidden" checked={payment === p.id} onChange={() => setPayment(p.id)} />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:sticky md:top-20">
            {/* Summary */}
            <div className="card p-4 text-sm" dir="ltr">
              <h3 className={`ctitle mb-2 ${isUr ? 'urdu !text-[12px] leading-relaxed' : ''}`}>{t('آرڈر کا خلاصہ', 'Order Summary')}</h3>
              <div className="flex justify-between text-muted"><span>{t('ذیلی کل', 'Subtotal')}</span><span className="text-ink font-semibold tabular-nums">{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-muted mt-1.5"><span>{t('ڈیلیوری فیس', 'Delivery Fee')}</span><span className={`font-semibold tabular-nums ${fee === 0 ? 'text-leaf' : 'text-ink'}`}>{fee === 0 ? t('مفت', 'FREE') : fmt(fee)}</span></div>
              <div className="flex justify-between font-extrabold text-ink border-t border-[#EFE5D0] pt-2.5 mt-2.5"><span>{t('کل رقم', 'Total')}</span><span className="tabular-nums">{fmt(total)}</span></div>
            </div>

            <button onClick={place} disabled={placing} className={`btn btn-primary w-full text-sm ${isUr ? 'urdu' : 'tracking-widest'}`} dir="ltr">
              {placing ? t('آرڈر ہو رہا ہے…', 'PLACING…') : t('آرڈر کریں', 'PLACE ORDER')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Checkout() {
  return (
    <CartProvider>
      <CheckoutInner />
    </CartProvider>
  );
}
