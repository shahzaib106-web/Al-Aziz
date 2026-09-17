'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, fmt, getUser, setUser, getFavs, toast, useLang, CartProvider } from '../../components/store';
import { PageHeader, BottomNav, MenuItemTile } from '../../components/customer';
import { Icon } from '../../components/icons';

export default function Profile() {
  const router = useRouter();
  const { isUr, t } = useLang();
  const [user, setU] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [favs, setFavs] = useState([]);
  const [menu, setMenu] = useState([]);
  const [showFavs, setShowFavs] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const u = getUser();
    setU(u);
    setName(u?.name || '');
    setPhone(u?.phone || '');
    setFavs(getFavs());
    api('menu').then(setMenu).catch(() => {});
    api('settings').then(setSettings).catch(() => {});
  }, []);

  const save = () => {
    const nu = { ...user, name, phone };
    setUser(nu);
    setU(nu);
    setEditing(false);
    toast(t('پروفائل محفوظ ہو گیا', 'Profile saved'));
  };

  const rows = [
    { icon: 'receipt', label: 'My Orders', href: '/orders' },
    { icon: 'heart', label: 'My Favorites', onClick: () => setShowFavs((s) => !s), badge: favs.length },
    { icon: 'bell', label: 'Notifications', onClick: () => toast(t('نوٹیفکیشن آن ہیں', 'Notifications are on')) },
    { icon: 'phone', label: 'Help & Support', href: 'tel:' + (settings?.phone || '').replace(/\s/g, '') },
    { icon: 'sparkle', label: 'About Us', onClick: () => setShowAbout(true) },
    { icon: 'logout', label: 'Logout', onClick: () => { setUser(null); setU(null); toast(t('لاگ آؤٹ ہو گیا', 'Logged out')); }, danger: true },
  ];

  const favItems = menu.filter((m) => favs.includes(m.id));

  return (
    <CartProvider>
      <div dir="ltr" className="mx-auto max-w-md md:max-w-3xl min-h-screen bg-cream pb-24 md:pb-10 shadow-xl">
        <PageHeader
          title="My Profile"
          right={
            <button className="p-1 hover:bg-white/10 rounded-lg" onClick={() => setEditing((e) => !e)} aria-label="settings">
              <Icon name="gear" className="w-5 h-5" />
            </button>
          }
        />

        <div className="p-4">
          <div className="card p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#D8CCB4] flex items-center justify-center text-white">
              <Icon name="user" className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2" dir="ltr">
                  <input className="field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="field" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <button onClick={save} className="btn-leaf text-xs px-4 py-2">Save</button>
                </div>
              ) : user?.name ? (
                <>
                  <div className="text-sm font-bold text-ink" dir="ltr">{user.name}</div>
                  <div className="text-xs text-muted mt-0.5" dir="ltr">{user.phone}</div>
                  <button onClick={() => setEditing(true)} className="text-[11px] font-semibold text-maroon mt-1" dir="ltr">Edit Profile</button>
                </>
              ) : (
                <>
                  <div className={`${isUr ? 'urdu' : ''} text-sm font-bold text-ink`}>{t('مہمان صارف', 'Guest User')}</div>
                  <Link href="/login" className={`${isUr ? 'urdu' : ''} text-[11px] font-semibold text-maroon mt-1 inline-block`}>
                    {t('لاگ ان / نیا اکاؤنٹ بنائیں', 'Login / Create Account')}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="card mt-4 divide-y divide-[#EFE5D0]">
            {rows.map((r) =>
              r.href ? (
                <Link key={r.label} href={r.href} className="flex items-center gap-3 px-4 py-3.5 text-sm hover:bg-maroon/5">
                  <Icon name={r.icon} className="w-5 h-5 text-maroon" />
                  <span className="flex-1 font-medium" dir="ltr">{r.label}</span>
                  <Icon name="chevR" className="w-4 h-4 text-muted" />
                </Link>
              ) : (
                <button key={r.label} onClick={r.onClick} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm hover:bg-maroon/5">
                  <Icon name={r.icon} className="w-5 h-5 text-maroon" />
                  <span className="flex-1 font-medium text-left" dir="ltr">{r.label}</span>
                  {r.badge ? <span className="text-[10px] font-bold bg-maroon text-white rounded-full px-2 py-0.5" dir="ltr">{r.badge}</span> : null}
                  <Icon name="chevR" className="w-4 h-4 text-muted" />
                </button>
              )
            )}
          </div>

          {showFavs && (
            <div className="mt-4 space-y-3">
              <h3 className={`${isUr ? 'urdu' : ''} text-sm font-bold text-ink`}>{t('میرے پسندیدہ', 'My Favorites')}</h3>
              {favItems.length === 0 && <p className={`${isUr ? 'urdu' : ''} text-xs text-muted`}>{t('کوئی پسندیدہ آئٹم نہیں', 'No favorite items yet')}</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {favItems.map((m) => (
                  <MenuItemTile key={m.id} item={m} onOpen={() => router.push('/product/' + m.id)} />
                ))}
              </div>
            </div>
          )}
        </div>

        {showAbout && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => setShowAbout(false)}>
            <div className="card max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
              <h3 className={`${isUr ? 'urdu' : ''} text-lg font-bold text-maroon`}>{t(settings?.nameUr, settings?.nameEn)}</h3>
              <p className={`${isUr ? 'urdu' : ''} text-xs text-muted mt-3 ${isUr ? 'leading-loose' : 'leading-relaxed'}`}>
                {t(
                  `${settings?.tagline || 'اصلی ذائقہ، ہماری پہچان'}۔ سنہ 1998 سے ساہیوال میں آپ کی خدمت میں۔ ہماری بریانی، کڑاہی اور باری بی کیو شہر بھر میں مشہور ہے۔`,
                  'Serving Sahiwal since 1998. Our biryani, karahi and BBQ are famous across the city.'
                )}
              </p>
              <p className="text-[11px] text-muted mt-3" dir="ltr">{settings?.address}</p>
              <button onClick={() => setShowAbout(false)} className={`btn-maroon text-xs px-6 py-2 mt-4 ${isUr ? 'urdu' : ''}`}>{t('بند کریں', 'Close')}</button>
            </div>
          </div>
        )}

        <BottomNav active="profile" />
      </div>
    </CartProvider>
  );
}
