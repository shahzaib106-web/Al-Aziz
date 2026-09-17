'use client';
import { useEffect, useState } from 'react';
import { api, toast } from '../../../components/store';
import { AdminShell } from '../../../components/admin';

export default function AdminSettings() {
  const [s, setS] = useState(null);
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    api('settings').then(setS).catch(() => {});
  }, []);

  if (!s) return <AdminShell title="Settings"><p className="text-sm text-muted">Loading…</p></AdminShell>;

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...s,
      deliveryFee: +s.deliveryFee,
      freeDeliveryAbove: +s.freeDeliveryAbove,
      discountPercent: +s.discountPercent,
    };
    if (newPass.trim()) payload.admin = { ...s.admin, password: newPass.trim() };
    await api('settings', { method: 'PUT', body: payload });
    toast('Settings saved');
    setNewPass('');
    api('settings').then(setS);
  };

  return (
    <AdminShell title="Restaurant Settings">
      <form onSubmit={save} className="grid lg:grid-cols-2 gap-5 max-w-5xl">
        <div className="card p-5 space-y-4">
          <h3 className="text-sm font-extrabold border-b border-[#EFE5D0] pb-3">Restaurant Identity</h3>
          <div>
            <label className="label">Name (Urdu)</label>
            <input className="field urdu" dir="rtl" value={s.nameUr} onChange={(e) => setS({ ...s, nameUr: e.target.value })} />
          </div>
          <div>
            <label className="label">Name (English)</label>
            <input className="field" value={s.nameEn} onChange={(e) => setS({ ...s, nameEn: e.target.value })} />
          </div>
          <div>
            <label className="label">Tagline (Urdu)</label>
            <input className="field urdu" dir="rtl" value={s.tagline} onChange={(e) => setS({ ...s, tagline: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Location</label>
              <input className="field" value={s.location} onChange={(e) => setS({ ...s, location: e.target.value })} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="field" value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Full Address</label>
            <textarea className="field" rows={2} value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="text-sm font-extrabold border-b border-[#EFE5D0] pb-3">Home Page & Deals</h3>
            <div>
              <label className="label">Promo Banner Title (Urdu)</label>
              <input className="field urdu" dir="rtl" value={s.promoTitle} onChange={(e) => setS({ ...s, promoTitle: e.target.value })} />
            </div>
            <div>
              <label className="label">Promo Banner Title (English)</label>
              <input className="field" value={s.promoTitleEn} onChange={(e) => setS({ ...s, promoTitleEn: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label">Discount %</label>
                <input type="number" min="0" max="90" className="field" value={s.discountPercent} onChange={(e) => setS({ ...s, discountPercent: e.target.value })} />
              </div>
              <div>
                <label className="label">Delivery Fee (Rs.)</label>
                <input type="number" min="0" className="field" value={s.deliveryFee} onChange={(e) => setS({ ...s, deliveryFee: e.target.value })} />
              </div>
              <div>
                <label className="label">Free Above (Rs.)</label>
                <input type="number" min="0" className="field" value={s.freeDeliveryAbove} onChange={(e) => setS({ ...s, freeDeliveryAbove: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Est. Delivery Time</label>
                <input className="field" value={s.eta} onChange={(e) => setS({ ...s, eta: e.target.value })} />
              </div>
              <div>
                <label className="label">Deal Note (Urdu)</label>
                <input className="field urdu" dir="rtl" value={s.discountNote} onChange={(e) => setS({ ...s, discountNote: e.target.value })} />
              </div>
              <div>
                <label className="label">Deal Note (English)</label>
                <input className="field" value={s.discountNoteEn} onChange={(e) => setS({ ...s, discountNoteEn: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h3 className="text-sm font-extrabold border-b border-[#EFE5D0] pb-3">Admin Security</h3>
            <div>
              <label className="label">Admin Username</label>
              <input className="field" value={s.admin.username} onChange={(e) => setS({ ...s, admin: { ...s.admin, username: e.target.value } })} />
            </div>
            <div>
              <label className="label">New Password (leave blank to keep current)</label>
              <input type="password" className="field" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="btn-maroon w-full py-3 text-sm tracking-wide">Save All Settings</button>
        </div>
      </form>
    </AdminShell>
  );
}
