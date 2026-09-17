'use client';
import { useEffect, useState } from 'react';
import { api, toast } from '../../../components/store';
import { AdminShell, SectionCard } from '../../../components/admin';
import { Icon } from '../../../components/icons';

export default function AdminSettings() {
  const [s, setS] = useState(null);
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    api('settings').then(setS).catch(() => {});
  }, []);

  if (!s) return <AdminShell title="Settings"><p className="text-[13px] text-[#9B948A]">Loading…</p></AdminShell>;

  const save = async () => {
    const payload = {
      ...s,
      deliveryFee: +s.deliveryFee,
      freeDeliveryAbove: +s.freeDeliveryAbove,
      discountPercent: +s.discountPercent,
      lat: parseFloat(s.lat) || 30.64486081381286,
      lng: parseFloat(s.lng) || 73.06623648139468,
    };
    if (newPass.trim()) payload.admin = { ...s.admin, password: newPass.trim() };
    await api('settings', { method: 'PUT', body: payload });
    toast('Settings saved — live on the website');
    setNewPass('');
    api('settings').then(setS);
  };

  return (
    <AdminShell
      title="Settings"
      subtitle="Restaurant identity, commerce rules & security"
      actions={<button onClick={save} className="abtn abtn-primary"><Icon name="check" className="w-4 h-4" /> Save changes</button>}
    >
      <div className="grid lg:grid-cols-2 gap-4 max-w-5xl">
        <div className="space-y-4">
          <SectionCard title="Restaurant identity" desc="Shown across the website, splash & PWA">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="alabel">Name (Urdu)</label><input className="afield urdu" dir="rtl" value={s.nameUr} onChange={(e) => setS({ ...s, nameUr: e.target.value })} /></div>
                <div><label className="alabel">Name (English)</label><input className="afield" value={s.nameEn} onChange={(e) => setS({ ...s, nameEn: e.target.value })} /></div>
              </div>
              <div><label className="alabel">Tagline (Urdu)</label><input className="afield urdu" dir="rtl" value={s.tagline} onChange={(e) => setS({ ...s, tagline: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="alabel">City / location</label><input className="afield" value={s.location} onChange={(e) => setS({ ...s, location: e.target.value })} /></div>
                <div><label className="alabel">Phone</label><input className="afield tnum" value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} /></div>
              </div>
              <div><label className="alabel">Full address</label><textarea className="afield-area" rows={2} value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} /></div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="alabel !mb-0">Restaurant location (GPS)</label>
                  <a
                    href={`https://www.google.com/maps?q=${s.lat || 30.64486081381286},${s.lng || 73.06623648139468}`}
                    target="_blank"
                    rel="noreferrer"
                    className="abtn abtn-ghost !py-1 !px-2.5 text-[11px]"
                  >
                    <Icon name="pin" className="w-3.5 h-3.5" /> See on map
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="afield tnum" value={s.lat ?? ''} onChange={(e) => setS({ ...s, lat: e.target.value })} placeholder="Latitude" />
                  <input className="afield tnum" value={s.lng ?? ''} onChange={(e) => setS({ ...s, lng: e.target.value })} placeholder="Longitude" />
                </div>
                <p className="text-[11px] text-[#9B948A] mt-1.5">Used for delivery reference and the “See on map” link.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Admin security" desc="Credentials for this console">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="alabel">Username</label><input className="afield" value={s.admin.username} onChange={(e) => setS({ ...s, admin: { ...s.admin, username: e.target.value } })} /></div>
              <div><label className="alabel">New password</label><input type="password" className="afield" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Leave blank to keep" /></div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title="Home page & deals" desc="Marketing content on the customer home">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="alabel">Promo title (Urdu)</label><input className="afield urdu" dir="rtl" value={s.promoTitle} onChange={(e) => setS({ ...s, promoTitle: e.target.value })} /></div>
                <div><label className="alabel">Promo title (English)</label><input className="afield" value={s.promoTitleEn} onChange={(e) => setS({ ...s, promoTitleEn: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="alabel">Discount %</label><input type="number" min="0" max="90" className="afield tnum" value={s.discountPercent} onChange={(e) => setS({ ...s, discountPercent: e.target.value })} /></div>
                <div><label className="alabel">Delivery fee</label><input type="number" min="0" className="afield tnum" value={s.deliveryFee} onChange={(e) => setS({ ...s, deliveryFee: e.target.value })} /></div>
                <div><label className="alabel">Free above</label><input type="number" min="0" className="afield tnum" value={s.freeDeliveryAbove} onChange={(e) => setS({ ...s, freeDeliveryAbove: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="alabel">Delivery ETA</label><input className="afield" value={s.eta} onChange={(e) => setS({ ...s, eta: e.target.value })} /></div>
                <div><label className="alabel">Deal note (Urdu)</label><input className="afield urdu" dir="rtl" value={s.discountNote} onChange={(e) => setS({ ...s, discountNote: e.target.value })} /></div>
              </div>
              <div><label className="alabel">Deal note (English)</label><input className="afield" value={s.discountNoteEn} onChange={(e) => setS({ ...s, discountNoteEn: e.target.value })} /></div>
            </div>
          </SectionCard>

          <div className="acard p-5 flex items-start gap-3 bg-[#FBF3E1] !border-[#E7CD8A]">
            <Icon name="sparkle" className="w-4 h-4 text-[#8A6A10] mt-0.5 shrink-0" />
            <p className="text-[12px] text-[#8A6A10] leading-relaxed">
              Changes publish to the customer website and installable app immediately — no redeploy needed. On Vercel, settings persist for the current session and reset to the seeded defaults on restart.
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
